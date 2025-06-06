import { chromium, FullConfig } from '@playwright/test';

/**
 * Global setup that runs once before all tests.
 * Use this for one-time setup like authentication, database seeding, etc.
 */
async function globalSetup(config: FullConfig) {
  // Example: Could be used later for setting up authentication state
  // or other global test prerequisites

  console.log('🎭 Playwright global setup complete');
}

export default globalSetup;
