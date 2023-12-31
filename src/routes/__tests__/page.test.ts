import { render, waitFor } from '@testing-library/svelte'

import Page from '../+page.svelte'
import { createPrediction } from '$lib/fixtures/prediction'
import { PredictionType } from '$lib/types/predictionType'
import { Host } from '$lib/types/host'

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
    createPrediction({ host: Host.Jeff }),
    createPrediction({ host: Host.Christian }),
    createPrediction({ host: Host.Christian }),
    createPrediction({ prediction_type: PredictionType.CoolRanch, host: Host.Jeff }),
    createPrediction({ prediction_type: PredictionType.CoolRanch, host: Host.Christian }),
    createPrediction({ prediction_type: PredictionType.CoolRanch, host: Host.Jeff })
  ]
  const { getByText } = render(Page, {
    data: { mostRecentYear: 2023, data: { 2023: predictions } }
  })

  for (const pr of predictions) {
    await waitFor(() => expect(getByText(pr.prediction)).toBeInTheDocument())
  }
})
