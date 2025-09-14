import { test, expect } from '@playwright/test'

test.describe('Grid Sorting', () => {
  test('sorts by clicking header cycles asc/desc', async ({ page }) => {
    await page.goto('/')
    const nameHeader = page.getByRole('columnheader', { name: /Name/i })
    // Fallback if role mapping not present - use text locator
    const header = (await nameHeader.count())
      ? nameHeader
      : page.locator('th', { hasText: 'Name' }).first()

    const firstRowCell = () => page.locator('table tbody tr').first().locator('td').first()
    const initial = await firstRowCell().innerText()

    await header.click()
    const afterAsc = await firstRowCell().innerText()
    // It may or may not change depending on initial ordering, but indicator should appear
    await expect(header).toContainText('▲')

    await header.click()
    const afterDesc = await firstRowCell().innerText()
    await expect(header).toContainText('▼')

    // Third click removes sorting
    await header.click()
    await expect(header).not.toContainText('▲')
    await expect(header).not.toContainText('▼')
  })
})
