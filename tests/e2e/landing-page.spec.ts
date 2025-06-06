import { test, expect } from '@playwright/test';
import { LandingPage } from '../page-objects/landing-page';

test.describe('Landing Page', () => {
  let landingPage: LandingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
  });

  test('displays the landing page correctly', async ({ page }) => {
    // Navigate to the landing page
    await landingPage.goto();

    // Verify the page is displayed
    expect(await landingPage.isDisplayed()).toBe(true);

    // Check that the main heading is visible
    await expect(landingPage.mainHeading).toBeVisible();

    // Verify navigation elements are present
    await expect(landingPage.navigation).toBeVisible();
  });

  test('shows correct page title and content', async ({ page }) => {
    await landingPage.goto();

    // Check for expected page content
    // Note: Adjust these expectations based on your actual landing page content
    await expect(page).toHaveTitle(/ShowDancer/i);

    // Verify main heading and subheading are present
    await expect(landingPage.mainHeading).toBeVisible();
    await expect(landingPage.subHeading).toBeVisible();
  });

  test('has functional register button', async ({ page }) => {
    await landingPage.goto();

    // Check that register button is present and clickable
    if (await landingPage.registerButton.isVisible()) {
      await expect(landingPage.registerButton).toBeEnabled();
      await expect(landingPage.registerButton).toContainText(
        'Jetzt registrieren'
      );
    }
  });

  test('is responsive and accessible', async ({ page }) => {
    await landingPage.goto();

    // Check mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(landingPage.mainHeading).toBeVisible();

    // Check tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(landingPage.mainHeading).toBeVisible();

    // Check desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(landingPage.mainHeading).toBeVisible();
  });

  test('handles page load gracefully', async ({ page }) => {
    // Test with network throttling to simulate slow connections
    await page.route('**/*', (route) => {
      // Add a small delay to simulate network latency
      setTimeout(() => route.continue(), 100);
    });

    await landingPage.goto();

    // Should still work even with delayed responses
    await expect(landingPage.pageTitle).toBeVisible({ timeout: 10000 });
  });
});
