import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import postsReducer from './postsSlice'
import PostPage from './PostPage'

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

describe('PostPage', () => {
  it('shows the title of the post as the main heading', async () => {
    renderPostPage('p1')

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /new chip design promises/i,
      }),
    ).toBeInTheDocument()
  })
})