/**
 * Button Component Types
 */

import { TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /** Button text */
  title: string;

  /** Press handler */
  onPress?: () => void;

  /** Visual variant */
  variant?: ButtonVariant;

  /** Size variant */
  size?: ButtonSize;

  /** Disabled state */
  disabled?: boolean;

  /** Loading state */
  loading?: boolean;

  /** Full width button */
  fullWidth?: boolean;

  /** Left icon component */
  leftIcon?: React.ReactNode;

  /** Right icon component */
  rightIcon?: React.ReactNode;

  /** Custom style */
  style?: ViewStyle;

  /** Custom text style */
  textStyle?: TextStyle;
}
