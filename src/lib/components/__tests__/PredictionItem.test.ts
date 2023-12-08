import { render, waitFor, within, fireEvent } from '@testing-library/svelte'

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

test('renders details tooltip', async () => {
  const prediction = createPrediction({
    score: Score.Incorrect,
    details: 'some extra details'
  })

  const { getByText, findByRole } = render(PredictionItem, { prediction, index: 0 })

  await waitFor(() => expect(getByText(prediction.prediction)).toBeInTheDocument())
  const tooltipCircle = await findByRole('tooltip')
  expect(tooltipCircle.getAttribute('data-tooltip-text')).toEqual(prediction.details)
})

test('renders correct eventually tooltip', async () => {
  const prediction = createPrediction({
    score: Score.Incorrect,
    correct_eventually: 'It was correct 2 years later'
  })

  const { getByText, findByRole } = render(PredictionItem, { prediction, index: 0 })

  await waitFor(() => expect(getByText(prediction.prediction)).toBeInTheDocument())

  const tooltipCircle = await findByRole('tooltip')
  expect(tooltipCircle.getAttribute('data-tooltip-text')).toEqual(
    `Correct eventually: ${prediction.correct_eventually}`
  )
})
