import { render, waitFor } from '@testing-library/svelte'

import Page from '../+page.svelte'
import { createPrediction } from '$lib/fixtures/prediction'
import { PredictionType } from '$lib/types/predictionType'

test('renders current year', async () => {
  const { getByText } = render(Page, { data: { year: 2022, predictions: [] } })

  await waitFor(() => expect(getByText(/2022 predictions/i)).toBeInTheDocument())
})

test('contains predictions', async () => {
  const predictions = [
    createPrediction({ prediction: 'p1' }),
    createPrediction({ prediction: 'p2' }),
    createPrediction({ prediction: 'p3' }),
    createPrediction({ prediction: 'p4', prediction_type: PredictionType.CoolRanch }),
    createPrediction({ prediction: 'p5', prediction_type: PredictionType.CoolRanch }),
    createPrediction({ prediction: 'p6', prediction_type: PredictionType.CoolRanch })
  ]
  const { getByText } = render(Page, {
    data: { year: 2023, predictions }
  })

  for (const pr of predictions) {
    await waitFor(() => expect(getByText(pr.prediction)).toBeInTheDocument())
  }
})
