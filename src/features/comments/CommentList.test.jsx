import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CommentList from './CommentList'

const now = Math.floor(Date.now() / 1000)

const comments = [
  {
    id: 'c1',
    author: 'techFan',
    body: 'This is **huge** for mobile devices!',
    createdUtc: now - (5 * 3600 + 60),
  },
  {
    id: 'c2',
    author: 'laptopUser',
    body: 'Things I want to see:\n\n- video playback\n- gaming',
    createdUtc: now - (4 * 3600 + 60),
  },
  {
    id: 'c3',
    author: 'benchWatcher',
    body: 'Read the [original write-up](https://example.com/benchmarks).',
    createdUtc: now - (3 * 3600 + 60),
  },
]

describe('CommentList', () => {
  it('has a Comments heading', () => {
    render(<CommentList comments={comments} />)

    expect(
      screen.getByRole('heading', { level: 2, name: /comments/i }),
    ).toBeInTheDocument()
  })

  it('shows the author and how long ago for each comment', () => {
    render(<CommentList comments={comments} />)

    expect(screen.getByText('u/techFan')).toBeInTheDocument()
    expect(screen.getByText('5h ago')).toBeInTheDocument()
    expect(screen.getByText('u/laptopUser')).toBeInTheDocument()
    expect(screen.getByText('4h ago')).toBeInTheDocument()
  })

  it('renders bold Markdown as bold text', () => {
    render(<CommentList comments={comments} />)

    expect(screen.getByText('huge').tagName).toBe('STRONG')
  })

  it('renders a Markdown list as list items', () => {
    render(<CommentList comments={comments} />)

    expect(screen.getByText('video playback').tagName).toBe('LI')
    expect(screen.getByText('gaming').tagName).toBe('LI')
  })

  it('renders a Markdown link as a real link', () => {
    render(<CommentList comments={comments} />)

    expect(
      screen.getByRole('link', { name: 'original write-up' }),
    ).toHaveAttribute('href', 'https://example.com/benchmarks')
  })

  it('does not turn raw HTML in a comment into real elements', () => {
    const risky = [
      {
        id: 'c9',
        author: 'someone',
        body: 'Hello <b>raw</b> <img src="x" alt="" onerror="alert(1)">',
        createdUtc: now - 3600,
      },
    ]
    const { container } = render(<CommentList comments={risky} />)

    expect(container.querySelector('b')).toBeNull()
    expect(container.querySelector('img')).toBeNull()
  })

  it('says so when there are no comments', () => {
    render(<CommentList comments={[]} />)

    expect(screen.getByText(/no comments yet/i)).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })
})