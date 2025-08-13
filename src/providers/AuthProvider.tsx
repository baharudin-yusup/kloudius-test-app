/**
 * Authentication Provider
 * Global authentication context provider
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  PropsWithChildren,
} from 'react';

import { STORAGE_KEYS } from '../config/constants';
import { authService } from '../features/auth/services';
import {
  User,
  AuthContextValue,
  LoginFormData,
  RegisterFormData,
  UpdateProfileFormData,
} from '../features/auth/types';
import { Alert } from 'react-native';
import storageService from '../utils/storage';

// Create Context
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Provider Component
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Load stored user on mount
  useEffect(() => {
    storageService.getItem<User>(STORAGE_KEYS.CURRENT_USER).then(user => {
      if (user) {
        setUser(user);
      }
      setIsInitialLoading(false);
    });
  }, []);

  // Login function
  const login = useCallback(
    async (credentials: LoginFormData): Promise<User> => {
      try {
        setIsAuthenticating(true);

        const userData = await authService.login(credentials);

        setUser(userData);

        return userData;
      } catch (error) {
        throw error;
      } finally {
        setIsAuthenticating(false);
      }
    },
    [],
  );

  // Register function
  const register = useCallback(
    async (
      userData: Omit<RegisterFormData, 'confirmPassword'>,
    ): Promise<User | null> => {
      try {
        setIsAuthenticating(true);

        const user = await authService.register(userData);
        setUser(user);

        return user;
      } catch (error) {
        Alert.alert(
          'Sign up failed',
          error instanceof Error ? error.message : 'Unknown error',
        );
        return null;
      } finally {
        setIsAuthenticating(false);
      }
    },
    [],
  );

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      // Even if the API call fails, we should still clear local state
      setUser(null);
      throw error;
    }
  }, []);

  // Update profile function
  const updateProfile = useCallback(
    async (updates: UpdateProfileFormData): Promise<void> => {
      if (!user) {
        throw new Error('No user logged in');
      }

      try {
        const updatedUser = { ...user, ...updates };

        await authService.updateProfile(user.email, updatedUser);

        setUser(updatedUser);
      } catch (error) {
        setUser(user);
        throw error;
      }
    },
    [user],
  );

  // Context value
  const contextValue: AuthContextValue = {
    user,
    isLoading: isInitialLoading,
    isAuthenticating,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
