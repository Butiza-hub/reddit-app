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

  it('shows the subreddit, author, excerpt, points and comment count', async () => {
    renderPostPage('p1')

    expect(await screen.findByText('r/technology')).toBeInTheDocument()
    expect(screen.getByText('u/user123')).toBeInTheDocument()
    expect(screen.getByText(/a hardware team shared early/i)).toBeInTheDocument()
    expect(screen.getByText('245 points')).toBeInTheDocument()
    expect(screen.getByText('38 comments')).toBeInTheDocument()
  })

  it('shows a loading message until the posts have arrived', async () => {
    renderPostPage('p1')

    expect(screen.getByText('Loading post...')).toBeInTheDocument()

    await screen.findByRole('heading', { level: 1 })
  })

  it('says the post was not found when the id does not exist', async () => {
    renderPostPage('nope')

    expect(await screen.findByText('Post not found')).toBeInTheDocument()
    expect(screen.queryByText('Loading post...')).not.toBeInTheDocument()
  })
})