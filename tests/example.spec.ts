import { test, expect } from '@playwright/test'
import { getByParent } from '../lib/common'

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/)

  // check using parent node
  const otherChild = getByParent(
    page,
    '.navbar__inner',
    '.header-github-link',
    '.header-discord-link'
  )
  await expect(otherChild).toHaveClass(
    'navbar__item navbar__link header-discord-link'
  )
})

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible()

  // await expect(page).toHaveScreenshot()
})
