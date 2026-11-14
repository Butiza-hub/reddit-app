import { describe, it, expect } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import postsReducer, { loadPosts } from './postsSlice'

function makeStore() {
  return configureStore({ reducer: { posts: postsReducer } })
}

describe('postsSlice', () => {
  it('starts idle with no posts and no error', () => {
    const store = makeStore()

    expect(store.getState().posts).toEqual({
      items: [],
      status: 'idle',
      error: null,
    })
  })

  it('goes loading, then succeeded, and stores the posts', async () => {
    const store = makeStore()

    const request = store.dispatch(loadPosts())
    expect(store.getState().posts.status).toBe('loading')

    await request

    const { items, status } = store.getState().posts
    expect(status).toBe('succeeded')
    expect(items.length).toBeGreaterThan(0)
  })
})