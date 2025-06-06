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
      await this.mainHeading.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Page elements - using Playwright's locator API
   */
  get pageTitle(): Locator {
    return this.page.locator('[role="heading"][aria-level="1"]');
  }

  get mainHeading(): Locator {
    return this.page.locator('[role="heading"][aria-level="1"]');
  }

  get subHeading(): Locator {
    return this.page.locator('text=Wir verbinden Tänzer');
  }

  get registerButton(): Locator {
    return this.page.locator('button:has-text("Jetzt registrieren")');
  }

  get heroSection(): Locator {
    return this.page.locator('header');
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
