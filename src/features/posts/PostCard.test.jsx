import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PostCard from './PostCard'

const post = {
  id: 'p1',
  title: 'New chip design promises a full day of battery life',
  subreddit: 'technology',
  author: 'user123',
  excerpt: 'Early benchmarks look good, but real use will tell.',
  createdUtc: Math.floor(Date.now() / 1000) - (6 * 3600 + 60),
  score: 245,
  numComments: 38,
}

function renderCard() {
  return render(
    <MemoryRouter>
      <PostCard post={post} />
    </MemoryRouter>,
  )
}

describe('PostCard', () => {
  it('shows the title as a heading', () => {
    renderCard()

    expect(
      screen.getByRole('heading', { name: post.title }),
    ).toBeInTheDocument()
  })

  it('links the title to the post page', () => {
    renderCard()

    expect(screen.getByRole('link', { name: post.title })).toHaveAttribute(
      'href',
      '/post/p1',
    )
  })

  it('shows the subreddit, author and how long ago it was posted', () => {
    renderCard()

    expect(screen.getByText('r/technology')).toBeInTheDocument()
    expect(screen.getByText('u/user123')).toBeInTheDocument()
    expect(screen.getByText('6h ago')).toBeInTheDocument()
  })

  it('shows the excerpt', () => {
    renderCard()

    expect(screen.getByText(post.excerpt)).toBeInTheDocument()
  })

  it('shows the score and the comment count', () => {
    renderCard()

    expect(screen.getByText('245 points')).toBeInTheDocument()
    expect(screen.getByText('38 comments')).toBeInTheDocument()
  })

  it('has no vote, share or save buttons', () => {
    renderCard()

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})