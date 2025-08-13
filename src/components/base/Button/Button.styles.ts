/**
 * Button Component Styles
 */

import { ViewStyle, TextStyle } from 'react-native';
import { lightTheme } from '../../../config';
import { ButtonVariant, ButtonSize } from './Button.types';

export const getButtonStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  disabled: boolean,
): ViewStyle => {
  const baseStyle: ViewStyle = {
    borderRadius: lightTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  };

  // Size styles
  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    small: {
      paddingVertical: lightTheme.spacing[1],
      paddingHorizontal: lightTheme.spacing[2],
      minHeight: 32,
    },
    medium: {
      paddingVertical: lightTheme.spacing[2],
      paddingHorizontal: lightTheme.spacing[3],
      minHeight: 40,
    },
    large: {
      paddingVertical: lightTheme.spacing[3],
      paddingHorizontal: lightTheme.spacing[5],
      minHeight: 48,
    },
  };

  // Variant styles
  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: lightTheme.colors.primary[500],
      ...lightTheme.shadows.base,
    },
    secondary: {
      backgroundColor: lightTheme.colors.neutral[100],
      borderWidth: 1,
      borderColor: lightTheme.colors.neutral[200],
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: lightTheme.colors.primary[500],
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    danger: {
      backgroundColor: lightTheme.colors.error[500],
      ...lightTheme.shadows.base,
    },
  };

  const disabledStyle: ViewStyle = disabled
    ? {
        backgroundColor: lightTheme.colors.neutral[300],
        borderColor: lightTheme.colors.neutral[300],
        shadowOpacity: 0,
        elevation: 0,
      }
    : {};

  const fullWidthStyle: ViewStyle = fullWidth ? { alignSelf: 'stretch' } : {};

  return {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...disabledStyle,
    ...fullWidthStyle,
  };
};

export const getTextStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
): TextStyle => {
  const baseStyle: TextStyle = {
    fontWeight: lightTheme.typography.fontWeight.semibold,
    textAlign: 'center',
  };

  // Size styles
  const sizeStyles: Record<ButtonSize, TextStyle> = {
    small: {
      fontSize: lightTheme.typography.fontSize.sm,
    },
    medium: {
      fontSize: lightTheme.typography.fontSize.base,
    },
    large: {
      fontSize: lightTheme.typography.fontSize.base,
    },
  };

  // Variant styles
  const variantStyles: Record<ButtonVariant, TextStyle> = {
    primary: {
      color: '#FFFFFF',
    },
    secondary: {
      color: lightTheme.colors.neutral[700],
    },
    outline: {
      color: lightTheme.colors.primary[500],
    },
    ghost: {
      color: lightTheme.colors.primary[500],
    },
    danger: {
      color: '#FFFFFF',
    },
  };

  const disabledStyle: TextStyle = disabled
    ? {
        color: lightTheme.colors.neutral[400],
      }
    : {};

  return {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...disabledStyle,
  };
};
