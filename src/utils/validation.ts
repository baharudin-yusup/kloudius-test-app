/**
 * Validation Utilities
 * Centralized validation logic with reusable functions
 */

import { ERROR_MESSAGES, VALIDATION } from '../config';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface PasswordStrength {
  strength: number;
  color: string;
  text: string;
}

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

// Email validation
export const validateEmail = (email: string): string | null => {
  if (!email || typeof email !== 'string') {
    return ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED;
  }
  if (!VALIDATION.EMAIL.REGEX.test(email.trim())) {
    return ERROR_MESSAGES.VALIDATION.EMAIL_INVALID;
  }
  return null;
};

// Password validation
export const validatePassword = (password: string, options: {
  requireMinimumLength?: boolean;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
} = {
  requireMinimumLength: true,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
}): ValidationResult => {
  const errors: string[] = [];
  
  if (!password) {
    return { isValid: false, errors: [ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED] };
  }
  
  if (options.requireMinimumLength && password.length < VALIDATION.PASSWORD.MIN_LENGTH) {
    errors.push(ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT);
  }
  
  if (options.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push(ERROR_MESSAGES.VALIDATION.PASSWORD_UPPERCASE_REQUIRED);
  }
  
  if (options.requireLowercase && !/[a-z]/.test(password)) {
    errors.push(ERROR_MESSAGES.VALIDATION.PASSWORD_LOWERCASE_REQUIRED);
  }
  
  if (options.requireNumbers && !/\d/.test(password)) {
    errors.push(ERROR_MESSAGES.VALIDATION.PASSWORD_NUMBERS_REQUIRED);
  }
    
  return { isValid: errors.length === 0, errors };
};

// Confirm password validation
export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) {
    return ERROR_MESSAGES.VALIDATION.CONFIRM_PASSWORD_REQUIRED;
  }

  if (password !== confirmPassword) {
    return ERROR_MESSAGES.VALIDATION.PASSWORDS_DONT_MATCH;
  }
  return null;
};

// Name validation
export const validateName = (name: string): string | null => {
  if (!name || !name.trim()) {
    return ERROR_MESSAGES.VALIDATION.NAME_REQUIRED;
  }
  
  if (name.trim().length < VALIDATION.NAME.MIN_LENGTH) {
    return ERROR_MESSAGES.VALIDATION.NAME_TOO_SHORT;
  }
  
  if (name.trim().length > VALIDATION.NAME.MAX_LENGTH) {
    return `Name must be less than ${VALIDATION.NAME.MAX_LENGTH} characters`;
  }
  
  return null;
};

// Password strength calculation
export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) {
    return { strength: 0, color: '#e1e1e1', text: '' };
  }
  
  const validation = validatePassword(password);
  const maxCriteria = 4; // length, uppercase, lowercase, numbers
  const metCriteria = maxCriteria - validation.errors.length;
  const strength = (metCriteria / maxCriteria) * 100;
  
  if (strength === 100) {
    return { strength, color: '#34C759', text: 'Strong' };
  } else if (strength >= 75) {
    return { strength, color: '#FF9500', text: 'Good' };
  } else if (strength >= 50) {
    return { strength, color: '#FF9500', text: 'Fair' };
  } else {
    return { strength, color: '#FF3B30', text: 'Weak' };
  }
};

// Login form validation
export const validateLoginForm = (email: string, password: string): FormErrors<{ email: string; password: string }> => {
  const errors: FormErrors<{ email: string; password: string }> = {};
  
  if (!email.trim()) {
    errors.email = ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED;
  } else if (!validateEmail(email)) {
    errors.email = ERROR_MESSAGES.VALIDATION.EMAIL_INVALID;
  }
  
  if (!password) {
    errors.password = ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED;
  } else if (password.length < 6) { // Relaxed for login
    errors.password = 'Password must be at least 6 characters';
  }
  
  return errors;
};

// Registration form validation
export const validateRegistrationForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): FormErrors<{ name: string; email: string; password: string; confirmPassword: string }> => {
  const errors: FormErrors<{ name: string; email: string; password: string; confirmPassword: string }> = {};
  
  // Name validation
  const nameError = validateName(name);
  if (nameError) {
    errors.name = nameError;
  }
  
  // Email validation
  if (!email.trim()) {
    errors.email = ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED;
  } else if (!validateEmail(email)) {
    errors.email = ERROR_MESSAGES.VALIDATION.EMAIL_INVALID;
  }
  
  // Password validation
  if (!password) {
    errors.password = ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED;
  } else {
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.password = `Password must have: ${passwordValidation.errors.join(', ')}`;
    }
  }
  
  // Confirm password validation
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = ERROR_MESSAGES.VALIDATION.PASSWORDS_DONT_MATCH;
  }
  
  return errors;
};
