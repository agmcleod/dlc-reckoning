import { load } from '../+page'
import { createPrediction } from '$lib/fixtures/prediction'
import type { PredictionData } from '../../types'
import { Host } from '$lib/types/host'
import { PredictionType } from '$lib/types/predictionType'
import { Score } from '$lib/types/score'

test('sets correct sum data for both hosts', async () => {
  const parentData: PredictionData = {
    mostRecentYear: 2023,
    data: {
      2023: [
        createPrediction({
          host: Host.Both,
          prediction_type: PredictionType.Bold,
          score: Score.Correct
        }),
        createPrediction({
          host: Host.Jeff,
          prediction_type: PredictionType.Bold,
          score: Score.Correct
        }),
        createPrediction({
          host: Host.Jeff,
          prediction_type: PredictionType.Bold,
          score: Score.Incorrect,
          correct_eventually: 'it came true a year later'
        }),
        createPrediction({
          host: Host.Jeff,
          prediction_type: PredictionType.CoolRanch,
          score: Score.Partial
        }),
        createPrediction({
          host: Host.Jeff,
          prediction_type: PredictionType.CoolRanch,
          score: Score.Incorrect
        }),
        createPrediction({
          host: Host.Jeff,
          prediction_type: PredictionType.CoolRanch,
          score: Score.Incorrect
        }),
        createPrediction({
          host: Host.Jeff,
          prediction_type: PredictionType.CoolRanch,
          score: Score.Incorrect
        }),
        createPrediction({
          host: Host.Christian,
          prediction_type: PredictionType.Bold,
          score: Score.Correct
        }),
        createPrediction({
          host: Host.Christian,
          prediction_type: PredictionType.Bold,
          score: Score.Partial
        }),
        createPrediction({
          host: Host.Christian,
          prediction_type: PredictionType.Bold,
          score: Score.Partial
        }),
        createPrediction({
          host: Host.Christian,
          prediction_type: PredictionType.Bold,
          score: Score.Incorrect
        }),
        createPrediction({
          host: Host.Christian,
          prediction_type: PredictionType.CoolRanch,
          score: Score.Correct
        }),
        createPrediction({
          host: Host.Christian,
          prediction_type: PredictionType.CoolRanch,
          score: Score.Correct
        }),
        createPrediction({
          host: Host.Christian,
          prediction_type: PredictionType.CoolRanch,
          score: Score.Partial
        }),
        createPrediction({
          host: Host.Christian,
          prediction_type: PredictionType.CoolRanch,
          score: Score.Incorrect
        })
      ],
      2022: [
        createPrediction({
          host: Host.Jeff,
          prediction_type: PredictionType.Bold,
          score: Score.Correct
        }),
        createPrediction({
          host: Host.Jeff,
          prediction_type: PredictionType.CoolRanch,
          score: Score.Partial
        }),
        createPrediction({
          host: Host.Jeff,
          prediction_type: PredictionType.CoolRanch,
          score: Score.Incorrect,
          correct_eventually: 'yes'
        }),
        createPrediction({
          host: Host.Christian,
          prediction_type: PredictionType.Bold,
          score: Score.Correct
        }),
        createPrediction({
          host: Host.Christian,
          prediction_type: PredictionType.Bold,
          score: Score.Partial
        }),
        createPrediction({
          host: Host.Christian,
          prediction_type: PredictionType.Bold,
          score: Score.Incorrect,
          correct_eventually: 'yes'
        }),
        createPrediction({
          host: Host.Christian,
          prediction_type: PredictionType.CoolRanch,
          score: Score.Incorrect
        })
      ]
    }
  }
  const data = await load({ parent: () => Promise.resolve(parentData) })

  expect(data).toEqual({
    [Host.Jeff]: {
      bold: {
        total: 4,
        correct: 3,
        partial: 0,
        incorrect: 1
      },
      coolRanch: {
        total: 6,
        correct: 0,
        partial: 2,
        incorrect: 4
      },
      total: {
        total: 10,
        correct: 3,
        partial: 2,
        incorrect: 5,
        correctEventually: 2
      }
    },
    [Host.Christian]: {
      bold: {
        total: 8,
        correct: 3,
        partial: 3,
        incorrect: 2
      },
      coolRanch: {
        total: 5,
        correct: 2,
        partial: 1,
        incorrect: 2
      },
      total: {
        total: 13,
        correct: 5,
        partial: 4,
        incorrect: 4,
        correctEventually: 1
      }
    }
  })
})
