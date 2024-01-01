import { render, waitFor, within, fireEvent } from '@testing-library/svelte'

import PredictionItem from '../PredictionItem.svelte'
import { createPrediction } from '$lib/fixtures/prediction'
import { Score } from '$lib/types/score'
import { Host } from '$lib/types/host'
import { PredictionType } from '$lib/types/predictionType'

test('renders unscored prediction', async () => {
  const prediction = createPrediction({ score: null })
  const { getByText, findByTestId } = render(PredictionItem, {
    prediction,
    index: 0,
    host: Host.Jeff
  })

  await waitFor(() => expect(getByText(prediction.prediction)).toBeInTheDocument())
  const iconWrapper = await findByTestId('icon-wrapper')

  expect(iconWrapper.innerHTML).toContain('1.')
})

test('renders scored prediction', async () => {
  const prediction = createPrediction({ score: Score.Correct })
  const { getByText, findByTestId } = render(PredictionItem, {
    prediction,
    index: 0,
    host: Host.Lana
  })

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

  const { getByText, findByRole } = render(PredictionItem, {
    prediction,
    index: 0,
    host: Host.Christian
  })

  await waitFor(() => expect(getByText(prediction.prediction)).toBeInTheDocument())
  const tooltipCircle = await findByRole('tooltip')
  expect(tooltipCircle.getAttribute('data-tooltip-text')).toEqual(prediction.details)
})

test('renders correct eventually tooltip', async () => {
  const prediction = createPrediction({
    score: Score.Incorrect,
    correct_eventually: 'It was correct 2 years later'
  })

  const { getByText, findByRole } = render(PredictionItem, {
    prediction,
    index: 0,
    host: Host.Lana
  })

  await waitFor(() => expect(getByText(prediction.prediction)).toBeInTheDocument())

  const tooltipCircle = await findByRole('tooltip')
  expect(tooltipCircle.getAttribute('data-tooltip-text')).toEqual(
    `Correct eventually: ${prediction.correct_eventually}`
  )
})

test('renders dorito chip for jeff cool ranch', async () => {
  const prediction = createPrediction({
    score: null,
    host: Host.Jeff,
    prediction_type: PredictionType.CoolRanch
  })

  const { findByTestId } = render(PredictionItem, {
    prediction,
    index: 0,
    host: prediction.host
  })

  const iconWrapper = await findByTestId('coolranch-icon-wrapper')

  const svg = iconWrapper.querySelector('svg')
  expect(svg!.getAttribute('aria-label')).toContain('dorito')
})

test('renders coffee crisp for lana cool ranch', async () => {
  const prediction = createPrediction({
    score: null,
    host: Host.Lana,
    prediction_type: PredictionType.CoolRanch
  })

  const { findByTestId } = render(PredictionItem, {
    prediction,
    index: 0,
    host: prediction.host
  })

  const iconWrapper = await findByTestId('coolranch-icon-wrapper')

  const svg = iconWrapper.querySelector('svg')
  expect(svg!.getAttribute('aria-label')).toContain('coffee crisp')
})
