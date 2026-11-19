import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import postsReducer from './features/posts/postsSlice'
import filtersReducer from './features/filters/filtersSlice'
import commentsReducer from './features/comments/commentsSlice'
import App from './App'

function renderApp() {
  const store = configureStore({
    reducer: {
      posts: postsReducer,
      filters: filtersReducer,
      comments: commentsReducer,
    },
  })
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Provider>,
  )
}

describe('App navigation', () => {
  it('opens the post page when a card title is clicked', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(
      await screen.findByRole('link', { name: /slow-burn thriller/i }),
    )

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /slow-burn thriller/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /back to feed/i }),
    ).toBeInTheDocument()
  })

  it('returns to the feed from the post page', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(
      await screen.findByRole('link', { name: /slow-burn thriller/i }),
    )
    await user.click(await screen.findByRole('link', { name: /back to feed/i }))

    expect(await screen.findByLabelText(/search posts/i)).toBeInTheDocument()
    expect((await screen.findAllByRole('article')).length).toBeGreaterThan(1)
  })
})