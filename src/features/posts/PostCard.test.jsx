import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
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

describe('PostCard', () => {
  it('shows the title as a heading', () => {
    render(<PostCard post={post} />)

    expect(
      screen.getByRole('heading', { name: post.title }),
    ).toBeInTheDocument()
  })

  it('shows the subreddit, author and how long ago it was posted', () => {
    render(<PostCard post={post} />)

    expect(screen.getByText('r/technology')).toBeInTheDocument()
    expect(screen.getByText('u/user123')).toBeInTheDocument()
    expect(screen.getByText('6h ago')).toBeInTheDocument()
  })

  it('shows the excerpt', () => {
    render(<PostCard post={post} />)

    expect(screen.getByText(post.excerpt)).toBeInTheDocument()
  })

  it('shows the score and the comment count', () => {
    render(<PostCard post={post} />)

    expect(screen.getByText('245 points')).toBeInTheDocument()
    expect(screen.getByText('38 comments')).toBeInTheDocument()
  })

  it('has no vote, share or save buttons', () => {
    render(<PostCard post={post} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})