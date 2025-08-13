/**
 * Base Button Component
 * Primitive button component with design system integration
 */

import React, { useMemo, useCallback } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import { lightTheme } from '../../../config';
import { ButtonProps } from './Button.types';
import { getButtonStyles, getTextStyles } from './Button.styles';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  ...touchableProps
}) => {
  const buttonStyles = useMemo(
    () => getButtonStyles(variant, size, fullWidth, disabled),
    [variant, size, fullWidth, disabled],
  );

  const textStyles = useMemo(
    () => getTextStyles(variant, size, disabled),
    [variant, size, disabled],
  );

  const activityIndicatorColor = useMemo(
    () => (variant === 'primary' ? '#FFFFFF' : lightTheme.colors.primary[500]),
    [variant],
  );

  const handlePress = useCallback(() => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  }, [disabled, loading, onPress]);

  return (
    <TouchableOpacity
      style={[buttonStyles, style]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...touchableProps}
    >
      {loading ? (
        <ActivityIndicator size="small" color={activityIndicatorColor} />
      ) : (
        <>
          {leftIcon}
          <Text style={[textStyles, textStyle]}>{title}</Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
