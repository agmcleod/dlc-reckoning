import { render, waitFor, within } from '@testing-library/svelte'

import PredictionDetails from '../PredictionDetails.svelte'
import { createPrediction } from '../../fixtures/prediction'
import { PredictionType } from '../../types/predictionType'
import { Host } from '$lib/types/host'

test('renders bold & cool ranch items', async () => {
  const boldPredictions = [
    createPrediction({ prediction_type: PredictionType.Bold }),
    createPrediction({ prediction_type: PredictionType.Bold }),
    createPrediction({ prediction_type: PredictionType.Bold })
  ]

  const coolRanchPredictions = [
    createPrediction({ prediction_type: PredictionType.CoolRanch }),
    createPrediction({ prediction_type: PredictionType.CoolRanch }),
    createPrediction({ prediction_type: PredictionType.CoolRanch })
  ]
  const { getByText, findByTestId } = render(PredictionDetails, {
    boldPredictions,
    coolRanchPredictions,
    host: Host.Jeff
  })

  await waitFor(() => expect(getByText(/bold/i, { selector: 'h3' })).toBeInTheDocument())
  await waitFor(() => expect(getByText(/cool ranch/i, { selector: 'h3' })).toBeInTheDocument())

  const boldWrapper = await findByTestId('bold-section')
  for (const prediction of boldPredictions) {
    await waitFor(() =>
      expect(within(boldWrapper).getByText(prediction.prediction)).toBeInTheDocument()
    )
  }

  const crWrapper = await findByTestId('cool-ranch-section')
  for (const prediction of coolRanchPredictions) {
    await waitFor(() =>
      expect(within(crWrapper).getByText(prediction.prediction)).toBeInTheDocument()
    )
  }
})
