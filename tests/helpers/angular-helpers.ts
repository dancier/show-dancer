import { Page, expect } from '@playwright/test';

/**
 * Helper functions for testing Angular applications
 */
export class AngularHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for Angular to finish loading and all HTTP requests to complete
   */
  async waitForAngularToLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector('app-root', { timeout: 30000 });
    await this.page.waitForTimeout(500);
  }

  /**
   * Navigate to a route and wait for Angular to stabilize
   */
  async navigateTo(route: string) {
    await this.page.goto(route);
    await this.waitForAngularToLoad();
  }

  /**
   * Check if the page shows a specific Angular route
   */
  async expectRoute(expectedRoute: string) {
    const currentUrl = this.page.url();
    expect(currentUrl).toContain(expectedRoute);
  }

  /**
   * Wait for an element to be visible and stable (useful for Angular animations)
   */
  async waitForElementStable(selector: string) {
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(100);
    return element;
  }
}
