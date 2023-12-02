import predictionsData from '$lib/assets/data.json'
import type { PredictionData } from './types'
import { Host } from '$lib/types/host'
import { Score } from '$lib/types/score'
import { PredictionType } from '$lib/types/predictionType'

export const prerender = process.env.NODE_ENV === 'production'

const hostMap = {
  Christian: Host.Christian,
  Jeff: Host.Jeff,
  Both: Host.Both
}

const scoreMap = {
  Correct: Score.Correct,
  Incorrect: Score.Incorrect,
  Partial: Score.Partial
}

const predictionTypeMap = {
  Bold: PredictionType.Bold,
  CoolRanch: PredictionType.CoolRanch
}

export function load(): PredictionData {
  const predictionData: PredictionData = {
    lastYear: 0,
    data: {}
  }

  for (const record of predictionsData) {
    const host = hostMap[record.host as keyof typeof hostMap]
    if (host === undefined) {
      throw new Error(`Invalid host: ${record.host}`)
    }

    const score = record.score ? scoreMap[record.score as keyof typeof scoreMap] : null
    if (score === undefined && record.score !== null) {
      throw new Error(`Invalid score: ${record.score}`)
    }

    const predictionType =
      predictionTypeMap[record.prediction_type as keyof typeof predictionTypeMap]

    if (predictionType === undefined) {
      throw new Error(`Invalid predictionType: ${record.prediction_type}`)
    }

    const recordToAdd = {
      ...record,
      prediction_type: predictionType,
      host,
      score
    }

    if (!predictionData.data[recordToAdd.year]) {
      predictionData.data[recordToAdd.year] = []
      predictionData.lastYear = Math.max(predictionData.lastYear, recordToAdd.year)
    }

    predictionData.data[recordToAdd.year].push(recordToAdd)
  }

  return predictionData
}
