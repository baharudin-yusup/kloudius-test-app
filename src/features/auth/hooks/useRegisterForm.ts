/**
 * Register Form Hook
 * Custom hook for managing registration form state and validation
 */

import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

import { useAuth } from '../../../providers';
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../../../utils/validation';
import {
  RegisterFormData,
  RegisterFormErrors,
  SubmitButtonStatus,
  UseRegisterFormReturn,
} from '../types';

export const useRegisterForm = (): UseRegisterFormReturn => {
  const { register } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [submitButtonStatus, setSubmitButtonStatus] =
    useState<SubmitButtonStatus>('idle');

  // Handle field changes
  const handleChange = useCallback(
    (field: keyof RegisterFormData, value: string) => {
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
    const newErrors: RegisterFormErrors = {};

    // Name validation
    const nameValidation = validateName(formData.name);
    if (nameValidation) {
      newErrors.name = nameValidation;
    }

    // Email validation
    const emailValidation = validateEmail(formData.email);
    if (emailValidation) {
      newErrors.email = emailValidation;
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password, {
      requireMinimumLength: true,
    });
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors.join('\n');
    }

    // Confirm password validation
    const confirmPasswordValidation = validateConfirmPassword(
      formData.password,
      formData.confirmPassword,
    );
    if (confirmPasswordValidation) {
      newErrors.confirmPassword = confirmPasswordValidation;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle form submission
  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setSubmitButtonStatus('submit-register');
    try {
      const email = formData.email.trim();
      await register({
        name: formData.name.trim(),
        email: email,
        password: formData.password,
      });

      // If successful, user will be navigated away automatically
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setSubmitButtonStatus('idle');
    }
  }, [formData, register, validateForm]);

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
    clearErrors,
    validateForm,
  };
};
