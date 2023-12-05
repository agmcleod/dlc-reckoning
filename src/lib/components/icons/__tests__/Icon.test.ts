import { render, waitFor } from '@testing-library/svelte'

import Icon from '../Icon.svelte'

test('renders the close icon', async () => {
  const { findByTestId } = render(Icon, { name: 'close', fill: '#f00', ariaLabel: 'Incorrect' })

  const svgIcon = await findByTestId('icon')
  expect(svgIcon.getAttribute('fill')).toEqual('#f00')
  expect(svgIcon.getAttribute('aria-label')).toEqual('Incorrect')
})

test('renders the done icon', async () => {
  const { findByTestId } = render(Icon, { name: 'done', fill: '#0f0', ariaLabel: 'Correct' })

  const svgIcon = await findByTestId('icon')
  expect(svgIcon.getAttribute('fill')).toEqual('#0f0')
  expect(svgIcon.getAttribute('aria-label')).toEqual('Correct')
})

test('renders the clock icon', async () => {
  const { findByTestId } = render(Icon, { name: 'clock', fill: '#ff0', ariaLabel: 'Partial' })

  const svgIcon = await findByTestId('icon')
  expect(svgIcon.getAttribute('fill')).toEqual('#ff0')
  expect(svgIcon.getAttribute('aria-label')).toEqual('Partial')
})
