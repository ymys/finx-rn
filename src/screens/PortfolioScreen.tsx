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
import { ThemeToggle, CurrencyCard } from '../components';

export const PortfolioScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      
      {/* Header with theme toggle */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.colors.primaryText }]}>
            Portfolio Overview
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Your global currency positions
          </Text>
        </View>
        <ThemeToggle />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Total Portfolio Value Card */}
        <View
          style={[
            styles.totalValueCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              shadowColor: theme.colors.glassShadow,
            },
          ]}
        >
          <Text style={[styles.totalLabel, { color: theme.colors.secondaryText }]}>
            TOTAL PORTFOLIO VALUE
          </Text>
          <View style={styles.totalValueRow}>
            <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
              $28,203.91
            </Text>
            <Text style={[styles.currency, { color: theme.colors.secondaryText }]}>
              USD
            </Text>
          </View>
          <View style={styles.changeRow}>
            <Text style={[styles.changeIcon, { color: theme.colors.primary }]}>↗</Text>
            <Text style={[styles.changeText, { color: theme.colors.primary }]}>
              +4.2% this month
            </Text>
          </View>
        </View>

        {/* Currency Cards */}
        <View style={styles.currencySection}>
          <CurrencyCard
            flag="🇺🇸"
            currency="USD"
            balance="$12,847.32"
            change="+2.34%"
            isPositive={true}
            progress={0.65}
          />
          
          <CurrencyCard
            flag="🇪🇺"
            currency="EUR"
            balance="€8,923.41"
            change="-1.12%"
            isPositive={false}
            progress={0.45}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  totalValueCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
  },
  totalValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  totalValue: {
    fontSize: 36,
    fontWeight: '700',
    marginRight: 8,
  },
  currency: {
    fontSize: 18,
    fontWeight: '500',
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  currencySection: {
    gap: 16,
  },
});