import { describe, it, expect } from 'vitest'
import { fetchPosts } from './redditApi'

describe('fetchPosts', () => {
  it('resolves with a non-empty list of posts', async () => {
    const posts = await fetchPosts()

    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeGreaterThan(0)
  })

  it('gives every post the fields the UI needs', async () => {
    const posts = await fetchPosts()

    for (const post of posts) {
      expect(post).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          subreddit: expect.any(String),
          author: expect.any(String),
          score: expect.any(Number),
          numComments: expect.any(Number),
        }),
      )
    }
  })
})