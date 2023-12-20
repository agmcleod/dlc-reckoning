import { Host } from '$lib/types/host'
import { PredictionType } from '$lib/types/predictionType'
import { Score } from '$lib/types/score'
import { load } from '../+layout'

vi.mock('$lib/assets/data.json', () => {
  return {
    default: [
      {
        year: 2015,
        prediction: 'P1',
        prediction_type: 'Bold',
        host: 'Christian',
        score: 'Correct',
        correct_eventually: '',
        details: ''
      },
      {
        year: 2015,
        prediction: 'P2',
        prediction_type: 'Bold',
        host: 'Christian',
        score: 'Partial',
        correct_eventually: '',
        details: ''
      },
      {
        year: 2015,
        prediction: 'P3',
        prediction_type: 'Bold',
        host: 'Jeff',
        score: 'Correct',
        correct_eventually: '',
        details: ''
      },
      {
        year: 2016,
        prediction: 'P4',
        prediction_type: 'CoolRanch',
        host: 'Both',
        score: 'Correct',
        correct_eventually: '',
        details: ''
      },
      {
        year: 2016,
        prediction: 'P5',
        prediction_type: 'CoolRanch',
        host: 'Jeff',
        score: 'Incorrect',
        correct_eventually: '',
        details: ''
      },
      {
        year: 2017,
        prediction: 'P6',
        prediction_type: 'Bold',
        host: 'Lana',
        score: 'Correct',
        correct_eventually: '',
        details: ''
      }
    ]
  }
})

test('returns mapped prediction data', () => {
  const result = load()

  expect(result.mostRecentYear).toEqual(2017)
  expect(result.data['2015']).toEqual([
    {
      year: 2015,
      prediction: 'P1',
      prediction_type: PredictionType.Bold,
      host: Host.Christian,
      score: Score.Correct,
      correct_eventually: '',
      details: ''
    },
    {
      year: 2015,
      prediction: 'P2',
      prediction_type: PredictionType.Bold,
      host: Host.Christian,
      score: Score.Partial,
      correct_eventually: '',
      details: ''
    },
    {
      year: 2015,
      prediction: 'P3',
      prediction_type: PredictionType.Bold,
      host: Host.Jeff,
      score: Score.Correct,
      correct_eventually: '',
      details: ''
    }
  ])
  expect(result.data['2016']).toEqual([
    // Both record gets duplicated into two
    {
      year: 2016,
      prediction: 'P4',
      prediction_type: PredictionType.CoolRanch,
      host: Host.Christian,
      score: Score.Correct,
      correct_eventually: '',
      details: ''
    },
    {
      year: 2016,
      prediction: 'P4',
      prediction_type: PredictionType.CoolRanch,
      host: Host.Jeff,
      score: Score.Correct,
      correct_eventually: '',
      details: ''
    },
    {
      year: 2016,
      prediction: 'P5',
      prediction_type: PredictionType.CoolRanch,
      host: Host.Jeff,
      score: Score.Incorrect,
      correct_eventually: '',
      details: ''
    }
  ])

  expect(result.data['2017']).toEqual([
    {
      year: 2017,
      prediction: 'P6',
      prediction_type: PredictionType.Bold,
      host: Host.Lana,
      score: Score.Correct,
      correct_eventually: '',
      details: ''
    }
  ])
})
