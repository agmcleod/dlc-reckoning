import type { Prediction } from '$lib/types/prediction'

export interface PredictionData {
  mostRecentYear: number
  data: { [year: string]: Prediction[] }
}
