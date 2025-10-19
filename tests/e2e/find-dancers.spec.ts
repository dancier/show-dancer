import { test, expect } from '@playwright/test';
import { FindDancersPage } from '../page-objects/find-dancers-page';
import {
  mockDancers,
  mockApiResponses,
  mockAuthData,
  mockProfile,
} from '../fixtures/mock-data';

test.describe('Find Dancers', () => {
  let findDancersPage: FindDancersPage;

  test.beforeEach(async ({ page }) => {
    findDancersPage = new FindDancersPage(page);
  });

  test('displays find dancers page with filter controls when navigating via top bar', async ({
    page,
  }) => {
    // Set authentication state in localStorage before navigating
    await page.addInitScript(() => {
      localStorage.setItem(
        'authData',
        JSON.stringify({
          isLoggedIn: true,
          isHuman: true,
          jwt: 'mock-jwt-token-for-testing',
        })
      );
    });

    // Mock the profile API call that will be triggered
    await page.route('**/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProfile),
      });
    });

    // Mock the dancers API call for auto-search on page load
    await page.route(mockApiResponses.dancers.url, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockDancers),
      });
    });

    await page.goto('/'); // Navigate to home page first
    await findDancersPage.navFindLink.click();

    await expect(page).toHaveURL(/.*\/find-dancers/);
    await expect(findDancersPage.genderFilter).toBeVisible();
    await expect(findDancersPage.distanceFilter).toBeVisible();
    await expect(findDancersPage.applyFiltersButton).toBeVisible();
  });

  test('filters dancers by gender selection', async ({ page }) => {
    // Set authentication state in localStorage before navigating
    await page.addInitScript(() => {
      localStorage.setItem(
        'authData',
        JSON.stringify({
          isLoggedIn: true,
          isHuman: true,
          jwt: 'mock-jwt-token-for-testing',
        })
      );
    });

    // Mock the profile API call that will be triggered
    await page.route('**/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProfile),
      });
    });

    await page.route(mockApiResponses.dancers.url, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockDancers.filter((d) => d.gender === 'FEMALE')),
      });
    });

    await findDancersPage.goto();
    await findDancersPage.selectGender('female');

    // Start waiting for response before clicking. Note no await.
    const responsePromise = page.waitForResponse(
      /.*\/dancers\?.*gender=FEMALE/
    );
    await findDancersPage.applyFiltersButton.click();
    const response = await responsePromise;
    expect(response.ok()).toBeTruthy();

    await findDancersPage.expectFindResultsVisible();
  });

  test('filters dancers by distance range', async ({ page }) => {
    // Set authentication state in localStorage before navigating
    await page.addInitScript(() => {
      localStorage.setItem(
        'authData',
        JSON.stringify({
          isLoggedIn: true,
          isHuman: true,
          jwt: 'mock-jwt-token-for-testing',
        })
      );
    });

    // Mock the profile API call that will be triggered
    await page.route('**/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProfile),
      });
    });

    await page.route(mockApiResponses.dancers.url, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockDancers),
      });
    });

    await findDancersPage.goto();
    await findDancersPage.setDistance('50');
    await findDancersPage.applyFilters();

    await expect(findDancersPage.dancerList).toBeVisible();
  });

  test('combines gender and distance filters together', async ({ page }) => {
    // Set authentication state in localStorage before navigating
    await page.addInitScript(() => {
      localStorage.setItem(
        'authData',
        JSON.stringify({
          isLoggedIn: true,
          isHuman: true,
          jwt: 'mock-jwt-token-for-testing',
        })
      );
    });

    // Mock the profile API call that will be triggered
    await page.route('**/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProfile),
      });
    });

    await page.route(mockApiResponses.dancers.url, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockDancers.filter((d) => d.gender === 'MALE')),
      });
    });

    await findDancersPage.goto();
    await findDancersPage.selectGender('male');
    await findDancersPage.setDistance('30');
    await findDancersPage.applyFilters();

    await expect(findDancersPage.dancerList).toBeVisible();
  });

  test('displays a list of dancers in find results', async ({ page }) => {
    // Set authentication state in localStorage before navigating
    await page.addInitScript(() => {
      localStorage.setItem(
        'authData',
        JSON.stringify({
          isLoggedIn: true,
          isHuman: true,
          jwt: 'mock-jwt-token-for-testing',
        })
      );
    });

    // Mock the profile API call that will be triggered
    await page.route('**/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProfile),
      });
    });

    await page.route(mockApiResponses.dancers.url, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockDancers),
      });
    });

    await findDancersPage.goto();

    await findDancersPage.expectFindResultsVisible();
    await findDancersPage.expectDancerCardContent();
  });

  test('loads more dancers with show more button', async ({ page }) => {
    // Set authentication state in localStorage before navigating
    await page.addInitScript(() => {
      localStorage.setItem(
        'authData',
        JSON.stringify({
          isLoggedIn: true,
          isHuman: true,
          jwt: 'mock-jwt-token-for-testing',
        })
      );
    });

    // Mock the profile API call that will be triggered
    await page.route('**/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProfile),
      });
    });

    await page.route(mockApiResponses.dancers.url, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockDancers),
      });
    });

    await findDancersPage.goto();

    const initialCount = await findDancersPage.dancerCards.count();

    if (await findDancersPage.showMoreButton.isVisible()) {
      await findDancersPage.showMoreButton.click();

      const newCount = await findDancersPage.dancerCards.count();
      expect(newCount).toBeGreaterThan(initialCount);
    }
  });

  test('shows empty state when no dancers match criteria', async ({ page }) => {
    // Set authentication state in localStorage before navigating
    await page.addInitScript(() => {
      localStorage.setItem(
        'authData',
        JSON.stringify({
          isLoggedIn: true,
          isHuman: true,
          jwt: 'mock-jwt-token-for-testing',
        })
      );
    });

    // Mock the profile API call that will be triggered
    await page.route('**/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProfile),
      });
    });

    await page.route(mockApiResponses.dancersEmpty.url, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await findDancersPage.goto();
    await findDancersPage.expectEmptyState();
  });

  test('allows clicking on listed dancers to view their profiles', async ({
    page,
  }) => {
    // Set authentication state in localStorage before navigating
    await page.addInitScript(() => {
      localStorage.setItem(
        'authData',
        JSON.stringify({
          isLoggedIn: true,
          isHuman: true,
          jwt: 'mock-jwt-token-for-testing',
        })
      );
    });

    // Mock the profile API call that will be triggered
    await page.route('**/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProfile),
      });
    });

    await page.route(mockApiResponses.dancers.url, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockDancers),
      });
    });

    await findDancersPage.goto();

    const dancerId = await findDancersPage.clickFirstDancer();

    await expect(page).toHaveURL(new RegExp(`.*\/profile\/view\/${dancerId}`));
  });

  test('handles API errors gracefully', async ({ page }) => {
    // Set authentication state in localStorage before navigating
    await page.addInitScript(() => {
      localStorage.setItem(
        'authData',
        JSON.stringify({
          isLoggedIn: true,
          isHuman: true,
          jwt: 'mock-jwt-token-for-testing',
        })
      );
    });

    // Mock the profile API call that will be triggered
    await page.route('**/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProfile),
      });
    });

    await page.route(mockApiResponses.dancersError.url, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      });
    });

    await findDancersPage.goto();
    await findDancersPage.expectErrorState();
  });

  test('shows loading state during find requests', async ({ page }) => {
    // Set authentication state in localStorage before navigating
    await page.addInitScript(() => {
      localStorage.setItem(
        'authData',
        JSON.stringify({
          isLoggedIn: true,
          isHuman: true,
          jwt: 'mock-jwt-token-for-testing',
        })
      );
    });

    // Mock the profile API call that will be triggered
    await page.route('**/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProfile),
      });
    });

    let requestCount = 0;
    await page.route(mockApiResponses.dancers.url, async (route) => {
      requestCount++;
      if (requestCount === 1) {
        // First request (auto-search on load): respond quickly
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockDancers),
        });
      } else {
        // Second request (manual button click): delay to show loading state
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockDancers),
        });
      }
    });

    await findDancersPage.goto();

    // Wait for initial auto-search to complete
    await findDancersPage.expectLoadingStateHidden();

    // Now trigger manual search to test loading state
    const responsePromise = page.waitForResponse(/.*\/dancers/);
    const findPromise = findDancersPage.applyFiltersButton.click();

    await findDancersPage.expectLoadingState();

    await findPromise;
    await responsePromise;

    await findDancersPage.expectLoadingStateHidden();
  });
});
