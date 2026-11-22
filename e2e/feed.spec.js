import { test, expect } from '@playwright/test'

test.describe('feed', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows the title, the search box and the post cards', async ({
    page,
  }) => {
    await expect(page).toHaveTitle('Reddit App')
    await expect(
      page.getByRole('heading', { level: 1, name: 'Reddit App' }),
    ).toBeVisible()
    await expect(page.getByLabel('Search posts')).toBeVisible()
    await expect(page.getByRole('article')).toHaveCount(6)
  })

  test('typing in the search box narrows the list', async ({ page }) => {
    await page.getByLabel('Search posts').fill('thriller')

    await expect(page.getByRole('article')).toHaveCount(1)
    await expect(
      page.getByRole('heading', { name: /slow-burn thriller/i }),
    ).toBeVisible()
  })

  test('choosing a category narrows the list', async ({ page }) => {
    const movies = page.getByRole('button', { name: 'Movies' })

    await movies.click()

    await expect(movies).toHaveAttribute('aria-pressed', 'true')
    await expect(page.getByRole('article')).toHaveCount(1)
  })

  test('a search with no matches offers "Clear search"', async ({ page }) => {
    await page.getByLabel('Search posts').fill('kubernetes')

    await expect(
      page.getByRole('heading', { name: 'No posts found' }),
    ).toBeVisible()

    await page.getByRole('button', { name: 'Clear search' }).click()

    await expect(page.getByRole('article')).toHaveCount(6)
    await expect(page.getByLabel('Search posts')).toHaveValue('')
  })

  test('"Clear search" keeps the selected category', async ({ page }) => {
    const movies = page.getByRole('button', { name: 'Movies' })

    await movies.click()
    await page.getByLabel('Search posts').fill('kubernetes')
    await page.getByRole('button', { name: 'Clear search' }).click()

    await expect(page.getByRole('article')).toHaveCount(1)
    await expect(movies).toHaveAttribute('aria-pressed', 'true')
  })
})