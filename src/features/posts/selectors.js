import { createSelector } from '@reduxjs/toolkit'
import { filterPosts } from './filterPosts'

const selectItems = (state) => state.posts.items
const selectSearchTerm = (state) => state.filters.searchTerm
const selectCategory = (state) => state.filters.category

export const selectVisiblePosts = createSelector(
  [selectItems, selectSearchTerm, selectCategory],
  (items, searchTerm, category) => {
    const inCategory =
      category === 'all'
        ? items
        : items.filter((post) => post.subreddit === category)

    return filterPosts(inCategory, searchTerm)
  },
)

export const selectPostById = (state, id) =>
  selectItems(state).find((post) => post.id === id)