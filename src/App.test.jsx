import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './features/posts/postsSlice'
import filtersReducer from './features/filters/filtersSlice'
import { fetchPosts } from './api/redditApi'
import App from './App'

function renderApp() {
  const store = configureStore({
    reducer: { posts: postsReducer, filters: filtersReducer },
  })
  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
}

describe('App', () => {
  it('shows the list of posts', async () => {
    renderApp()

    const items = await screen.findAllByRole('listitem')
    expect(items.length).toBeGreaterThan(0)
  })

  it('shows the title, the search box and the category buttons', async () => {
    renderApp()

    expect(
      screen.getByRole('heading', { level: 1, name: 'Reddit App' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/search posts/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Movies' })).toBeInTheDocument()

    await screen.findAllByRole('article')
  })

  it('filters the posts as the user types in the search box', async () => {
    const user = userEvent.setup()
    renderApp()
    await screen.findAllByRole('article')

    await user.type(screen.getByLabelText(/search posts/i), 'thriller')

    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(
      screen.getByRole('heading', { name: /slow-burn thriller/i }),
    ).toBeInTheDocument()
  })

  it('filters the posts when a category is selected', async () => {
    const user = userEvent.setup()
    renderApp()
    await screen.findAllByRole('article')
    const posts = await fetchPosts()
    const movies = posts.filter((post) => post.subreddit === 'movies')

    await user.click(screen.getByRole('button', { name: 'Movies' }))

    expect(screen.getAllByRole('article')).toHaveLength(movies.length)
    expect(screen.getByRole('button', { name: 'Movies' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('clears the search box when "Show all posts" is clicked', async () => {
    const user = userEvent.setup()
    renderApp()
    await screen.findAllByRole('article')

    await user.type(screen.getByLabelText(/search posts/i), 'kubernetes')
    await user.click(
      await screen.findByRole('button', { name: /show all posts/i }),
    )

    expect(screen.getByLabelText(/search posts/i)).toHaveValue('')
    expect(screen.getAllByRole('article').length).toBeGreaterThan(1)
  })
})