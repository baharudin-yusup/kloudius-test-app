/**
 * App Navigator
 * Main navigation configuration
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

// Providers & Hooks
import { useAuth } from '../providers';

// Screens
import { LandingScreen } from '../features/auth';
import { HomeScreen } from '../features/home';
import { ProfileScreen } from '../features/profile';

// Navigation Configuration
import { ROUTES } from './constants';
import { getTabIconName } from './utils';

// Styles
import { lightTheme } from '../config';

// Navigator Instances
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

/**
 * Tab bar icon renderer
 */
const renderTabBarIcon = ({
  route,
  focused,
  color,
  size,
}: {
  route: {
    name: string;
  };
  focused: boolean;
  color: string;
  size: number;
}) => {
  const iconName = getTabIconName(route.name, focused);
  return <Icon name={iconName} size={size} color={color} />;
};

/**
 * Authentication Stack Navigator
 */
const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name={ROUTES.COMMON.LANDING}
        component={LandingScreen}
      />
    </AuthStack.Navigator>
  );
};

/**
 * Main Tab Navigator
 */
const MainNavigator: React.FC = () => {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          renderTabBarIcon({ route, focused, color, size }),
        headerShown: false,
        tabBarActiveTintColor: lightTheme.colors.primary[500],
        tabBarInactiveTintColor: lightTheme.colors.neutral[400],
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <MainTab.Screen name={ROUTES.MAIN.HOME} component={HomeScreen} />
      <MainTab.Screen name={ROUTES.MAIN.PROFILE} component={ProfileScreen} />
    </MainTab.Navigator>
  );
};

/**
 * Loading Screen Component
 */
const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        size={'large'}
        color={lightTheme.colors.primary[500]}
      />
    </View>
  );
};

/**
 * Main App Navigator
 */
const AppNavigator: React.FC = () => {
  const { user, isLoading } = useAuth();

  // Show loading screen while determining authentication state
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.app.background,
  },
  tabBarStyle: {
    backgroundColor: lightTheme.colors.app.surface,
    borderTopColor: lightTheme.colors.neutral[200],
  },
});

export default AppNavigator;
