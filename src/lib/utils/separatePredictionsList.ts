import { Host } from '$lib/types/host'
import type { Prediction } from '$lib/types/prediction'
import { PredictionType } from '$lib/types/predictionType'

interface PredictionListByType {
  [PredictionType.Bold]: Prediction[]
  [PredictionType.CoolRanch]: Prediction[]
}

export interface SeparatedPredictionList {
  [Host.Jeff]: PredictionListByType
  [Host.Christian]: PredictionListByType
  [Host.Lana]: PredictionListByType
}

export function createInitialSeparatedList(): SeparatedPredictionList {
  return {
    [Host.Jeff]: {
      [PredictionType.Bold]: [],
      [PredictionType.CoolRanch]: []
    },
    [Host.Christian]: {
      [PredictionType.Bold]: [],
      [PredictionType.CoolRanch]: []
    },
    [Host.Lana]: {
      [PredictionType.Bold]: [],
      [PredictionType.CoolRanch]: []
    }
  }
}

export function separatePredictionsList(predictionsForYear: Prediction[]): SeparatedPredictionList {
  const separatedLists: SeparatedPredictionList = createInitialSeparatedList()

  for (const record of predictionsForYear) {
    separatedLists[record.host][record.prediction_type].push(record)
  }

  return separatedLists
}
