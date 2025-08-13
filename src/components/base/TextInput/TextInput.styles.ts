/**
 * TextInput Component Styles
 */

import { ViewStyle, TextStyle } from 'react-native';
import { lightTheme } from '../../../config';

export const getContainerStyles = (
  hasError: boolean,
  isFocused: boolean,
): ViewStyle => {
  const baseStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.neutral[50],
    borderWidth: 1.5,
    borderColor: lightTheme.colors.neutral[200],
    borderRadius: lightTheme.borderRadius.md,
    paddingHorizontal: lightTheme.spacing[3],
    paddingVertical: lightTheme.spacing[2],
    minHeight: 48,
  };

  if (hasError) {
    return {
      ...baseStyle,
      borderColor: lightTheme.colors.error[500],
      backgroundColor: lightTheme.colors.error[50],
    };
  }

  if (isFocused) {
    return {
      ...baseStyle,
      borderColor: lightTheme.colors.primary[500],
      backgroundColor: lightTheme.colors.primary[50],
    };
  }

  return baseStyle;
};

export const getInputStyles = (): TextStyle => ({
  flex: 1,
  fontSize: lightTheme.typography.fontSize.base,
  color: lightTheme.colors.neutral[900],
  fontWeight: lightTheme.typography.fontWeight.normal,
  paddingVertical: 0, // Remove default padding
});

export const getLabelStyles = (hasError: boolean): TextStyle => ({
  fontSize: lightTheme.typography.fontSize.sm,
  fontWeight: lightTheme.typography.fontWeight.semibold,
  color: hasError
    ? lightTheme.colors.error[500]
    : lightTheme.colors.neutral[700],
  marginBottom: lightTheme.spacing[2],
});

export const getErrorStyles = (): TextStyle => ({
  fontSize: lightTheme.typography.fontSize.sm,
  color: lightTheme.colors.error[500],
  marginTop: lightTheme.spacing[1],
  fontWeight: lightTheme.typography.fontWeight.medium,
});
