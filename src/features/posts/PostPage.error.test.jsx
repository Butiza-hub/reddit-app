import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import postsReducer from './postsSlice'
import commentsReducer from '../comments/commentsSlice'
import PostPage from './PostPage'
import { fetchPosts } from '../../api/redditApi'

vi.mock('../../api/redditApi', () => ({
  fetchPosts: vi.fn(() => Promise.reject(new Error('Network down'))),
  fetchComments: vi.fn(() => Promise.resolve([])),
}))

function renderPostPage(id) {
  const store = configureStore({
    reducer: { posts: postsReducer, comments: commentsReducer },
  })
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
  it('shows an alert with a Try again button', async () => {
    renderPostPage('p1')

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Something went wrong',
    )
    expect(
      screen.getByRole('button', { name: 'Try again' }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Loading post...')).not.toBeInTheDocument()
  })

  it('loads the post again when Try again is clicked', async () => {
    const user = userEvent.setup()
    renderPostPage('p1')
    await screen.findByText('Something went wrong')

    fetchPosts.mockResolvedValueOnce([
      {
        id: 'p1',
        title: 'Recovered post',
        subreddit: 'technology',
        author: 'someone',
        excerpt: 'It worked the second time.',
        score: 1,
        numComments: 0,
      },
    ])
    await user.click(screen.getByRole('button', { name: 'Try again' }))

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Recovered post' }),
    ).toBeInTheDocument()
  })
})