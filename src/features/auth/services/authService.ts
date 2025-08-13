/**
 * Authentication Service
 * Business logic for authentication operations
 */

import { DEMO_CREDENTIALS, STORAGE_KEYS } from '../../../config/constants';
import storageService from '../../../utils/storage';
import {
  User,
  LoginFormData,
  RegisterFormData,
  UpdateProfileFormData,
} from '../types';

// Mock User Database
class MockUserDatabase {
  private mockUsers: Array<User & { password: string }> = [
    {
      id: '1',
      email: DEMO_CREDENTIALS.EMAIL,
      name: 'Demo User',
      password: DEMO_CREDENTIALS.PASSWORD,
      avatar: undefined,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  async findUserByEmail(
    email: string,
  ): Promise<(User & { password: string }) | null> {
    const findMockUser =
      this.mockUsers.find(
        user => user.email.toLowerCase() === email.toLowerCase(),
      ) || null;

    if (findMockUser) {
      return findMockUser;
    }

    const user = await storageService.getItem<User & { password: string }>(
      email.toLowerCase(),
    );
    if (!user) {
      return null;
    }

    return user;
  }

  async createUser(
    userData: Omit<RegisterFormData, 'confirmPassword'>,
  ): Promise<User & { password: string }> {
    const existingUser = await this.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const newUser = {
      id: Date.now().toString(),
      email: userData.email.toLowerCase(),
      name: userData.name,
      password: userData.password,
      avatar: undefined,
      emailVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await storageService.setItem(newUser.email, newUser);

    return newUser;
  }

  async updateUser(
    email: string,
    updates: UpdateProfileFormData,
  ): Promise<User> {
    const user = await this.findUserByEmail(email.toLowerCase());
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await storageService.setItem(updatedUser.email, updatedUser);

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}

// Authentication Service Implementation
class AuthServiceImpl {
  private userDatabase = new MockUserDatabase();

  async login(credentials: LoginFormData): Promise<User> {
    try {
      // Simulate API delay
      await this.simulateDelay();

      const user = await this.userDatabase.findUserByEmail(credentials.email);

      if (!user || user.password !== credentials.password) {
        throw new Error('Invalid email or password');
      }

      // Remove password from response
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  async register(
    userData: Omit<RegisterFormData, 'confirmPassword'>,
  ): Promise<User> {
    try {
      // Simulate API delay
      await this.simulateDelay();

      const newUser = await this.userDatabase.createUser(userData);

      // Remove password from response
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = newUser;

      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    // Simulate API delay
    await this.simulateDelay(500);

    await storageService.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  async getCurrentUser(): Promise<User | null> {
    // In a real app, this would validate the current session/token
    // For now, we'll return null as we don't have persistent sessions
    return null;
  }

  async updateProfile(
    email: string,
    updates: UpdateProfileFormData,
  ): Promise<User> {
    await this.simulateDelay();
    return this.userDatabase.updateUser(email, updates);
  }

  private async simulateDelay(ms = 700): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const authService = new AuthServiceImpl();
