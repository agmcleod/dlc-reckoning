import { render, waitFor } from '@testing-library/svelte'

import Layout from '../+layout.svelte'

test('it renders navigation', async () => {
  const { getByText } = render(Layout, {
    data: { mostRecentYear: 2023, data: { 2021: [], 2022: [], 2023: [] } }
  })

  await waitFor(() => expect(getByText('2021', { selector: 'a' })).toBeInTheDocument())
  await waitFor(() => expect(getByText('2022', { selector: 'a' })).toBeInTheDocument())
  await waitFor(() => expect(getByText('2023', { selector: 'a' })).toBeInTheDocument())
  await waitFor(() => expect(getByText(/leaderboard/i, { selector: 'a' })).toBeInTheDocument())
})
