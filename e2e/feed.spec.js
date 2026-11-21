import { test, expect } from '@playwright/test'

test('the feed shows the title, the search box and the post cards', async ({
  page,
}) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Reddit App')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Reddit App' }),
  ).toBeVisible()
  await expect(page.getByLabel('Search posts')).toBeVisible()
  await expect(page.getByRole('article')).toHaveCount(6)
})