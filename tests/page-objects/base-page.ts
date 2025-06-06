import { Page, Locator } from '@playwright/test';

/**
 * Base page class with common functionality for all pages
 */
export abstract class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navigate to this page
   */
  abstract goto(): Promise<void>;

  /**
   * Check if this page is currently displayed
   */
  abstract isDisplayed(): Promise<boolean>;

  /**
   * Common page elements that appear on most pages
   */
  get navigation(): Locator {
    return this.page.locator('app-navigation');
  }

  get footer(): Locator {
    return this.page.locator('app-footer');
  }

  /**
   * Wait for the page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot for debugging
   */
  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `tests/screenshots/${name}.png`,
      fullPage: true,
    });
  }
}
