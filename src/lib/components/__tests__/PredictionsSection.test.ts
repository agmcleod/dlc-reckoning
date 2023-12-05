import { render, waitFor } from '@testing-library/svelte'

import PredictionSection from '../PredictionsSection.svelte'
import { createPrediction } from '$lib/fixtures/prediction'
import { PredictionType } from '$lib/types/predictionType'

test('renders host names', async () => {
  const { getByText } = render(PredictionSection)

  await waitFor(() => expect(getByText(/jeff/i)).toBeInTheDocument())
  await waitFor(() => expect(getByText(/christian/i)).toBeInTheDocument())
})

// specifics of how these are displayed are tested for those components
// this just ensures we are utilizing the data
test('renders prediction texts', async () => {
  const jeffBold = [createPrediction({ prediction_type: PredictionType.Bold })]
  const jeffCoolRanch = [createPrediction({ prediction_type: PredictionType.CoolRanch })]
  const christianBold = [createPrediction({ prediction_type: PredictionType.Bold })]
  const christianCoolRanch = [createPrediction({ prediction_type: PredictionType.CoolRanch })]

  const { getByText } = render(PredictionSection, {
    jeffBold,
    jeffCoolRanch,
    christianBold,
    christianCoolRanch
  })

  await waitFor(() => expect(getByText(jeffBold[0].prediction)).toBeInTheDocument())
  await waitFor(() => expect(getByText(jeffCoolRanch[0].prediction)).toBeInTheDocument())
  await waitFor(() => expect(getByText(christianBold[0].prediction)).toBeInTheDocument())
  await waitFor(() => expect(getByText(christianCoolRanch[0].prediction)).toBeInTheDocument())
})
