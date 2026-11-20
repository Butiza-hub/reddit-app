import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StatusPanel from './StatusPanel'

describe('StatusPanel', () => {
  it('shows the title as a heading and the message below it', () => {
    render(
      <StatusPanel
        icon="error"
        title="Something went wrong"
        message="We could not load the posts."
      />,
    )

    expect(
      screen.getByRole('heading', { level: 2, name: 'Something went wrong' }),
    ).toBeInTheDocument()
    expect(screen.getByText('We could not load the posts.')).toBeInTheDocument()
  })

  it('can use another heading level', () => {
    render(<StatusPanel icon="error" title="Oops" headingLevel={1} />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Oops' }),
    ).toBeInTheDocument()
  })

  it('calls onAction when the action button is clicked', async () => {
    const user = userEvent.setup()
    const handleAction = vi.fn()
    render(
      <StatusPanel
        icon="error"
        title="Oops"
        actionLabel="Try again"
        onAction={handleAction}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Try again' }))

    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  it('has no button when there is no action', () => {
    render(<StatusPanel icon="loading" title="Loading posts..." />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('hides the icon from assistive technology', () => {
    const { container } = render(
      <StatusPanel icon="search" title="No posts found" />,
    )

    const icon = container.querySelector('svg')
    expect(icon).not.toBeNull()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('uses the role it is given so screen readers announce it', () => {
    render(
      <StatusPanel icon="error" title="Something went wrong" role="alert" />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong')
  })
})