import { test, expect } from '@playwright/test'

test.describe('post page', () => {
  test('opening a card shows the post with a back link', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: /new chip design promises/i }).click()

    await expect(page).toHaveURL(/\/post\/p1$/)
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /new chip design promises/i,
      }),
    ).toBeVisible()
    await expect(page.getByRole('link', { name: /back to feed/i })).toBeVisible()
  })

  test('shows the comments with their Markdown rendered', async ({ page }) => {
    await page.goto('/post/p1')

    await expect(page.getByText('u/techFan')).toBeVisible()
    await expect(page.locator('strong', { hasText: 'huge' })).toBeVisible()
    await expect(page.getByText('video playback')).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'original write-up' }),
    ).toHaveAttribute('href', 'https://example.com/benchmarks')
  })

  test('the back link returns to the feed', async ({ page }) => {
    await page.goto('/post/p1')

    await page.getByRole('link', { name: /back to feed/i }).click()

    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByLabel('Search posts')).toBeVisible()
  })

  test('an unknown post shows "Post not found" and a way back', async ({
    page,
  }) => {
    await page.goto('/post/zzz')

    await expect(
      page.getByRole('heading', { level: 1, name: 'Post not found' }),
    ).toBeVisible()

    await page.getByRole('button', { name: 'Go back to feed' }).click()

    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByLabel('Search posts')).toBeVisible()
  })

  test('neither the feed nor a post page scrolls sideways', async ({
    page,
  }) => {
    for (const path of ['/', '/post/p1']) {
      await page.goto(path)
      await page.getByRole('article').first().waitFor()

      const scrollsSideways = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      )

      expect(scrollsSideways).toBe(false)
    }
  })
})