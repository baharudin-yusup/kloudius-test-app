/**
 * Home Screen
 * Main dashboard screen
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

import { useAuth } from '../../../providers';
import { lightTheme } from '../../../config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" translucent />

      {/* Welcome Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Icon
              name="person"
              size={30}
              color={lightTheme.colors.primary[500]}
            />
          </View>
        </View>
      </View>

      {/* Account Info Card */}
      <View style={styles.section}>
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon
              name="information-circle"
              size={24}
              color={lightTheme.colors.primary[500]}
            />
            <Text style={styles.infoTitle}>Account Information</Text>
          </View>
          <View style={styles.infoContent}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user?.email || 'N/A'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Member since</Text>
              <Text style={styles.infoValue}>Today</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Account Status</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>
          </View>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: lightTheme.spacing[4],
    paddingTop: lightTheme.spacing[8],
    backgroundColor: lightTheme.colors.app.surface,
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.neutral[200],
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: lightTheme.typography.fontSize.base,
    color: lightTheme.colors.neutral[500],
  },
  userName: {
    fontSize: lightTheme.typography.fontSize['2xl'],
    fontWeight: lightTheme.typography.fontWeight.bold,
    color: lightTheme.colors.neutral[900],
    marginTop: lightTheme.spacing[1],
  },
  avatarContainer: {
    marginLeft: lightTheme.spacing[4],
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: lightTheme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    padding: lightTheme.spacing[4],
    paddingTop: lightTheme.spacing[8],
  },
  infoCard: {
    backgroundColor: lightTheme.colors.app.surface,
    borderRadius: lightTheme.borderRadius.md,
    padding: lightTheme.spacing[5],
    ...lightTheme.shadows.base,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: lightTheme.spacing[4],
  },
  infoTitle: {
    fontSize: lightTheme.typography.fontSize.lg,
    fontWeight: lightTheme.typography.fontWeight.semibold,
    color: lightTheme.colors.neutral[900],
    marginLeft: lightTheme.spacing[3],
  },
  infoContent: {
    gap: lightTheme.spacing[3],
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: lightTheme.typography.fontSize.sm,
    color: lightTheme.colors.neutral[500],
  },
  infoValue: {
    fontSize: lightTheme.typography.fontSize.sm,
    fontWeight: lightTheme.typography.fontWeight.medium,
    color: lightTheme.colors.neutral[900],
  },
  statusBadge: {
    backgroundColor: lightTheme.colors.success[50],
    paddingHorizontal: lightTheme.spacing[3],
    paddingVertical: lightTheme.spacing[1],
    borderRadius: lightTheme.borderRadius.md,
  },
  statusText: {
    fontSize: lightTheme.typography.fontSize.xs,
    fontWeight: lightTheme.typography.fontWeight.semibold,
    color: lightTheme.colors.success[500],
  },
});

export default HomeScreen;
