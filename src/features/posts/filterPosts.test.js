import { describe, it, expect } from 'vitest'
import { filterPosts } from './filterPosts'

const posts = [
  { id: 'a', title: 'Learning Redux Toolkit', subreddit: 'reactjs' },
  { id: 'b', title: 'Sourdough starter tips', subreddit: 'breadit' },
  { id: 'c', title: 'Why I switched to redux', subreddit: 'webdev' },
]

describe('filterPosts', () => {
  it('returns every post when the term is empty', () => {
    expect(filterPosts(posts, '')).toEqual(posts)
  })

  it('returns every post when the term is only spaces', () => {
    expect(filterPosts(posts, '   ')).toEqual(posts)
  })

  it('matches titles regardless of capital letters', () => {
    const result = filterPosts(posts, 'REDUX')

    expect(result.map((post) => post.id)).toEqual(['a', 'c'])
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterPosts(posts, 'kubernetes')).toEqual([])
  })
})