import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import postsReducer from './postsSlice'
import commentsReducer from '../comments/commentsSlice'
import PostPage from './PostPage'

describe('PostPage comments when the page closes', () => {
  it('clears the comments from the store when the user leaves', async () => {
    const store = configureStore({
      reducer: { posts: postsReducer, comments: commentsReducer },
    })
    const { unmount } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/post/p1']}>
          <Routes>
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    )

    expect(await screen.findByText('u/techFan')).toBeInTheDocument()
    expect(store.getState().comments.items.length).toBeGreaterThan(0)

    unmount()

    expect(store.getState().comments).toEqual({
      items: [],
      status: 'idle',
      error: null,
    })
  })
})