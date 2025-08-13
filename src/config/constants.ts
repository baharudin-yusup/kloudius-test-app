/**
 * Application Constants
 * Global constants following industry standards
 */

// Storage Keys
export const STORAGE_KEYS = {
  CURRENT_USER: '@current_user',
  APP_SETTINGS: '@app_settings',
  USER_PREFERENCES: '@user_preferences',
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: __DEV__ ? 'http://localhost:3000' : 'https://api.production.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'KloudiusTestApp',
  VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  ENVIRONMENT: __DEV__ ? 'development' : 'production',
} as const;

// Validation Constants
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: false,
  },
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
} as const;

// UI Constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  LOADING_DELAY: 1000,
  SCREEN_PADDING: 20,
  BORDER_RADIUS: 12,
} as const;

// Demo Data
export const DEMO_CREDENTIALS = {
  EMAIL: 'demo@example.com',
  PASSWORD: 'password123',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  GENERIC: 'Something went wrong. Please try again.',
  VALIDATION: {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    PASSWORD_REQUIRED: 'Password is required',
    CONFIRM_PASSWORD_REQUIRED: 'Please confirm your password',
    PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD.MIN_LENGTH} characters`,
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
    PASSWORD_UPPERCASE_REQUIRED:
      'Password must contain at least one uppercase letter',
    PASSWORD_LOWERCASE_REQUIRED:
      'Password must contain at least one lowercase letter',
    PASSWORD_NUMBERS_REQUIRED: 'Password must contain at least one number',
    PASSWORD_SPECIAL_CHARS_REQUIRED:
      'Password must contain at least one special character',
    NAME_REQUIRED: 'Full name is required',
    NAME_TOO_SHORT: `Name must be at least ${VALIDATION.NAME.MIN_LENGTH} characters`,
  },
  AUTH: {
    USER_NOT_FOUND: 'User not found. Please register first.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    USER_EXISTS: 'User already exists with this email.',
    LOGIN_FAILED: 'Login failed. Please try again.',
    REGISTRATION_FAILED: 'Registration failed. Please try again.',
    LOGOUT_FAILED: 'Failed to logout. Please try again.',
  },
} as const;
