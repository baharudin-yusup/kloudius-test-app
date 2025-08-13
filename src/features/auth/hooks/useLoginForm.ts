/**
 * Login Form Hook
 * Custom hook for managing login form state and validation
 */

import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

import { useAuth } from '../../../providers';
import { validateEmail, validatePassword } from '../../../utils/validation';
import { DEMO_CREDENTIALS } from '../../../config/constants';
import { LoginFormData, LoginFormErrors, UseLoginFormReturn } from '../types';

export const useLoginForm = (): UseLoginFormReturn => {
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [submitButtonStatus, setSubmitButtonStatus] = useState<
    'idle' | 'submit-demo' | 'submit-login'
  >('idle');

  // Handle field changes
  const handleChange = useCallback(
    (field: keyof LoginFormData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  // Validate form
  const validateForm = useCallback((): boolean => {
    const newErrors: LoginFormErrors = {};

    // Validate email
    const emailValidationError = validateEmail(formData.email);
    if (emailValidationError) {
      newErrors.email = emailValidationError;
    }

    const passwordValidationError = validatePassword(formData.password, {
      requireMinimumLength: true,
    });
    if (passwordValidationError.errors.length > 0) {
      newErrors.password = passwordValidationError.errors[0];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle form submission
  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setSubmitButtonStatus('submit-login');
    try {
      const result = await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (!result) {
        Alert.alert('Login failed', 'Please try again');
      }
      // If successful, user will be navigated away automatically
    } catch (error) {
      Alert.alert(
        'Login failed',
        error instanceof Error ? error.message : 'Unknown error',
      );
    } finally {
      setSubmitButtonStatus('idle');
    }
  }, [formData.email, formData.password, login, validateForm]);

  // Handle demo login
  const handleDemoLogin = useCallback(async (): Promise<void> => {
    setSubmitButtonStatus('submit-demo');
    try {
      const result = await login({
        email: DEMO_CREDENTIALS.EMAIL,
        password: DEMO_CREDENTIALS.PASSWORD,
      });

      if (!result) {
        Alert.alert('Demo Login Failed', 'Please try again');
      }
      // If successful, user will be navigated away automatically
    } catch (error) {
      Alert.alert(
        'Demo Login Failed',
        error instanceof Error ? error.message : 'Unknown error',
      );
    } finally {
      setSubmitButtonStatus('idle');
    }
  }, [login]);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    submitButtonStatus,
    handleChange,
    handleSubmit,
    handleDemoLogin,
    clearErrors,
  };
};
