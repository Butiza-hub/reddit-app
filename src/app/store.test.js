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

  it('has a filters section that starts with no search and all categories', () => {
    expect(store.getState().filters).toEqual({
      searchTerm: '',
      category: 'all',
    })
  })

  it('has a comments section that starts idle and empty', () => {
    expect(store.getState().comments).toEqual({
      items: [],
      status: 'idle',
      error: null,
    })
  })
})