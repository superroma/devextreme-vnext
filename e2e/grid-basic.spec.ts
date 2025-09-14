import { test, expect } from '@playwright/test'

// Basic grid load test

test.describe('Grid Basic', () => {
  test('loads demo and renders rows', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/DevExtreme vNext Grid Demos/i)
    // wait for table
    const rows = page.locator('table tbody tr')
    await expect(rows.first()).toBeVisible()
    expect(await rows.count()).toBeGreaterThan(0)
    // columns count (Name, Position, City)
    const firstRowCells = rows.first().locator('td')
    await expect(firstRowCells).toHaveCount(3)
  })
})
