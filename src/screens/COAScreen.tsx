import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export const COAScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
            <Icon name="list-outline" size={32} color={theme.colors.contrast} />
          </View>
          <Text style={[styles.title, { color: theme.colors.primaryText }]}>
            Chart of Accounts
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Manage your account structure and categories
          </Text>
        </View>

        {/* Account Categories */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>Account Categories</Text>
          
          <View style={styles.categoryItem}>
            <View style={[styles.categoryIcon, { backgroundColor: theme.colors.success + '20' }]}>
              <Icon name="trending-up" size={20} color={theme.colors.success} />
            </View>
            <View style={styles.categoryContent}>
              <Text style={[styles.categoryName, { color: theme.colors.primaryText }]}>Assets</Text>
              <Text style={[styles.categoryDescription, { color: theme.colors.secondaryText }]}>Cash, investments, and other assets</Text>
            </View>
          </View>

          <View style={styles.categoryItem}>
            <View style={[styles.categoryIcon, { backgroundColor: theme.colors.error + '20' }]}>
              <Icon name="trending-down" size={20} color={theme.colors.error} />
            </View>
            <View style={styles.categoryContent}>
              <Text style={[styles.categoryName, { color: theme.colors.primaryText }]}>Liabilities</Text>
              <Text style={[styles.categoryDescription, { color: theme.colors.secondaryText }]}>Debts and obligations</Text>
            </View>
          </View>

          <View style={styles.categoryItem}>
            <View style={[styles.categoryIcon, { backgroundColor: theme.colors.primary + '20' }]}>
              <Icon name="wallet-outline" size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.categoryContent}>
              <Text style={[styles.categoryName, { color: theme.colors.primaryText }]}>Equity</Text>
              <Text style={[styles.categoryDescription, { color: theme.colors.secondaryText }]}>Owner's equity and retained earnings</Text>
            </View>
          </View>

          <View style={styles.categoryItem}>
            <View style={[styles.categoryIcon, { backgroundColor: theme.colors.warning + '20' }]}>
              <Icon name="cash-outline" size={20} color={theme.colors.warning} />
            </View>
            <View style={styles.categoryContent}>
              <Text style={[styles.categoryName, { color: theme.colors.primaryText }]}>Revenue</Text>
              <Text style={[styles.categoryDescription, { color: theme.colors.secondaryText }]}>Income and sales</Text>
            </View>
          </View>

          <View style={styles.categoryItem}>
            <View style={[styles.categoryIcon, { backgroundColor: theme.colors.secondaryText + '20' }]}>
              <Icon name="receipt-outline" size={20} color={theme.colors.secondaryText} />
            </View>
            <View style={styles.categoryContent}>
              <Text style={[styles.categoryName, { color: theme.colors.primaryText }]}>Expenses</Text>
              <Text style={[styles.categoryDescription, { color: theme.colors.secondaryText }]}>Operating costs and expenses</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>Account Summary</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.primary }]}>24</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Total Accounts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.success }]}>8</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Active</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.warning }]}>3</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Inactive</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});