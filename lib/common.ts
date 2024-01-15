import { Locator, Page } from '@playwright/test'

export function getByParent(
  page: Page,
  parentSelector: string,
  currentSelector: string,
  neededSelector: string
): Locator {
  return page
    .locator(parentSelector, { has: page.locator(currentSelector) })
    .locator(neededSelector)
}
