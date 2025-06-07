import { expect, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class FindDancersPage extends BasePage {
  async goto(): Promise<void> {
    await this.page.goto('/find-dancers', { waitUntil: 'networkidle' });
  }

  async isDisplayed(): Promise<boolean> {
    try {
      await this.genderFilter.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  get genderFilter(): Locator {
    return this.page.locator('[data-testid="gender-filter"]');
  }

  get genderFilterFemale(): Locator {
    return this.page.locator('[data-testid="gender-filter-female"]');
  }

  get genderFilterMale(): Locator {
    return this.page.locator('[data-testid="gender-filter-male"]');
  }

  get distanceFilter(): Locator {
    return this.page.locator('[data-testid="distance-filter"]');
  }

  get distanceSlider(): Locator {
    return this.page.locator('[data-testid="distance-slider"]');
  }

  get applyFiltersButton(): Locator {
    return this.page.locator('[data-testid="apply-filters-button"]');
  }

  get dancerList(): Locator {
    return this.page.locator('[data-testid="dancer-list"]');
  }

  get dancerCards(): Locator {
    return this.page.locator('[data-testid="dancer-card"]');
  }

  get showMoreButton(): Locator {
    return this.page.locator('[data-testid="show-more-button"]');
  }

  get emptyFindState(): Locator {
    return this.page.locator('[data-testid="empty-find-state"]');
  }

  get emptyFindMessage(): Locator {
    return this.page.locator('[data-testid="empty-find-message"]');
  }

  get findErrorState(): Locator {
    return this.page.locator('[data-testid="find-error-state"]');
  }

  get findErrorMessage(): Locator {
    return this.page.locator('[data-testid="find-error-message"]');
  }

  get findLoadingState(): Locator {
    return this.page.locator('[data-testid="find-loading-state"]');
  }

  get navFindLink(): Locator {
    return this.page.locator('[data-testid="nav-find-dancers"]');
  }

  async selectGender(gender: 'all' | 'male' | 'female'): Promise<void> {
    await this.genderFilter.selectOption(gender.toUpperCase());
  }

  async setDistance(distance: string): Promise<void> {
    const slider = this.distanceSlider;
    const boundingBox = await slider.boundingBox();
    if (boundingBox) {
      const percentage = Math.min(parseInt(distance) / 100, 1); // assuming max 100km
      await this.page.mouse.click(
        boundingBox.x + boundingBox.width * percentage,
        boundingBox.y + boundingBox.height / 2
      );
    }
  }

  async applyFilters(): Promise<void> {
    await this.applyFiltersButton.click();
    await this.page.waitForResponse(/.*\/dancers/);
  }

  async clickFirstDancer(): Promise<string | null> {
    const firstDancer = this.dancerCards.first();
    await expect(firstDancer).toBeVisible();
    const dancerId = await firstDancer.getAttribute('data-dancer-id');
    await firstDancer.click();
    return dancerId;
  }

  async expectFindResultsVisible(): Promise<void> {
    await expect(this.dancerList).toBeVisible();
    await expect(this.dancerCards.first()).toBeVisible();
  }

  async expectDancerCardContent(): Promise<void> {
    const firstCard = this.dancerCards.first();
    await expect(
      firstCard.locator('[data-testid="dancer-name"]')
    ).toBeVisible();
    await expect(firstCard.locator('[data-testid="dancer-age"]')).toBeVisible();
    await expect(
      firstCard.locator('[data-testid="dancer-location"]')
    ).toBeVisible();
  }

  async expectEmptyState(): Promise<void> {
    await expect(this.emptyFindState).toBeVisible();
    await expect(this.emptyFindMessage).toContainText(
      /keine.*gefunden|no.*found/i
    );
  }

  async expectErrorState(): Promise<void> {
    await expect(this.findErrorState).toBeVisible();
    await expect(this.findErrorMessage).toBeVisible();
  }

  async expectLoadingState(): Promise<void> {
    await expect(this.findLoadingState).toBeVisible();
  }

  async expectLoadingStateHidden(): Promise<void> {
    await expect(this.findLoadingState).not.toBeVisible();
  }
}
