/**
 * Login Screen
 * Authentication screen with login and register functionality
 */

import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Keyboard,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Components
import {
  Button,
  TextInput,
  TabSelector,
  PasswordStrengthIndicator,
} from '../../../components';

// Hooks
import { useAuth } from '../../../providers';
import { useLoginForm, useRegisterForm } from '../hooks';

// Config & Utils
import { lightTheme } from '../../../config';
import { BG_LANDING } from '../../../assets/images';

const { height, width } = Dimensions.get('window');

interface TabOption {
  key: string;
  label: string;
}

const LandingScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { isAuthenticating } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Form hooks
  const loginForm = useLoginForm();
  const registerForm = useRegisterForm();

  // Bottom sheet configuration
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['35%', '70%', '95%'], []);

  // Input refs for keyboard navigation
  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);
  const confirmPasswordInputRef = useRef<any>(null);

  // Tab configuration
  const tabOptions: TabOption[] = [
    { key: 'login', label: 'Login' },
    { key: 'register', label: 'Register' },
  ];

  // Handle tab changes
  const handleTabChange = useCallback(
    (tab: string) => {
      Keyboard.dismiss();
      const newTab = tab as 'login' | 'register';
      setActiveTab(newTab);

      // Clear errors when switching tabs
      loginForm.clearErrors();
      registerForm.clearErrors();

      // Adjust bottom sheet height
      if (newTab === 'register') {
        setTimeout(() => bottomSheetRef.current?.snapToIndex(2), 100); // 95%
      } else {
        setTimeout(() => bottomSheetRef.current?.snapToIndex(1), 100); // 70%
      }
    },
    [loginForm, registerForm],
  );

  // Get current form data based on active tab
  const currentForm = useMemo(
    () => (activeTab === 'login' ? loginForm : registerForm),
    [activeTab, loginForm, registerForm],
  );

  const isSubmitting = useMemo(
    () => currentForm.submitButtonStatus !== 'idle' || isAuthenticating,
    [currentForm.submitButtonStatus, isAuthenticating],
  );

  const emailPlaceholder = useMemo(
    () => (activeTab === 'login' ? 'Your Email' : 'john.doe@example.com'),
    [activeTab],
  );

  const passwordPlaceholder = useMemo(
    () =>
      activeTab === 'login' ? 'Your Password' : 'Create a strong password',
    [activeTab],
  );

  const submitButtonTitle = useMemo(
    () => (activeTab === 'login' ? 'Login' : 'Create Account'),
    [activeTab],
  );

  return (
    <View style={styles.container}>
      {/* Background Image with Dark Overlay */}
      <Image source={BG_LANDING} style={styles.backgroundImage} />
      <View style={styles.overlay} />

      {/* Fixed Header */}
      <View style={styles.fixedHeader}>
        <Text style={styles.headerTitle}>Go ahead and set up</Text>
        <Text style={styles.headerTitle}>your account</Text>
        <Text style={styles.headerSubtitle}>
          Sign in-up to enjoy the best managing experience
        </Text>
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enableDynamicSizing
        enablePanDownToClose={false}
        style={[
          styles.bottomSheet,
          {
            marginTop: insets.top,
          },
        ]}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetIndicator}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
      >
        <BottomSheetView style={[styles.bottomSheetContent]}>
          {/* Tab Selector */}
          <TabSelector
            options={tabOptions}
            selectedTab={activeTab}
            onTabChange={handleTabChange}
          />

          {/* Name Input - Register Only */}
          {activeTab === 'register' && (
            <TextInput
              insideBottomSheet
              label="Full Name"
              leftIcon="person-outline"
              placeholder="John Doe"
              value={registerForm.formData.name}
              onChangeText={text => registerForm.handleChange('name', text)}
              autoCapitalize="words"
              error={registerForm.errors.name}
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
          )}

          {/* Email Input */}
          <TextInput
            insideBottomSheet
            ref={emailInputRef}
            label="Email Address"
            leftIcon="mail-outline"
            placeholder={emailPlaceholder}
            value={currentForm.formData.email}
            onChangeText={text => currentForm.handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={currentForm.errors.email}
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />

          {/* Password Input */}
          <View>
            <TextInput
              insideBottomSheet
              ref={passwordInputRef}
              label="Password"
              leftIcon="lock-closed-outline"
              placeholder={passwordPlaceholder}
              value={currentForm.formData.password}
              onChangeText={text => currentForm.handleChange('password', text)}
              secureTextEntry
              showPasswordToggle
              error={currentForm.errors.password}
              returnKeyType={activeTab === 'register' ? 'next' : 'done'}
              onSubmitEditing={() => {
                if (activeTab === 'register') {
                  confirmPasswordInputRef.current?.focus();
                } else {
                  currentForm.handleSubmit();
                }
              }}
            />

            {/* Password Strength - Register Only */}
            {activeTab === 'register' && (
              <PasswordStrengthIndicator
                password={registerForm.formData.password}
              />
            )}
          </View>

          {/* Confirm Password - Register Only */}
          {activeTab === 'register' && (
            <TextInput
              insideBottomSheet
              ref={confirmPasswordInputRef}
              label="Confirm Password"
              leftIcon="lock-closed-outline"
              placeholder="Confirm your password"
              value={registerForm.formData.confirmPassword}
              onChangeText={text =>
                registerForm.handleChange('confirmPassword', text)
              }
              secureTextEntry
              showPasswordToggle
              error={registerForm.errors.confirmPassword}
              returnKeyType="done"
              onSubmitEditing={() => currentForm.handleSubmit()}
            />
          )}

          {/* Submit Button */}
          <Button
            title={submitButtonTitle}
            onPress={currentForm.handleSubmit}
            disabled={isSubmitting}
            loading={
              currentForm.submitButtonStatus === 'submit-login' ||
              currentForm.submitButtonStatus === 'submit-register'
            }
            style={{
              marginTop: lightTheme.spacing[4],
            }}
            variant="primary"
            size="large"
            fullWidth
          />

          {/* Demo Button - Login Only */}
          {activeTab === 'login' && (
            <View
              style={{
                paddingBottom: insets.bottom + lightTheme.spacing[5],
              }}
            >
              <Button
                title="Try Demo Account"
                onPress={loginForm.handleDemoLogin}
                disabled={isSubmitting}
                loading={currentForm.submitButtonStatus === 'submit-demo'}
                variant="outline"
                size="large"
                fullWidth
                style={styles.demoButton}
              />
            </View>
          )}

          {/* Terms - Register Only */}
          {activeTab === 'register' && (
            <Text
              style={[
                styles.termsText,
                {
                  paddingBottom: insets.bottom + lightTheme.spacing[6],
                },
              ]}
            >
              By creating an account, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dark overlay
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 80,
    paddingHorizontal: lightTheme.spacing[6],
    paddingBottom: 40,
    zIndex: 0,
    height: height * 0.4,
  },
  headerTitle: {
    fontSize: lightTheme.typography.fontSize['3xl'],
    fontWeight: lightTheme.typography.fontWeight.bold,
    color: '#FFFFFF',
    lineHeight: 34,
  },
  headerSubtitle: {
    fontSize: lightTheme.typography.fontSize.base,
    color: '#FFFFFF',
    marginTop: lightTheme.spacing[2],
    lineHeight: 22,
  },
  bottomSheet: {
    ...lightTheme.shadows.lg,
  },
  bottomSheetBackground: {
    backgroundColor: lightTheme.colors.app.surface,
    borderTopLeftRadius: lightTheme.borderRadius.xl,
    borderTopRightRadius: lightTheme.borderRadius.xl,
  },
  bottomSheetIndicator: {
    backgroundColor: lightTheme.colors.neutral[300],
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  bottomSheetContent: {
    padding: lightTheme.spacing[4],
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotText: {
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.app.accent,
    fontWeight: lightTheme.typography.fontWeight.semibold,
  },
  demoButton: {
    marginTop: lightTheme.spacing[3],
  },
  termsText: {
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.neutral[500],
    textAlign: 'center',
    lineHeight: 20,
    paddingVertical: lightTheme.spacing[4],
    marginBottom: 0,
    paddingBottom: 0,
  },
  termsLink: {
    color: lightTheme.colors.app.accent,
    fontWeight: lightTheme.typography.fontWeight.semibold,
  },
});

export default LandingScreen;
