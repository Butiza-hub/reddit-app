import { describe, it, expect } from 'vitest'
import { selectPostById } from './selectors'

const state = {
  posts: {
    items: [
      { id: 'a', title: 'First post' },
      { id: 'b', title: 'Second post' },
    ],
  },
}

describe('selectPostById', () => {
  it('returns the post with the matching id', () => {
    expect(selectPostById(state, 'b')).toEqual({
      id: 'b',
      title: 'Second post',
    })
  })
})