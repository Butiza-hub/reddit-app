import { describe, it, expect } from 'vitest'
import { fetchPosts } from './redditApi'

const categories = ['technology', 'programming', 'webdev', 'movies', 'sports']

describe('fetchPosts', () => {
  it('resolves with a non-empty list of posts', async () => {
    const posts = await fetchPosts()

    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeGreaterThan(0)
  })

  it('gives every post the fields the cards need', async () => {
    const posts = await fetchPosts()

    for (const post of posts) {
      expect(post).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          subreddit: expect.any(String),
          author: expect.any(String),
          excerpt: expect.any(String),
          createdUtc: expect.any(Number),
          score: expect.any(Number),
          numComments: expect.any(Number),
        }),
      )
    }
  })

  it('has at least one post for every category in the design', async () => {
    const posts = await fetchPosts()
    const subreddits = posts.map((post) => post.subreddit)

    for (const category of categories) {
      expect(subreddits).toContain(category)
    }
  })
}) 