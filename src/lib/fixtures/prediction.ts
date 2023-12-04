import { faker } from '@faker-js/faker'
import type { Prediction } from '$lib/types/prediction'
import { PredictionType } from '$lib/types/predictionType'
import { Host } from '$lib/types/host'

export function createPrediction(args?: Partial<Prediction>): Prediction {
  let host
  const hostChoice = Math.random()
  if (hostChoice >= 0.95) {
    host = Host.Both
  } else if (hostChoice >= 0.45) {
    host = Host.Christian
  } else {
    host = Host.Jeff
  }

  return {
    year: Math.floor(Math.random() * 9) + 2015,
    correct_eventually: '',
    prediction: faker.lorem.sentences(2),
    details: faker.lorem.sentence(12),
    host,
    prediction_type: PredictionType.Bold,
    score: null,
    ...args
  }
}
