import { render, waitFor, within } from '@testing-library/svelte'

import PredictionItem from '../PredictionItem.svelte'
import { createPrediction } from '$lib/fixtures/prediction'
import { Score } from '$lib/types/score'

test('renders unscored prediction', async () => {
  const prediction = createPrediction({ score: null })
  const { getByText, findByTestId } = render(PredictionItem, { prediction, index: 0 })

  await waitFor(() => expect(getByText(prediction.prediction)).toBeInTheDocument())
  const iconWrapper = await findByTestId('icon-wrapper')

  expect(iconWrapper.innerHTML).toContain('1.')
})

test('renders scored prediction', async () => {
  const prediction = createPrediction({ score: Score.Correct })
  const { getByText, findByTestId } = render(PredictionItem, { prediction, index: 0 })

  await waitFor(() => expect(getByText(prediction.prediction)).toBeInTheDocument())
  const iconWrapper = await findByTestId('icon-wrapper')

  expect(iconWrapper.innerHTML).not.toContain('1.')

  await waitFor(() => expect(within(iconWrapper).getByTestId('icon')).toBeInTheDocument())
})
