/**
 * Base TextInput Component
 * Primitive text input component with design system integration
 */

import React, { useState, forwardRef, useMemo, useCallback } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

import { lightTheme } from '../../../config';
import { TextInputProps } from './TextInput.types';
import {
  getContainerStyles,
  getInputStyles,
  getLabelStyles,
  getErrorStyles,
} from './TextInput.styles';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      onRightIconPress,
      showPasswordToggle = false,
      containerStyle,
      inputStyle,
      labelStyle,
      errorStyle,
      insideBottomSheet = false,
      ...textInputProps
    },
    ref,
  ) => {
    const [isSecure, setIsSecure] = useState(
      textInputProps.secureTextEntry || false,
    );
    const [isFocused, setIsFocused] = useState(false);

    const toggleSecureEntry = useCallback(() => {
      setIsSecure(prev => !prev);
    }, []);

    const handleRightIconPress = useCallback(() => {
      if (showPasswordToggle) {
        toggleSecureEntry();
      } else if (onRightIconPress) {
        onRightIconPress();
      }
    }, [showPasswordToggle, toggleSecureEntry, onRightIconPress]);

    const rightIconName = useMemo(() => {
      if (showPasswordToggle) {
        return isSecure ? 'eye-off-outline' : 'eye-outline';
      }
      return rightIcon;
    }, [showPasswordToggle, isSecure, rightIcon]);

    const containerStyles = useMemo(
      () => getContainerStyles(!!error, isFocused),
      [error, isFocused],
    );

    const inputStyles = useMemo(() => getInputStyles(), []);

    const labelStyles = useMemo(() => getLabelStyles(!!error), [error]);

    const errorStyles = useMemo(() => getErrorStyles(), []);

    const leftIconColor = useMemo(
      () =>
        error ? lightTheme.colors.error[500] : lightTheme.colors.neutral[400],
      [error],
    );

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    const renderTextInput = useMemo(() => {
      if (insideBottomSheet) {
        return (
          <BottomSheetTextInput
            {...textInputProps}
            ref={ref as any}
            style={[inputStyles, inputStyle]}
            secureTextEntry={isSecure}
            placeholderTextColor={lightTheme.colors.neutral[400]}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        );
      }
      return (
        <RNTextInput
          {...textInputProps}
          ref={ref}
          style={[inputStyles, inputStyle]}
          secureTextEntry={isSecure}
          placeholderTextColor={lightTheme.colors.neutral[400]}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
    }, [
      handleBlur,
      handleFocus,
      inputStyle,
      inputStyles,
      insideBottomSheet,
      isSecure,
      ref,
      textInputProps,
    ]);

    return (
      <View style={[{ marginBottom: lightTheme.spacing[3] }, containerStyle]}>
        {label && <Text style={[labelStyles, labelStyle]}>{label}</Text>}

        <View style={containerStyles}>
          {leftIcon && (
            <Icon
              name={leftIcon}
              size={20}
              color={leftIconColor}
              style={{ marginRight: lightTheme.spacing[3] }}
            />
          )}

          {renderTextInput}

          {rightIconName && (
            <TouchableOpacity
              onPress={handleRightIconPress}
              style={{
                padding: lightTheme.spacing[1],
                marginLeft: lightTheme.spacing[2],
              }}
            >
              <Icon
                name={rightIconName}
                size={20}
                color={lightTheme.colors.neutral[400]}
              />
            </TouchableOpacity>
          )}
        </View>

        {error && <Text style={[errorStyles, errorStyle]}>{error}</Text>}
      </View>
    );
  },
);

export default TextInput;
