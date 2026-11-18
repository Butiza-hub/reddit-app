import { describe, it, expect, vi } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import postsReducer, { loadPosts } from './postsSlice'
import { fetchPosts } from '../../api/redditApi'

vi.mock('../../api/redditApi', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, fetchPosts: vi.fn(actual.fetchPosts) }
})

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

  it('goes to failed and keeps the error message when loading fails', async () => {
    fetchPosts.mockRejectedValueOnce(new Error('Network down'))
    const store = makeStore()

    await store.dispatch(loadPosts())

    const { status, error } = store.getState().posts
    expect(status).toBe('failed')
    expect(error).toBe('Network down')
  })

  it('recovers when loading is tried again after a failure', async () => {
    fetchPosts.mockRejectedValueOnce(new Error('Network down'))
    const store = makeStore()

    await store.dispatch(loadPosts())
    expect(store.getState().posts.status).toBe('failed')

    await store.dispatch(loadPosts())

    const { status, error, items } = store.getState().posts
    expect(status).toBe('succeeded')
    expect(error).toBeNull()
    expect(items.length).toBeGreaterThan(0)
  })
})