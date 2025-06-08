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

// Mock dancer data for search tests
export const mockDancers = [
  {
    id: 'uuid-1',
    dancerName: 'Anna Mueller',
    age: 28,
    gender: 'FEMALE',
    city: 'Berlin',
    country: 'DE',
    size: 165,
    profileImageHash: 'hash-1',
    aboutMe: 'I love dancing salsa and bachata',
    ableTo: [],
    wantsTo: [],
  },
  {
    id: 'uuid-2',
    dancerName: 'Max Schmidt',
    age: 32,
    gender: 'MALE',
    city: 'Munich',
    country: 'DE',
    size: 180,
    profileImageHash: 'hash-2',
    aboutMe: 'Passionate about swing and tango',
    ableTo: [],
    wantsTo: [],
  },
  {
    id: 'uuid-3',
    dancerName: 'Sofia Garcia',
    age: 25,
    gender: 'FEMALE',
    city: 'Hamburg',
    country: 'DE',
    size: 170,
    profileImageHash: 'hash-3',
    aboutMe: 'Ballroom dancing enthusiast',
    ableTo: [],
    wantsTo: [],
  },
];

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

  dancers: {
    url: '**/dancers*',
    response: mockDancers,
  },

  dancersEmpty: {
    url: '**/dancers*',
    response: [],
  },

  dancersError: {
    url: '**/dancers*',
    status: 500,
    response: { error: 'Internal server error' },
  },
};
