import { render, waitFor } from '@testing-library/svelte'

import Page from '../+page.svelte'
import { createPrediction } from '$lib/fixtures/prediction'
import { PredictionType } from '$lib/types/predictionType'

test('renders current year', async () => {
  const { getByText } = render(Page, { data: { mostRecentYear: 2023, data: { 2023: [] } } })

  await waitFor(() => expect(getByText(/2023 predictions/i)).toBeInTheDocument())
})

test('has the disclaimer', async () => {
  const { getByText } = render(Page, { data: { mostRecentYear: 2023, data: { 2023: [] } } })

  await waitFor(() =>
    expect(getByText(/this is a fan made, non-affiliated site/i)).toBeInTheDocument()
  )
})

test('contains predictions', async () => {
  const predictions = [
    createPrediction(),
    createPrediction(),
    createPrediction(),
    createPrediction({ prediction_type: PredictionType.CoolRanch }),
    createPrediction({ prediction_type: PredictionType.CoolRanch }),
    createPrediction({ prediction_type: PredictionType.CoolRanch })
  ]
  const { getByText } = render(Page, {
    data: { mostRecentYear: 2023, data: { 2023: predictions } }
  })

  for (const pr of predictions) {
    await waitFor(() => expect(getByText(pr.prediction)).toBeInTheDocument())
  }
})
