/**
 * Checkbox Component
 */

import React, { useMemo, useCallback } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { lightTheme } from '../../../config';

interface Props {
  checked?: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Checkbox: React.FC<Props> = ({
  checked = false,
  onToggle,
  label,
  disabled = false,
  size = 'medium',
}) => {
  const handlePress = useCallback(() => {
    if (!disabled) {
      onToggle(!checked);
    }
  }, [disabled, onToggle, checked]);

  const sizeConfig = useMemo(() => {
    const checkboxSize = size === 'small' ? 16 : size === 'large' ? 22 : 18;
    const iconSize = size === 'small' ? 10 : size === 'large' ? 14 : 12;
    return { checkboxSize, iconSize };
  }, [size]);

  const checkboxStyle = useMemo(
    () => [
      styles.checkbox,
      {
        width: sizeConfig.checkboxSize,
        height: sizeConfig.checkboxSize,
      },
      checked && styles.checked,
      disabled && styles.disabled,
    ],
    [sizeConfig.checkboxSize, checked, disabled],
  );

  const labelTextStyle = useMemo(
    () => [styles.label, disabled && styles.disabledLabel],
    [disabled],
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={checkboxStyle}>
        {checked && (
          <Icon name="checkmark" size={sizeConfig.iconSize} color="#FFFFFF" />
        )}
      </View>

      {label && <Text style={labelTextStyle}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  checkbox: {
    borderRadius: 4,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: lightTheme.colors.neutral[300],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: lightTheme.spacing[2],
  },
  checked: {
    backgroundColor: lightTheme.colors.app.accent,
    borderColor: lightTheme.colors.app.accent,
  },
  disabled: {
    backgroundColor: lightTheme.colors.neutral[100],
    borderColor: lightTheme.colors.neutral[200],
  },
  label: {
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.neutral[600],
    fontWeight: lightTheme.typography.fontWeight.medium,
  },
  disabledLabel: {
    color: lightTheme.colors.neutral[400],
  },
});

export default Checkbox;
