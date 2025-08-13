/**
 * Navigation Utilities
 * Helper functions for navigation
 */

import { IoniconsIconName } from '@react-native-vector-icons/ionicons';
import { TAB_ICONS, FALLBACK_ICON } from './constants';

/**
 * Gets the appropriate icon name based on route and focus state
 */
export const getTabIconName = (
  routeName: string,
  focused: boolean,
): IoniconsIconName => {
  const iconConfig = TAB_ICONS[routeName];

  if (!iconConfig) {
    return FALLBACK_ICON;
  }

  return focused ? iconConfig.focused : iconConfig.unfocused;
};
