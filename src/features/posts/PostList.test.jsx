import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsSlice'
import filtersReducer, {
  setCategory,
  setSearchTerm,
} from '../filters/filtersSlice'
import PostList from './PostList'
import { fetchPosts } from '../../api/redditApi'

function renderWithStore(...actions) {
  const store = configureStore({
    reducer: { posts: postsReducer, filters: filtersReducer },
  })
  actions.forEach((action) => store.dispatch(action))

  return render(
    <Provider store={store}>
      <PostList />
    </Provider>,
  )
}

describe('PostList', () => {
  it('shows a loading message before the posts arrive', async () => {
    renderWithStore()

    expect(screen.getByText(/loading posts/i)).toBeInTheDocument()

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

    expect(await screen.findByText(/no posts match/i)).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('brings every post back when "Show all posts" is clicked', async () => {
    const user = userEvent.setup()
    renderWithStore(setCategory('movies'), setSearchTerm('kubernetes'))

    await user.click(
      await screen.findByRole('button', { name: /show all posts/i }),
    )

    const cards = await screen.findAllByRole('article')
    const posts = await fetchPosts()

    expect(cards).toHaveLength(posts.length)
  })
})