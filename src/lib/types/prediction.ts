import type { Host } from './host'
import type { Score } from './score'
import type { PredictionType } from './predictionType'

export interface Prediction {
  year: number
  prediction: string
  prediction_type: PredictionType
  host: Host
  score: Score | null
  details: string
  correct_eventually: string
}
