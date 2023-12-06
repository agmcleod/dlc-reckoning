import type { Prediction } from '$lib/types/prediction'
import { Host } from '$lib/types/host'

export interface ScoreTypeValues {
  correct: number
  incorrect: number
  partial: number
  total: number
}

export interface TotalScoreTypeValues extends ScoreTypeValues {
  correctEventually: number
}

export interface StatisticsHostData {
  total: TotalScoreTypeValues
  bold: ScoreTypeValues
  coolRanch: ScoreTypeValues
}

export interface StatisticsData {
  [Host.Jeff]: StatisticsHostData
  [Host.Christian]: StatisticsHostData
}
