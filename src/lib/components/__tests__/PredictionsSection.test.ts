import { render, waitFor } from '@testing-library/svelte'

import { separatePredictionsList } from '$lib/utils/separatePredictionsList'
import PredictionSection from '../PredictionsSection.svelte'
import { createPrediction } from '$lib/fixtures/prediction'
import { PredictionType } from '$lib/types/predictionType'
import { Host } from '$lib/types/host'

test('renders host names', async () => {
  const { getByText } = render(PredictionSection, {
    separatePredictionsList: separatePredictionsList([
      createPrediction({ prediction_type: PredictionType.Bold, host: Host.Jeff }),
      createPrediction({ prediction_type: PredictionType.CoolRanch, host: Host.Jeff }),
      createPrediction({ prediction_type: PredictionType.Bold, host: Host.Christian }),
      createPrediction({ prediction_type: PredictionType.CoolRanch, host: Host.Christian }),
      createPrediction({ prediction_type: PredictionType.Bold, host: Host.Lana }),
      createPrediction({ prediction_type: PredictionType.CoolRanch, host: Host.Lana })
    ])
  })

  await waitFor(() => expect(getByText(/jeff/i)).toBeInTheDocument())
  await waitFor(() => expect(getByText(/christian/i)).toBeInTheDocument())
  await waitFor(() => expect(getByText(/lana/i)).toBeInTheDocument())
})

// specifics of how these are displayed are tested for those components
// this just ensures we are utilizing the data
test('renders prediction texts', async () => {
  const predictions = [
    createPrediction({ prediction_type: PredictionType.Bold }),
    createPrediction({ prediction_type: PredictionType.CoolRanch }),
    createPrediction({ prediction_type: PredictionType.Bold }),
    createPrediction({ prediction_type: PredictionType.CoolRanch })
  ]

  const separatedLists = separatePredictionsList(predictions)

  const { getByText } = render(PredictionSection, {
    separatePredictionsList: separatedLists
  })

  await waitFor(() => expect(getByText(predictions[0]!.prediction)).toBeInTheDocument())
  await waitFor(() => expect(getByText(predictions[1]!.prediction)).toBeInTheDocument())
  await waitFor(() => expect(getByText(predictions[2]!.prediction)).toBeInTheDocument())
  await waitFor(() => expect(getByText(predictions[3]!.prediction)).toBeInTheDocument())
})
