import predictionsData from '$lib/assets/data.json'
import type { PredictionData } from './types'
import { Host } from '$lib/types/host'
import { Score } from '$lib/types/score'
import { PredictionType } from '$lib/types/predictionType'
import type { Prediction } from '$lib/types/prediction'

export const prerender = process.env.NODE_ENV === 'production'

const hostMap: { [key: string]: Host } = {
  Christian: Host.Christian,
  Jeff: Host.Jeff,
  Lana: Host.Lana
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
    mostRecentYear: 0,
    data: {}
  }

  for (const record of predictionsData) {
    const host = hostMap[record.host]
    if (host === undefined && record.host !== 'Both') {
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

    const recordToAdd: Prediction = {
      ...record,
      prediction_type: predictionType,
      score,
      // this is an initial value
      host: Host.Jeff
    }

    if (!predictionData.data[recordToAdd.year]) {
      predictionData.data[recordToAdd.year] = []
      predictionData.mostRecentYear = Math.max(predictionData.mostRecentYear, recordToAdd.year)
    }

    if (record.host === 'Both') {
      Object.assign(recordToAdd, { host: Host.Christian })
      predictionData.data[recordToAdd.year]!.push(recordToAdd)
      const jeffRecordCopy = { ...recordToAdd, host: Host.Jeff }
      predictionData.data[recordToAdd.year]!.push(jeffRecordCopy)
    } else {
      Object.assign(recordToAdd, { host })
      predictionData.data[recordToAdd.year]!.push(recordToAdd)
    }
  }

  return predictionData
}
