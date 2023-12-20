import { separatePredictionsList } from '../separatePredictionsList'
import { createPrediction } from '$lib/fixtures/prediction'
import { Host } from '$lib/types/host'
import { PredictionType } from '$lib/types/predictionType'

test('splits the list properly', () => {
  const predictions = [
    createPrediction({ host: Host.Jeff, prediction: 'B1', prediction_type: PredictionType.Bold }),
    createPrediction({
      host: Host.Christian,
      prediction: 'B1',
      prediction_type: PredictionType.Bold
    }),
    createPrediction({ host: Host.Jeff, prediction: 'B2', prediction_type: PredictionType.Bold }),
    createPrediction({
      host: Host.Christian,
      prediction: 'B3',
      prediction_type: PredictionType.Bold
    }),
    createPrediction({
      host: Host.Jeff,
      prediction: 'CR1',
      prediction_type: PredictionType.CoolRanch
    }),
    createPrediction({
      host: Host.Christian,
      prediction: 'CR1',
      prediction_type: PredictionType.CoolRanch
    }),
    createPrediction({
      host: Host.Jeff,
      prediction: 'CR2',
      prediction_type: PredictionType.CoolRanch
    }),
    createPrediction({
      host: Host.Jeff,
      prediction: 'CR3',
      prediction_type: PredictionType.CoolRanch
    }),
    createPrediction({
      host: Host.Christian,
      prediction: 'CR4',
      prediction_type: PredictionType.CoolRanch
    })
  ]

  const separated = separatePredictionsList(predictions)

  expect(separated[Host.Jeff][PredictionType.Bold].map((p) => p.prediction)).toEqual(['B1', 'B2'])
  expect(separated[Host.Christian][PredictionType.Bold].map((p) => p.prediction)).toEqual([
    'B1',
    'B3'
  ])
  expect(separated[Host.Jeff][PredictionType.CoolRanch].map((p) => p.prediction)).toEqual([
    'CR1',
    'CR2',
    'CR3'
  ])
  expect(separated[Host.Christian][PredictionType.CoolRanch].map((p) => p.prediction)).toEqual([
    'CR1',
    'CR4'
  ])
})
