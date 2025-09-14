import { test, expect } from '@playwright/test'

test.describe('Grid Filtering', () => {
  test('filters rows by city substring', async ({ page }) => {
    await page.goto('/')
    const filterCity = page.locator('input[aria-label="filter-city"]')
    await filterCity.fill('a') // broad filter first
    const allRows = page.locator('table tbody tr')
    await expect(allRows.first()).toBeVisible()
    const initialCount = await allRows.count()

    await filterCity.fill('Austin')
    await page.waitForTimeout(50)
    const filteredRows = page.locator('table tbody tr')
    const count = await filteredRows.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const cityCell = filteredRows.nth(i).locator('td').nth(2)
      await expect(cityCell).toContainText(/Austin/i)
    }

    // Clear filter restores more rows (if dataset has > Austin entries)
    await filterCity.fill('')
    await page.waitForTimeout(50)
    const restored = await allRows.count()
    expect(restored).toBeGreaterThanOrEqual(count)
  })
})
