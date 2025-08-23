import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface CurrencyCardProps {
  flag: string;
  currency: string;
  balance: string;
  change: string;
  isPositive: boolean;
  progress: number; // 0 to 1
}

export const CurrencyCard: React.FC<CurrencyCardProps> = ({
  flag,
  currency,
  balance,
  change,
  isPositive,
  progress,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.glassShadow,
        },
      ]}
    >
      {/* Header with flag, currency and change */}
      <View style={styles.header}>
        <View style={styles.currencyInfo}>
          <Text style={styles.flag}>{flag}</Text>
          <View style={styles.currencyDetails}>
            <Text style={[styles.currency, { color: theme.colors.primaryText }]}>
              {currency}
            </Text>
            <Text style={[styles.balanceLabel, { color: theme.colors.secondaryText }]}>
              Balance
            </Text>
          </View>
        </View>
        
        <View style={styles.changeContainer}>
          <Text style={[styles.changeIcon, { color: isPositive ? theme.colors.primary : '#dc3545' }]}>
            {isPositive ? '↗' : '↘'}
          </Text>
          <Text style={[styles.changeText, { color: isPositive ? theme.colors.primary : '#dc3545' }]}>
            {change}
          </Text>
        </View>
      </View>

      {/* Balance */}
      <Text style={[styles.balance, { color: theme.colors.primaryText }]}>
        {balance}
      </Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBackground,
            { backgroundColor: theme.colors.glassEffect }
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress * 100}%`,
                backgroundColor: theme.colors.primary,
              },
            ]}
          />
        </View>
        {/* Small indicator dot */}
        <View
          style={[
            styles.progressDot,
            { backgroundColor: theme.colors.primary }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  currencyDetails: {
    flex: 1,
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: '400',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  balance: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBackground: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});