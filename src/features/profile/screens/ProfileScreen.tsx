/**
 * Profile Screen
 * User profile management screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

import { Button, TextInput } from '../../../components/base';
import { useAuth } from '../../../providers';
import { lightTheme } from '../../../config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLogoutInProgress, setIsLogoutInProgress] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
  });

  const handleSaveProfile = async () => {
    try {
      await updateProfile(editData);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleCancelEdit = () => {
    setEditData({ name: user?.name || '' });
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      setIsLogoutInProgress(true);
      await logout();
    } catch (error) {
      // Don't show alert on logout - just log the error
      console.warn('Logout error:', error);
    } finally {
      setIsLogoutInProgress(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon
              name="person"
              size={40}
              color={lightTheme.colors.primary[500]}
            />
          </View>
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      {/* Profile Form */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          <TouchableOpacity
            onPress={() => setIsEditing(!isEditing)}
            style={styles.editButton}
          >
            <Icon
              name={isEditing ? 'close' : 'create-outline'}
              size={20}
              color={lightTheme.colors.primary[500]}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Full Name"
            value={isEditing ? editData.name : user?.name || ''}
            onChangeText={text =>
              setEditData(prev => ({ ...prev, name: text }))
            }
            editable={isEditing}
            leftIcon="person-outline"
          />

          <TextInput
            label="Email Address"
            value={user?.email || ''}
            editable={false}
            leftIcon="mail-outline"
            containerStyle={styles.disabledInput}
          />

          {isEditing && (
            <View style={styles.buttonRow}>
              <Button
                title="Cancel"
                onPress={handleCancelEdit}
                variant="outline"
                style={styles.button}
              />
              <Button
                title="Save"
                onPress={handleSaveProfile}
                variant="primary"
                style={styles.button}
              />
            </View>
          )}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
        </View>
        <Button
          title="Logout"
          onPress={handleLogout}
          loading={isLogoutInProgress}
          disabled={isLogoutInProgress}
          variant="outline"
          size="large"
          fullWidth
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.app.background,
  },
  header: {
    alignItems: 'center',
    padding: lightTheme.spacing[6],
    backgroundColor: lightTheme.colors.app.surface,
  },
  avatarContainer: {
    marginBottom: lightTheme.spacing[4],
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: lightTheme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: lightTheme.typography.fontSize['2xl'],
    fontWeight: lightTheme.typography.fontWeight.bold,
    color: lightTheme.colors.neutral[900],
    marginBottom: lightTheme.spacing[1],
  },
  userEmail: {
    fontSize: lightTheme.typography.fontSize.base,
    color: lightTheme.colors.neutral[500],
  },
  section: {
    padding: lightTheme.spacing[4],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: lightTheme.spacing[10],
    marginBottom: lightTheme.spacing[1],
  },
  sectionTitle: {
    fontSize: lightTheme.typography.fontSize.lg,
    fontWeight: lightTheme.typography.fontWeight.semibold,
    color: lightTheme.colors.neutral[900],
  },
  editButton: {
    padding: lightTheme.spacing[2],
  },
  form: {
    backgroundColor: lightTheme.colors.app.surface,
    borderRadius: lightTheme.borderRadius.md,
    padding: lightTheme.spacing[4],
    ...lightTheme.shadows.base,
  },
  disabledInput: {
    opacity: 0.6,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: lightTheme.spacing[3],
    marginTop: lightTheme.spacing[4],
  },
  button: {
    flex: 1,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.app.surface,
    padding: lightTheme.spacing[4],
    borderRadius: lightTheme.borderRadius.md,
    ...lightTheme.shadows.base,
  },
  actionText: {
    fontSize: lightTheme.typography.fontSize.base,
    color: lightTheme.colors.error[500],
    marginLeft: lightTheme.spacing[3],
    fontWeight: lightTheme.typography.fontWeight.medium,
  },
});

export default ProfileScreen;
