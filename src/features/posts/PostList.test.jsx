import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import postsReducer from './postsSlice'
import filtersReducer, {
  setCategory,
  setSearchTerm,
} from '../filters/filtersSlice'
import PostList from './PostList'
import { fetchPosts } from '../../api/redditApi'

vi.mock('../../api/redditApi', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, fetchPosts: vi.fn(actual.fetchPosts) }
})

function renderWithStore(...actions) {
  const store = configureStore({
    reducer: { posts: postsReducer, filters: filtersReducer },
  })
  actions.forEach((action) => store.dispatch(action))

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    </Provider>,
  )
}

describe('PostList', () => {
  it('shows a loading status before the posts arrive', async () => {
    renderWithStore()

    expect(screen.getByRole('status')).toHaveTextContent(/loading posts/i)

    await screen.findAllByRole('listitem')
  })

  it('shows every post as a card inside a list', async () => {
    renderWithStore()

    const cards = await screen.findAllByRole('article')
    const posts = await fetchPosts()

    expect(cards).toHaveLength(posts.length)
    expect(screen.getAllByRole('listitem')).toHaveLength(posts.length)
  })

  it('shows the excerpt of the posts', async () => {
    renderWithStore()

    const posts = await fetchPosts()

    expect(await screen.findByText(posts[0].excerpt)).toBeInTheDocument()
  })

  it('shows only the posts from the selected category', async () => {
    renderWithStore(setCategory('movies'))

    const cards = await screen.findAllByRole('article')
    const posts = await fetchPosts()
    const movies = posts.filter((post) => post.subreddit === 'movies')

    expect(cards).toHaveLength(movies.length)
  })

  it('shows only the posts that match the search term', async () => {
    renderWithStore(setSearchTerm('thriller'))

    const cards = await screen.findAllByRole('article')

    expect(cards).toHaveLength(1)
    expect(
      screen.getByRole('heading', { name: /slow-burn thriller/i }),
    ).toBeInTheDocument()
  })

  it('says so when no post matches', async () => {
    renderWithStore(setSearchTerm('kubernetes'))

    expect(
      await screen.findByRole('heading', { name: /no posts found/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/try a different search term/i)).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('shows the posts again when "Clear search" is clicked, and keeps the category', async () => {
    const user = userEvent.setup()
    renderWithStore(setCategory('movies'), setSearchTerm('kubernetes'))

    await user.click(
      await screen.findByRole('button', { name: /clear search/i }),
    )

    const cards = await screen.findAllByRole('article')
    const posts = await fetchPosts()
    const movies = posts.filter((post) => post.subreddit === 'movies')

    expect(cards).toHaveLength(movies.length)
  })

  it('shows an alert with a "Try again" button when loading fails', async () => {
    fetchPosts.mockRejectedValueOnce(new Error('Network down'))
    renderWithStore()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /something went wrong/i,
    )
    expect(
      screen.getByRole('button', { name: /try again/i }),
    ).toBeInTheDocument()
    expect(screen.queryByText(/loading posts/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('loads the posts again when "Try again" is clicked', async () => {
    const user = userEvent.setup()
    fetchPosts.mockRejectedValueOnce(new Error('Network down'))
    renderWithStore()

    await user.click(await screen.findByRole('button', { name: /try again/i }))

    const cards = await screen.findAllByRole('article')
    const posts = await fetchPosts()

    expect(cards).toHaveLength(posts.length)
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument()
  })
})