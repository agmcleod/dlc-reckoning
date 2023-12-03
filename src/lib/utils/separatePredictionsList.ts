import { Host } from '$lib/types/host'
import type { Prediction } from '$lib/types/prediction'
import { PredictionType } from '$lib/types/predictionType'

export interface SeparatedPredictionList {
  jeffBold: Prediction[]
  jeffCoolRanch: Prediction[]
  christianBold: Prediction[]
  christianCoolRanch: Prediction[]
}

export function separatePredictionsList(predictionsForYear: Prediction[]): SeparatedPredictionList {
  const jeffBold: Prediction[] = []
  const jeffCoolRanch: Prediction[] = []
  const christianBold: Prediction[] = []
  const christianCoolRanch: Prediction[] = []

  for (const record of predictionsForYear) {
    if (record.host === Host.Both) {
      if (record.prediction_type === PredictionType.Bold) {
        jeffBold.push(record)
        christianBold.push(record)
      } else if (record.prediction_type === PredictionType.CoolRanch) {
        jeffCoolRanch.push(record)
        christianCoolRanch.push(record)
      }
    } else if (record.host === Host.Christian) {
      if (record.prediction_type === PredictionType.Bold) {
        christianBold.push(record)
      } else if (record.prediction_type === PredictionType.CoolRanch) {
        christianCoolRanch.push(record)
      }
    } else if (record.host === Host.Jeff) {
      if (record.prediction_type === PredictionType.Bold) {
        jeffBold.push(record)
      } else if (record.prediction_type === PredictionType.CoolRanch) {
        jeffCoolRanch.push(record)
      }
    }
  }

  return {
    jeffBold,
    jeffCoolRanch,
    christianBold,
    christianCoolRanch
  }
}
