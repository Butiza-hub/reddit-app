import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CategoryBar from './CategoryBar'

const labels = [
  'All',
  'Technology',
  'Programming',
  'Web Dev',
  'Movies',
  'Sports',
]

describe('CategoryBar', () => {
  it('shows a button for every category in the design', () => {
    render(<CategoryBar selected="all" onSelect={() => {}} />)

    const names = screen.getAllByRole('button').map((b) => b.textContent)

    expect(names).toEqual(labels)
  })

  it('marks only the selected category as pressed', () => {
    render(<CategoryBar selected="movies" onSelect={() => {}} />)

    expect(screen.getByRole('button', { name: 'Movies' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('reports the category value when a button is clicked', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()
    render(<CategoryBar selected="all" onSelect={handleSelect} />)

    await user.click(screen.getByRole('button', { name: 'Web Dev' }))

    expect(handleSelect).toHaveBeenCalledWith('webdev')
  })
})