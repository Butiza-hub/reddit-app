import { describe, it, expect } from 'vitest'
import store from './store'

describe('store', () => {
  it('has a posts section that starts idle and empty', () => {
    expect(store.getState().posts).toEqual({
      items: [],
      status: 'idle',
      error: null,
    })
  })
})