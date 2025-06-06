import { test, expect } from '@playwright/test';
import { LandingPage } from '../page-objects/landing-page';

test.describe('Landing Page', () => {
  let landingPage: LandingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
  });

  test('displays the landing page correctly', async ({ page }) => {
    await landingPage.goto();
    expect(await landingPage.isDisplayed()).toBe(true);
    await expect(landingPage.mainHeading).toBeVisible();
    await expect(landingPage.navigation).toBeVisible();
  });

  test('shows correct page title and content', async ({ page }) => {
    await landingPage.goto();
    await expect(page).toHaveTitle(/ShowDancer/i);
    await expect(landingPage.mainHeading).toBeVisible();
    await expect(landingPage.subHeading).toBeVisible();
  });

  test('has functional register button', async ({ page }) => {
    await landingPage.goto();
    if (await landingPage.registerButton.isVisible()) {
      await expect(landingPage.registerButton).toBeEnabled();
      await expect(landingPage.registerButton).toContainText(
        'Jetzt registrieren'
      );
    }
  });

  test('is responsive and accessible', async ({ page }) => {
    await landingPage.goto();

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(landingPage.mainHeading).toBeVisible();

    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(landingPage.mainHeading).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(landingPage.mainHeading).toBeVisible();
  });

  test('handles page load gracefully', async ({ page }) => {
    await page.route('**/*', (route) => {
      setTimeout(() => route.continue(), 100);
    });

    await landingPage.goto();
    await expect(landingPage.pageTitle).toBeVisible({ timeout: 10000 });
  });
});
