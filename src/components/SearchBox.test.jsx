import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBox from './SearchBox'

describe('SearchBox', () => {
  it('has a labelled search field that shows the current value', () => {
    render(<SearchBox value="redux" onChange={() => {}} />)

    expect(screen.getByLabelText(/search posts/i)).toHaveValue('redux')
  })

  it('reports the typed text through onChange', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<SearchBox value="" onChange={handleChange} />)

    await user.type(screen.getByLabelText(/search posts/i), 'a')

    expect(handleChange).toHaveBeenCalledWith('a')
  })
})