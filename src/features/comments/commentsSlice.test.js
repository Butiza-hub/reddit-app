import { describe, it, expect } from 'vitest'
import commentsReducer from './commentsSlice'

describe('commentsSlice', () => {
  it('starts idle and empty', () => {
    expect(commentsReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      status: 'idle',
      error: null,
    })
  })
})