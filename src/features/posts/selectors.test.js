import { describe, it, expect } from 'vitest'
import { selectVisiblePosts } from './selectors'

const items = [
  { id: 'a', title: 'Learning Redux Toolkit', subreddit: 'webdev' },
  { id: 'b', title: 'A slow-burn thriller', subreddit: 'movies' },
  { id: 'c', title: 'Why I switched to redux', subreddit: 'programming' },
  { id: 'd', title: 'Redux in a film editor', subreddit: 'movies' },
]

function makeState(searchTerm, category) {
  return {
    posts: { items, status: 'succeeded', error: null },
    filters: { searchTerm, category },
  }
}

const ids = (posts) => posts.map((post) => post.id)

describe('selectVisiblePosts', () => {
  it('returns every post for "all" with no search', () => {
    expect(ids(selectVisiblePosts(makeState('', 'all')))).toEqual([
      'a',
      'b',
      'c',
      'd',
    ])
  })

  it('returns only the posts from the selected category', () => {
    expect(ids(selectVisiblePosts(makeState('', 'movies')))).toEqual([
      'b',
      'd',
    ])
  })

  it('returns only the posts that match the search term', () => {
    expect(ids(selectVisiblePosts(makeState('redux', 'all')))).toEqual([
      'a',
      'c',
      'd',
    ])
  })

  it('applies the category and the search term together', () => {
    expect(ids(selectVisiblePosts(makeState('redux', 'movies')))).toEqual([
      'd',
    ])
  })

  it('returns an empty list when nothing matches', () => {
    expect(selectVisiblePosts(makeState('kubernetes', 'all'))).toEqual([])
  })
})