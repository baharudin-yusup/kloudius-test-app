/**
 * Theme Configuration
 * Design system tokens and theme definitions
 */

import { TextStyle, ViewStyle } from 'react-native';

// Color Palette
export const colors: {
  readonly primary: {
    readonly 50: string;
    readonly 100: string;
    readonly 200: string;
    readonly 300: string;
    readonly 400: string;
    readonly 500: string;
    readonly 600: string;
    readonly 700: string;
    readonly 800: string;
    readonly 900: string;
  };
  readonly neutral: {
    readonly 50: string;
    readonly 100: string;
    readonly 200: string;
    readonly 300: string;
    readonly 400: string;
    readonly 500: string;
    readonly 600: string;
    readonly 700: string;
    readonly 800: string;
    readonly 900: string;
  };
  readonly success: {
    readonly 50: string;
    readonly 500: string;
    readonly 600: string;
  };
  readonly warning: {
    readonly 50: string;
    readonly 500: string;
    readonly 600: string;
  };
  readonly error: {
    readonly 50: string;
    readonly 500: string;
    readonly 600: string;
  };
  readonly app: {
    readonly background: string;
    readonly surface: string;
    readonly accent: string;
  };
} = {
  // Primary Colors
  primary: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9', // Main primary
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
  },

  // Neutral Colors
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },

  // Semantic Colors
  success: {
    50: '#F0FDF4',
    500: '#22C55E',
    600: '#16A34A',
  },
  warning: {
    50: '#FFFBEB',
    500: '#F59E0B',
    600: '#D97706',
  },
  error: {
    50: '#FEF2F2',
    500: '#EF4444',
    600: '#DC2626',
  },

  // App-specific Colors
  app: {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    accent: '#2C3E50',
  },
} as const;

// Typography Scale
export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Spacing Scale (based on 4px grid)
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const;

// Border Radius
export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// Shadows
export const shadows = {
  sm: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  md: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  lg: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 16,
  },
} as const;

// Theme Interface
export interface Theme {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
}

// Light Theme (default)
export const lightTheme: Theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

// Dark Theme (future implementation)
export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...colors,
    app: {
      background: '#0F172A',
      surface: '#1E293B',
      accent: '#3B82F6',
    },
  },
};

// Component Style Factories
export const createButtonStyles = (theme: Theme) => ({
  primary: {
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[6],
    ...theme.shadows.base,
  } as ViewStyle,

  secondary: {
    backgroundColor: theme.colors.neutral[100],
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[6],
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
  } as ViewStyle,
});

export const createTextStyles = (theme: Theme) => ({
  h1: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.lineHeight.tight,
    color: theme.colors.neutral[900],
  } as TextStyle,

  h2: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.lineHeight.tight,
    color: theme.colors.neutral[900],
  } as TextStyle,

  body: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: theme.typography.lineHeight.normal,
    color: theme.colors.neutral[700],
  } as TextStyle,

  caption: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: theme.typography.lineHeight.normal,
    color: theme.colors.neutral[500],
  } as TextStyle,
});

// Export default theme
export default lightTheme;
