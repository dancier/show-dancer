import { expect, Locator } from '@playwright/test';
import { BasePage } from './base-page';

/**
 * Page Object for the landing page
 * This encapsulates all interactions with the landing page
 */
export class LandingPage extends BasePage {
  /**
   * Navigate to the landing page
   */
  async goto(): Promise<void> {
    await this.angular.navigateTo('/');
  }

  /**
   * Check if the landing page is currently displayed
   */
  async isDisplayed(): Promise<boolean> {
    try {
      await this.pageTitle.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Page elements - using Playwright's locator API
   */
  get pageTitle(): Locator {
    return this.page.locator('h1').first();
  }

  get loginButton(): Locator {
    return this.page.locator('a[href="/login"]');
  }

  get registerButton(): Locator {
    return this.page.locator('a[href="/register"]');
  }

  get recommendationsButton(): Locator {
    return this.page.locator('a[href="/recommendations"]');
  }

  /**
   * Page actions - what users can do on this page
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
    await this.angular.waitForAngularToLoad();
  }

  async clickRegister(): Promise<void> {
    await this.registerButton.click();
    await this.angular.waitForAngularToLoad();
  }

  /**
   * Assertions - what we expect to see on this page
   */
  async expectPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.pageTitle).toContainText(expectedTitle);
  }

  async expectNavigationLinksVisible(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
    await expect(this.registerButton).toBeVisible();
  }
}
