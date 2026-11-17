import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsSlice'
import PostList from './PostList'
import { fetchPosts } from '../../api/redditApi'

function renderWithStore() {
  const store = configureStore({ reducer: { posts: postsReducer } })
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
})