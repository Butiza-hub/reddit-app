import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import postsReducer from './postsSlice'
import PostPage from './PostPage'

vi.mock('../../api/redditApi', () => ({
  fetchPosts: vi.fn(() => Promise.reject(new Error('Network down'))),
}))

function renderPostPage(id) {
  const store = configureStore({ reducer: { posts: postsReducer } })
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/post/${id}`]}>
        <Routes>
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  )
}

describe('PostPage when loading fails', () => {
  it('shows an error message with a Try again button', async () => {
    renderPostPage('p1')

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Try again' }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Loading post...')).not.toBeInTheDocument()
  })
})
