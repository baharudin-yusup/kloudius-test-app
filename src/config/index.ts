/**
 * Configuration Module
 * Centralized configuration exports
 */

// Export all configuration modules
export * from './constants';
export * from './theme';

// Re-export commonly used items with aliases for convenience
export { lightTheme as theme, darkTheme } from './theme';
