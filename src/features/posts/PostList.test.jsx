import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsSlice'
import PostList from './PostList'

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

  it('shows the posts once they have loaded', async () => {
    renderWithStore()

    const items = await screen.findAllByRole('listitem')
    expect(items.length).toBeGreaterThan(0)
  })
})