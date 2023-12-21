import { render, waitFor, within } from '@testing-library/svelte'
import Page from '../+page.svelte'
import type { StatisticsData, StatisticsHostData } from '../types'
import { Host } from '$lib/types/host'

function emptyHostData(): StatisticsHostData {
  return {
    bold: {
      total: 0,
      correct: 0,
      incorrect: 0,
      partial: 0
    },
    coolRanch: {
      total: 0,
      correct: 0,
      incorrect: 0,
      partial: 0
    },
    total: {
      total: 0,
      correct: 0,
      incorrect: 0,
      partial: 0,
      correctEventually: 0
    },
    accuracyByYear: {}
  }
}

function emptyScores(): StatisticsData {
  return {
    [Host.Jeff]: {
      ...emptyHostData(),
      total: {
        total: 1,
        correct: 0,
        incorrect: 0,
        partial: 0,
        correctEventually: 0
      }
    },
    [Host.Christian]: {
      ...emptyHostData(),
      total: {
        total: 1,
        correct: 0,
        incorrect: 0,
        partial: 0,
        correctEventually: 0
      }
    },
    [Host.Lana]: emptyHostData()
  }
}

test('renders leaderboard header', async () => {
  const { getByText } = render(Page, { data: { leaderboard: emptyScores() } })

  await waitFor(() => expect(getByText(/leaderboard/i, { selector: 'h1' })).toBeInTheDocument())
})

test('contains portraits of the host', async () => {
  const { getByText } = render(Page, { data: { leaderboard: emptyScores() } })

  await waitFor(() => expect(getByText(/christian/i, { selector: 'h2' })).toBeInTheDocument())
  await waitFor(() => expect(getByText(/jeff/i, { selector: 'h2' })).toBeInTheDocument())
})

test('contains valid scores', async () => {
  const data: StatisticsData = {
    [Host.Jeff]: {
      bold: {
        correct: 0,
        incorrect: 4,
        partial: 2,
        total: 6
      },
      coolRanch: {
        correct: 6,
        incorrect: 0,
        partial: 1,
        total: 7
      },
      total: {
        correct: 6,
        incorrect: 4,
        partial: 3,
        total: 13,
        correctEventually: 2
      },
      accuracyByYear: { 2015: 60, 2016: 30 }
    },
    [Host.Christian]: {
      bold: {
        correct: 4,
        incorrect: 2,
        partial: 1,
        total: 7
      },
      coolRanch: {
        correct: 3,
        incorrect: 3,
        partial: 2,
        total: 8
      },
      total: {
        correct: 7,
        incorrect: 5,
        partial: 3,
        total: 15,
        correctEventually: 1
      },
      accuracyByYear: { 2015: 20, 2016: 40 }
    },
    [Host.Lana]: emptyHostData()
  }

  const { findAllByTestId } = render(Page, { data: { leaderboard: data } })

  const totalScoreSections = await findAllByTestId('total-scores')
  expect(totalScoreSections.length).toEqual(2)

  const correctJeff = await within(totalScoreSections[0]!).findByTestId('correct-predictions')
  await waitFor(() => expect(within(correctJeff).getByText('46.2%')).toBeInTheDocument())

  const incorrectJeff = await within(totalScoreSections[0]!).findByTestId('incorrect-predictions')
  await waitFor(() => expect(within(incorrectJeff).getByText('30.8%')).toBeInTheDocument())

  const partialJeff = await within(totalScoreSections[0]!).findByTestId('partial-predictions')
  await waitFor(() => expect(within(partialJeff).getByText('23.1%')).toBeInTheDocument())

  const eventuallyJeff = await within(totalScoreSections[0]!).findByTestId('correct-eventually')
  await waitFor(() => expect(within(eventuallyJeff).getByText('50%')).toBeInTheDocument())

  const correctChristian = await within(totalScoreSections[1]!).findByTestId('correct-predictions')
  await waitFor(() => expect(within(correctChristian).getByText('46.7%')).toBeInTheDocument())

  const incorrectChristian = await within(totalScoreSections[1]!).findByTestId(
    'incorrect-predictions'
  )
  await waitFor(() => expect(within(incorrectChristian).getByText('33.3%')).toBeInTheDocument())

  const partialChristian = await within(totalScoreSections[1]!).findByTestId('partial-predictions')
  await waitFor(() => expect(within(partialChristian).getByText('20%')).toBeInTheDocument())

  const eventuallyChristian = await within(totalScoreSections[1]!).findByTestId(
    'correct-eventually'
  )
  await waitFor(() => expect(within(eventuallyChristian).getByText('20%')).toBeInTheDocument())

  // breakdown test cases
  const breakdownSections = await findAllByTestId('break-down')
  expect(breakdownSections.length).toEqual(2)

  const correctBoldJeff = await within(breakdownSections[0]!).findByTestId('correct-b')
  await waitFor(() => expect(within(correctBoldJeff).getByText('0%')).toBeInTheDocument())

  const correctCoolRanchJeff = await within(breakdownSections[0]!).findByTestId('correct-cr')
  await waitFor(() => expect(within(correctCoolRanchJeff).getByText('85.7%')).toBeInTheDocument())

  const incorrectBoldJeff = await within(breakdownSections[0]!).findByTestId('incorrect-b')
  await waitFor(() => expect(within(incorrectBoldJeff).getByText('66.7%')).toBeInTheDocument())

  const incorrectCoolRanchJeff = await within(breakdownSections[0]!).findByTestId('incorrect-cr')
  await waitFor(() => expect(within(incorrectCoolRanchJeff).getByText('0%')).toBeInTheDocument())

  const partialBoldJeff = await within(breakdownSections[0]!).findByTestId('partial-b')
  await waitFor(() => expect(within(partialBoldJeff).getByText('33.3%')).toBeInTheDocument())

  const partialCoolRanchJeff = await within(breakdownSections[0]!).findByTestId('partial-cr')
  await waitFor(() => expect(within(partialCoolRanchJeff).getByText('14.3%')).toBeInTheDocument())

  // christian breakdown scores
  const correctBoldChristian = await within(breakdownSections[1]!).findByTestId('correct-b')
  await waitFor(() => expect(within(correctBoldChristian).getByText('57.1%')).toBeInTheDocument())

  const correctCoolRanchChristian = await within(breakdownSections[1]!).findByTestId('correct-cr')
  await waitFor(() =>
    expect(within(correctCoolRanchChristian).getByText('37.5%')).toBeInTheDocument()
  )

  const incorrectBoldChristian = await within(breakdownSections[1]!).findByTestId('incorrect-b')
  await waitFor(() => expect(within(incorrectBoldChristian).getByText('28.6%')).toBeInTheDocument())

  const incorrectCoolRanchChristian = await within(breakdownSections[1]!).findByTestId(
    'incorrect-cr'
  )
  await waitFor(() =>
    expect(within(incorrectCoolRanchChristian).getByText('37.5%')).toBeInTheDocument()
  )

  const partialBoldChristian = await within(breakdownSections[1]!).findByTestId('partial-b')
  await waitFor(() => expect(within(partialBoldChristian).getByText('14.3%')).toBeInTheDocument())

  const partialCoolRanchChristian = await within(breakdownSections[1]!).findByTestId('partial-cr')
  await waitFor(() =>
    expect(within(partialCoolRanchChristian).getByText('25%')).toBeInTheDocument()
  )
})
