import { Host } from '$lib/types/host.js'
import type { Prediction } from '$lib/types/prediction.js'
import { PredictionType } from '$lib/types/predictionType.js'
import { Score } from '$lib/types/score.js'
import type { StatisticsData, StatisticsHostData, ScoreTypeValues } from './types.js'

interface HostCorrectCount {
  correct: number
  total: number
}

function increaseBasedOnType(typeValues: ScoreTypeValues, record: Prediction) {
  typeValues.total += 1
  switch (record.score) {
    case Score.Correct:
      typeValues.correct += 1
      break
    case Score.Incorrect:
      typeValues.incorrect += 1
      break
    case Score.Partial:
      typeValues.partial += 1
      break
    default:
      throw new Error(`invalid score ${record.score}`)
  }
}

function sumValues(bold: ScoreTypeValues, coolRanch: ScoreTypeValues): ScoreTypeValues {
  return {
    correct: bold.correct + coolRanch.correct,
    incorrect: bold.incorrect + coolRanch.incorrect,
    partial: bold.partial + coolRanch.partial,
    total: bold.total + coolRanch.total
  }
}

function createInitialScoreTypeValues(): ScoreTypeValues {
  return {
    correct: 0,
    incorrect: 0,
    partial: 0,
    total: 0
  }
}

function createInitialStatisticsHostData(): StatisticsHostData {
  return {
    accuracyByYear: {},
    bold: createInitialScoreTypeValues(),
    coolRanch: createInitialScoreTypeValues(),
    total: {
      ...createInitialScoreTypeValues(),
      correctEventually: 0
    }
  }
}

export async function load({ parent }): Promise<{ leaderboard: StatisticsData }> {
  const predictionsData = await parent()

  const returnData: StatisticsData = {
    [Host.Jeff]: createInitialStatisticsHostData(),
    [Host.Christian]: createInitialStatisticsHostData(),
    [Host.Lana]: createInitialStatisticsHostData()
  }

  for (const year of Object.keys(predictionsData.data)) {
    const predictionsForYear = predictionsData.data[year]!
    const scoresByYear: {
      [Host.Christian]: HostCorrectCount
      [Host.Jeff]: HostCorrectCount
      [Host.Lana]: HostCorrectCount
    } = {
      [Host.Jeff]: {
        correct: 0,
        total: 0
      },
      [Host.Christian]: {
        correct: 0,
        total: 0
      },
      [Host.Lana]: {
        correct: 0,
        total: 0
      }
    }
    for (const record of predictionsForYear) {
      if (record.score === null) {
        continue
      }

      if (record.score === Score.Correct) {
        scoresByYear[record.host].correct += 1
      }

      scoresByYear[record.host].total += 1

      const dataForHost = returnData[record.host]
      if (record.prediction_type === PredictionType.Bold) {
        increaseBasedOnType(dataForHost.bold, record)
      } else if (record.prediction_type === PredictionType.CoolRanch) {
        increaseBasedOnType(dataForHost.coolRanch, record)
      }
      if (record.score === Score.Incorrect && record.correct_eventually) {
        dataForHost.total.correctEventually += 1
      }
    }

    for (const host of Object.keys(scoresByYear)) {
      const scoresForHostForTheYear = scoresByYear[host as Host]
      const score = (scoresForHostForTheYear.correct / scoresForHostForTheYear.total) * 100
      if (!isNaN(score)) {
        returnData[host as Host].accuracyByYear[year] = score
      }
    }
  }

  for (const host of Object.keys(returnData)) {
    const hostData = returnData[host as Host]
    hostData.total = {
      ...hostData.total,
      ...sumValues(hostData.bold, hostData.coolRanch)
    }
  }

  return { leaderboard: returnData }
}
