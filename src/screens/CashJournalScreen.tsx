import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export const CashJournalScreen: React.FC = () => {
  const { theme } = useTheme();

  const transactions = [
    {
      id: '1',
      date: '2024-02-15',
      description: 'Office supplies purchase',
      amount: -125.50,
      balance: 2874.50,
      category: 'Office Expenses',
    },
    {
      id: '2',
      date: '2024-02-14',
      description: 'Cash deposit',
      amount: 500.00,
      balance: 3000.00,
      category: 'Deposit',
    },
    {
      id: '3',
      date: '2024-02-13',
      description: 'Petty cash withdrawal',
      amount: -200.00,
      balance: 2500.00,
      category: 'Petty Cash',
    },
    {
      id: '4',
      date: '2024-02-12',
      description: 'Client payment received',
      amount: 1200.00,
      balance: 2700.00,
      category: 'Revenue',
    },
  ];

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
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.success }]}>
            <Icon name="cash-outline" size={32} color={theme.colors.contrast} />
          </View>
          <Text style={[styles.title, { color: theme.colors.primaryText }]}>
            Cash Journal
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Track all cash transactions and balances
          </Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Current Balance</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.success }]}>$2,874.50</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>This Month</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>$1,374.50</Text>
          </View>
        </View>

        {/* Add Transaction Button */}
        <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.colors.primary }]}>
          <Icon name="add" size={20} color={theme.colors.contrast} />
          <Text style={[styles.addButtonText, { color: theme.colors.contrast }]}>Add Cash Transaction</Text>
        </TouchableOpacity>

        {/* Transactions List */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>Recent Transactions</Text>
          
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: transaction.amount > 0 ? theme.colors.success + '20' : theme.colors.error + '20' }
                ]}>
                  <Icon 
                    name={transaction.amount > 0 ? 'arrow-down' : 'arrow-up'} 
                    size={16} 
                    color={transaction.amount > 0 ? theme.colors.success : theme.colors.error} 
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={[styles.transactionDescription, { color: theme.colors.primaryText }]}>
                    {transaction.description}
                  </Text>
                  <Text style={[styles.transactionDate, { color: theme.colors.secondaryText }]}>
                    {transaction.date} • {transaction.category}
                  </Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount > 0 ? theme.colors.success : theme.colors.error }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </Text>
                <Text style={[styles.transactionBalance, { color: theme.colors.secondaryText }]}>
                  Bal: ${transaction.balance.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>Quick Actions</Text>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={[styles.actionButton, { borderColor: theme.colors.border }]}>
              <Icon name="download-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>Deposit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, { borderColor: theme.colors.border }]}>
              <Icon name="arrow-up-outline" size={20} color={theme.colors.error} />
              <Text style={[styles.actionButtonText, { color: theme.colors.error }]}>Withdrawal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, { borderColor: theme.colors.border }]}>
              <Icon name="swap-horizontal-outline" size={20} color={theme.colors.warning} />
              <Text style={[styles.actionButtonText, { color: theme.colors.warning }]}>Transfer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, { borderColor: theme.colors.border }]}>
              <Icon name="document-text-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>Report</Text>
            </TouchableOpacity>
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
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionBalance: {
    fontSize: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    width: '48%',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});