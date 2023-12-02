import type { Prediction } from '$lib/types/prediction'

export interface PredictionData {
  lastYear: number
  data: { [year: string]: Prediction[] }
}
