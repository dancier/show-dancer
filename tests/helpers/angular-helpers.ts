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
    // For now, use a simpler approach - wait for the page to be loaded
    // and for the Angular app root element to be present
    await this.page.waitForLoadState('networkidle');

    // Wait for Angular app root to be available
    await this.page.waitForSelector('app-root', { timeout: 30000 });

    // Small additional wait for Angular to stabilize
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

    // Wait a bit more for any Angular animations to complete
    await this.page.waitForTimeout(100);

    return element;
  }
}
