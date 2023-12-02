import type { Prediction } from '$lib/types/prediction'

export interface SingleYearPredictionData {
  year: number
  predictions: Prediction[]
}
