/**
 * Mock data for Playwright tests
 * This keeps our test data organized and reusable
 */

// Basic user authentication mock
export const mockAuthData = {
  isLoggedIn: true,
  isHuman: true,
  jwt: 'mock-jwt-token-for-testing',
};

// Mock profile data (for future chat tests)
export const mockProfile = {
  id: 'test-user-1',
  dancerName: 'TestUser',
  email: 'test@example.com',
  profileImageHash: 'test-hash',
  ableTo: [],
  wantsTo: [],
  aboutMe: 'Test user for Playwright',
  size: 175,
  gender: 'MALE' as const,
  birthDate: '1990-01-01',
  zipCode: '12345',
  city: 'Test City',
  country: 'DE',
};

// Mock API responses that we'll use to intercept network calls
export const mockApiResponses = {
  // For future use when testing chat feature
  chats: {
    url: '**/api/chats',
    response: { data: [] },
  },

  profile: {
    url: '**/api/profile',
    response: mockProfile,
  },
};
