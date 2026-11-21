import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import postsReducer from './postsSlice'
import commentsReducer from '../comments/commentsSlice'
import PostPage from './PostPage'
import { fetchComments } from '../../api/redditApi'

vi.mock('../../api/redditApi', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, fetchComments: vi.fn(actual.fetchComments) }
})

function renderPostPage(id) {
  const store = configureStore({
    reducer: { posts: postsReducer, comments: commentsReducer },
  })
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/post/${id}`]}>
        <Routes>
          <Route path="/" element={<p>Feed page</p>} />
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

  it('shows a loading status until the posts have arrived', async () => {
    renderPostPage('p1')

    expect(screen.getByRole('status')).toHaveTextContent('Loading post...')

    await screen.findByRole('heading', { level: 1 })
  })

  it('says the post was not found when the id does not exist', async () => {
    renderPostPage('nope')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Post not found' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/might have been removed or no longer exists/i),
    ).toBeInTheDocument()
    expect(screen.queryByText('Loading post...')).not.toBeInTheDocument()
  })

  it('goes to the feed when "Go back to feed" is clicked', async () => {
    const user = userEvent.setup()
    renderPostPage('nope')

    await user.click(
      await screen.findByRole('button', { name: /go back to feed/i }),
    )

    expect(await screen.findByText('Feed page')).toBeInTheDocument()
  })

  it('keeps a back link to the feed while loading and once the post shows', async () => {
    renderPostPage('p1')

    expect(screen.getByRole('link', { name: /back to feed/i })).toHaveAttribute(
      'href',
      '/',
    )

    await screen.findByRole('heading', { level: 1 })

    expect(screen.getByRole('link', { name: /back to feed/i })).toHaveAttribute(
      'href',
      '/',
    )
  })

  it('shows the comments for the post, with Markdown rendered', async () => {
    renderPostPage('p1')

    expect(await screen.findByText('u/techFan')).toBeInTheDocument()
    expect(screen.getByText('u/laptopUser')).toBeInTheDocument()
    expect(screen.getByText('huge').tagName).toBe('STRONG')
  })

  it('says there are no comments yet for a post without any', async () => {
    renderPostPage('p3')

    expect(await screen.findByText(/no comments yet/i)).toBeInTheDocument()
  })

  it('says the comments could not be loaded when that request fails', async () => {
    fetchComments.mockRejectedValueOnce(new Error('Network down'))
    renderPostPage('p1')

    expect(
      await screen.findByText(/couldn.t load the comments/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /new chip design promises/i,
      }),
    ).toBeInTheDocument()
  })
})