/**
 * Tab Selector Component
 * Composite component for tab selection
 */

import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { lightTheme } from '../../../config';

export interface TabOption {
  key: string;
  label: string;
}

interface TabSelectorProps {
  options: TabOption[];
  selectedTab: string;
  onTabChange: (tabKey: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  options,
  selectedTab,
  onTabChange,
}) => {
  const renderTab = useCallback(
    (option: TabOption) => {
      const isActive = selectedTab === option.key;

      const tabStyle = [
        styles.tab,
        isActive ? styles.activeTab : styles.inactiveTab,
      ];

      const textStyle = [
        styles.tabText,
        isActive ? styles.activeTabText : styles.inactiveTabText,
      ];

      const handlePress = () => onTabChange(option.key);

      return (
        <TouchableOpacity
          key={option.key}
          style={tabStyle}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Text style={textStyle}>{option.label}</Text>
        </TouchableOpacity>
      );
    },
    [selectedTab, onTabChange],
  );

  return <View style={styles.container}>{options.map(renderTab)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: lightTheme.colors.neutral[100],
    borderRadius: lightTheme.borderRadius.md,
    padding: 3,
    marginBottom: lightTheme.spacing[8],
  },
  tab: {
    flex: 1,
    paddingVertical: lightTheme.spacing[3],
    alignItems: 'center',
    borderRadius: lightTheme.borderRadius.base,
  },
  activeTab: {
    backgroundColor: lightTheme.colors.app.accent,
    ...lightTheme.shadows.base,
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: lightTheme.typography.fontSize.base,
    fontWeight: lightTheme.typography.fontWeight.semibold,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inactiveTabText: {
    color: lightTheme.colors.neutral[600],
  },
});

export default TabSelector;
