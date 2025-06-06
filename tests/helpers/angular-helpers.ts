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
    // Wait for the Angular app to be ready
    await this.page.waitForFunction(
      () => {
        // Check if Angular is available and stable
        return (
          typeof (window as any).ng !== 'undefined' &&
          (window as any).getAllAngularTestabilities &&
          (window as any)
            .getAllAngularTestabilities()
            .every((t: any) => t.isStable())
        );
      },
      { timeout: 30000 }
    );
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
