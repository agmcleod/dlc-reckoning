import { faker } from '@faker-js/faker'
import type { Prediction } from '$lib/types/prediction'
import { PredictionType } from '$lib/types/predictionType'
import { Host } from '$lib/types/host'

export function createPrediction(args?: Partial<Prediction>): Prediction {
  let host
  const hostChoice = Math.random()
  if (hostChoice >= 0.66) {
    host = Host.Lana
  } else if (hostChoice >= 0.33) {
    host = Host.Christian
  } else {
    host = Host.Jeff
  }

  return {
    year: Math.floor(Math.random() * 9) + 2015,
    correct_eventually: '',
    prediction: `${faker.string.uuid()} ${faker.lorem.sentences(2)}`,
    details: '',
    host,
    prediction_type: PredictionType.Bold,
    score: null,
    ...args
  }
}
