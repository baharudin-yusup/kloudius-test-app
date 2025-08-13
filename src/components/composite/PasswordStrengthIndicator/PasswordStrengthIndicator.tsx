/**
 * Password Strength Indicator Component
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { lightTheme } from '../../../config';

interface PasswordStrength {
  strength: number;
  text: string;
  color: string;
}

interface Props {
  password: string;
}

const PasswordStrengthIndicator: React.FC<Props> = ({ password }) => {
  const strength = useMemo((): PasswordStrength => {
    if (password.length === 0) {
      return { strength: 0, text: '', color: lightTheme.colors.neutral[200] };
    }

    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[^A-Za-z0-9]/.test(password),
    };

    // Calculate score
    if (checks.length) score += 20;
    if (checks.lowercase) score += 20;
    if (checks.uppercase) score += 20;
    if (checks.numbers) score += 20;
    if (checks.symbols) score += 20;

    // Determine strength level
    if (score < 40) {
      return {
        strength: score,
        text: 'Weak',
        color: lightTheme.colors.error[500],
      };
    } else if (score < 80) {
      return {
        strength: score,
        text: 'Medium',
        color: lightTheme.colors.warning[500],
      };
    } else {
      return {
        strength: score,
        text: 'Strong',
        color: lightTheme.colors.success[500],
      };
    }
  }, [password]);

  const fillStyle = useMemo(
    (): ViewStyle => ({
      width: `${strength.strength}%`,
      backgroundColor: strength.color,
    }),
    [strength.strength, strength.color],
  );

  const textStyle = useMemo(
    () => ({ color: strength.color }),
    [strength.color],
  );

  if (password.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <View style={[styles.fill, fillStyle]} />
      </View>
      <Text style={[styles.text, textStyle]}>{strength.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -10,
    marginBottom: lightTheme.spacing[2],
  },
  bar: {
    flex: 1,
    height: 3,
    backgroundColor: lightTheme.colors.neutral[200],
    borderRadius: 2,
    marginRight: lightTheme.spacing[3],
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
  text: {
    fontSize: lightTheme.typography.fontSize.xs,
    fontWeight: lightTheme.typography.fontWeight.semibold,
    textAlign: 'right',
    minWidth: 40,
  },
});

export default PasswordStrengthIndicator;
