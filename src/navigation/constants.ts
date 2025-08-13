/**
 * Navigation Constants
 * Constants for navigation configuration
 */

import { IoniconsIconName } from '@react-native-vector-icons/ionicons';

// Navigation Routes
export const ROUTES = {
  COMMON: {
    LANDING: 'Landing',
  },
  MAIN: {
    HOME: 'Home',
    PROFILE: 'Profile',
  },
} as const;

// Tab Icons Configuration
export const TAB_ICONS: Record<
  string,
  { focused: IoniconsIconName; unfocused: IoniconsIconName }
> = {
  [ROUTES.MAIN.HOME]: {
    focused: 'home',
    unfocused: 'home-outline',
  },
  [ROUTES.MAIN.PROFILE]: {
    focused: 'person',
    unfocused: 'person-outline',
  },
} as const;

export const FALLBACK_ICON = 'help-outline';
