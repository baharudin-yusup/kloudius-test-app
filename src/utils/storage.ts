/**
 * Storage Utilities
 * Wrapper around AsyncStorage with error handling and type safety
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StorageService {
  getItem: <T = String>(key: string) => Promise<T | null>;
  setItem: <T = String>(key: string, value: T) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
}

class AsyncStorageService implements StorageService {
  /**
   * Get item from storage
   */
  async getItem<T = String>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error getting item from storage (${key}):`, error);
      return null;
    }
  }

  /**
   * Set item in storage
   */
  async setItem<T = String>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value),
      );
    } catch (error) {
      console.error(`Error setting item in storage (${key}):`, error);
      throw error;
    }
  }

  /**
   * Remove item from storage
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from storage (${key}):`, error);
      throw error;
    }
  }

  /**
   * Clear all storage
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }
}

// Create and export storage service instance
export const storageService = new AsyncStorageService();

// Export default storage service
export default storageService;
