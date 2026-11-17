import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './features/posts/postsSlice'
import filtersReducer from './features/filters/filtersSlice'
import App from './App'

function renderApp() {
  const store = configureStore({
    reducer: { posts: postsReducer, filters: filtersReducer },
  })
  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
}

describe('App', () => {
  it('shows the list of posts', async () => {
    renderApp()

    const items = await screen.findAllByRole('listitem')
    expect(items.length).toBeGreaterThan(0)
  })
})