import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, MemoryRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'

function renderWithLinks() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <ScrollToTop />
      <Link to="/post/p1">Open post</Link>
      <Link to="/">Home</Link>
    </MemoryRouter>,
  )
}

describe('ScrollToTop', () => {
  it('scrolls to the top when the page changes', async () => {
    const user = userEvent.setup()
    renderWithLinks()
    window.scrollTo.mockClear()

    await user.click(screen.getByRole('link', { name: 'Open post' }))

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })

  it('does not scroll when the user stays on the same page', async () => {
    const user = userEvent.setup()
    renderWithLinks()
    window.scrollTo.mockClear()

    await user.click(screen.getByRole('link', { name: 'Home' }))

    expect(window.scrollTo).not.toHaveBeenCalled()
  })
})