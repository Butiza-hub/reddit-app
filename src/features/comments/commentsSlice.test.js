import { describe, it, expect, vi } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import commentsReducer, { clearComments, loadComments } from './commentsSlice'
import { fetchComments } from '../../api/redditApi'

vi.mock('../../api/redditApi', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, fetchComments: vi.fn(actual.fetchComments) }
})

function makeStore() {
  return configureStore({ reducer: { comments: commentsReducer } })
}

describe('commentsSlice', () => {
  it('starts idle and empty', () => {
    expect(commentsReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      status: 'idle',
      error: null,
    })
  })

  it('goes loading, then succeeded, and stores the comments', async () => {
    const store = makeStore()
    const expected = await fetchComments('p1')

    const request = store.dispatch(loadComments('p1'))
    expect(store.getState().comments.status).toBe('loading')

    await request

    const { items, status } = store.getState().comments
    expect(status).toBe('succeeded')
    expect(items).toEqual(expected)
  })

  it('succeeds with an empty list for a post that has no comments', async () => {
    const store = makeStore()

    await store.dispatch(loadComments('p3'))

    const { items, status } = store.getState().comments
    expect(status).toBe('succeeded')
    expect(items).toEqual([])
  })

  it('goes to failed and keeps the error message when loading fails', async () => {
    fetchComments.mockRejectedValueOnce(new Error('Network down'))
    const store = makeStore()

    await store.dispatch(loadComments('p1'))

    const { status, error } = store.getState().comments
    expect(status).toBe('failed')
    expect(error).toBe('Network down')
  })

  it('clears the previous post comments while the next ones load', async () => {
    const store = makeStore()
    await store.dispatch(loadComments('p1'))
    expect(store.getState().comments.items.length).toBeGreaterThan(0)

    const request = store.dispatch(loadComments('p2'))

    expect(store.getState().comments.items).toEqual([])
    await request
  })

  it('goes back to the starting state when the comments are cleared', async () => {
    const store = makeStore()
    await store.dispatch(loadComments('p1'))

    store.dispatch(clearComments())

    expect(store.getState().comments).toEqual({
      items: [],
      status: 'idle',
      error: null,
    })
  })
})