import { Host } from '$lib/types/host.js'
import type { Prediction } from '$lib/types/prediction.js'
import { PredictionType } from '$lib/types/predictionType.js'
import { Score } from '$lib/types/score.js'
import type { StatisticsData, ScoreTypeValues } from './types.js'

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

export async function load({ parent }): Promise<StatisticsData> {
  const predictionsData = await parent()

  const christianBoldScoreTypeValues: ScoreTypeValues = {
    correct: 0,
    incorrect: 0,
    partial: 0,
    total: 0
  }

  const christianCoolRanchScoreTypeValues: ScoreTypeValues = {
    correct: 0,
    incorrect: 0,
    partial: 0,
    total: 0
  }

  const jeffBoldScoreTypeValues: ScoreTypeValues = {
    correct: 0,
    incorrect: 0,
    partial: 0,
    total: 0
  }

  const jeffCoolRanchScoreTypeValues: ScoreTypeValues = {
    correct: 0,
    incorrect: 0,
    partial: 0,
    total: 0
  }

  let jeffCorrectEventuallyCount = 0
  let christianCorrectEventuallyCount = 0

  for (const year of Object.keys(predictionsData.data)) {
    const predictionsForYear = predictionsData.data[year]
    for (const record of predictionsForYear) {
      if (record.score === null) {
        continue
      }
      if (record.host === Host.Both) {
        if (record.prediction_type === PredictionType.Bold) {
          increaseBasedOnType(jeffBoldScoreTypeValues, record)
          increaseBasedOnType(christianBoldScoreTypeValues, record)
        } else if (record.prediction_type === PredictionType.CoolRanch) {
          increaseBasedOnType(jeffCoolRanchScoreTypeValues, record)
          increaseBasedOnType(christianCoolRanchScoreTypeValues, record)
        }

        if (record.score === Score.Incorrect && record.correct_eventually) {
          jeffCorrectEventuallyCount += 1
          christianCorrectEventuallyCount += 1
        }
      } else if (record.host === Host.Christian) {
        if (record.prediction_type === PredictionType.Bold) {
          increaseBasedOnType(christianBoldScoreTypeValues, record)
        } else if (record.prediction_type === PredictionType.CoolRanch) {
          increaseBasedOnType(christianCoolRanchScoreTypeValues, record)
        }
        if (record.score === Score.Incorrect && record.correct_eventually) {
          christianCorrectEventuallyCount += 1
        }
      } else if (record.host === Host.Jeff) {
        if (record.prediction_type === PredictionType.Bold) {
          increaseBasedOnType(jeffBoldScoreTypeValues, record)
        } else if (record.prediction_type === PredictionType.CoolRanch) {
          increaseBasedOnType(jeffCoolRanchScoreTypeValues, record)
        }
        if (record.score === Score.Incorrect && record.correct_eventually) {
          jeffCorrectEventuallyCount += 1
        }
      }
    }
  }

  const jeffTotalScoreValues = sumValues(jeffBoldScoreTypeValues, jeffCoolRanchScoreTypeValues)
  const christianTotalScoreValues = sumValues(
    christianBoldScoreTypeValues,
    christianCoolRanchScoreTypeValues
  )

  return {
    [Host.Jeff]: {
      bold: jeffBoldScoreTypeValues,
      coolRanch: jeffCoolRanchScoreTypeValues,
      total: {
        ...jeffTotalScoreValues,
        correctEventually: jeffCorrectEventuallyCount
      }
    },
    [Host.Christian]: {
      bold: christianBoldScoreTypeValues,
      coolRanch: christianCoolRanchScoreTypeValues,
      total: {
        ...christianTotalScoreValues,
        correctEventually: christianCorrectEventuallyCount
      }
    }
  }
}
