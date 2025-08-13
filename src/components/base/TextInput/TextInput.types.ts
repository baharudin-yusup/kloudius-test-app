/**
 * TextInput Component Types
 */

import { IoniconsIconName } from '@react-native-vector-icons/ionicons';
import {
  TextInputProps as RNTextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface TextInputProps extends RNTextInputProps {
  /** Label text displayed above the input */
  label?: string;

  /** Error message displayed below the input */
  error?: string;

  /** Left icon name */
  leftIcon?: IoniconsIconName;

  /** Right icon name */
  rightIcon?: IoniconsIconName;

  /** Right icon press handler */
  onRightIconPress?: () => void;

  /** Show password toggle button */
  showPasswordToggle?: boolean;

  /** Container style */
  containerStyle?: ViewStyle;

  /** Input style */
  inputStyle?: TextStyle;

  /** Label style */
  labelStyle?: TextStyle;

  /** Error text style */
  errorStyle?: TextStyle;

  /** Inside the bottom sheet */
  insideBottomSheet?: boolean;
}
