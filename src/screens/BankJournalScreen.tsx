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

export const BankJournalScreen: React.FC = () => {
  const { theme } = useTheme();

  const transactions = [
    {
      id: '1',
      date: '2024-02-15',
      description: 'Wire transfer to supplier',
      amount: -5250.00,
      balance: 45750.00,
      category: 'Wire Transfer',
      reference: 'WT240215001',
    },
    {
      id: '2',
      date: '2024-02-14',
      description: 'Client payment - Invoice #1234',
      amount: 8500.00,
      balance: 51000.00,
      category: 'ACH Credit',
      reference: 'ACH240214002',
    },
    {
      id: '3',
      date: '2024-02-13',
      description: 'Monthly service fee',
      amount: -25.00,
      balance: 42500.00,
      category: 'Bank Fee',
      reference: 'FEE240213001',
    },
    {
      id: '4',
      date: '2024-02-12',
      description: 'Payroll direct deposit',
      amount: -12500.00,
      balance: 42525.00,
      category: 'Payroll',
      reference: 'DD240212001',
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
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
            <Icon name="business-outline" size={32} color={theme.colors.contrast} />
          </View>
          <Text style={[styles.title, { color: theme.colors.primaryText }]}>
            Bank Journal
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Monitor bank account transactions and reconciliation
          </Text>
        </View>

        {/* Account Info */}
        <View style={[styles.accountCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <View style={styles.accountHeader}>
            <Text style={[styles.accountName, { color: theme.colors.primaryText }]}>Business Checking</Text>
            <View style={[styles.accountStatus, { backgroundColor: theme.colors.success + '20' }]}>
              <Text style={[styles.accountStatusText, { color: theme.colors.success }]}>Active</Text>
            </View>
          </View>
          <Text style={[styles.accountNumber, { color: theme.colors.secondaryText }]}>Account: ****-****-****-7890</Text>
          <Text style={[styles.accountBalance, { color: theme.colors.success }]}>$45,750.00</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Pending</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.warning }]}>$2,150.00</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Available</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.success }]}>$43,600.00</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.colors.primary }]}>
            <Icon name="add" size={16} color={theme.colors.contrast} />
            <Text style={[styles.quickActionText, { color: theme.colors.contrast }]}>New Transaction</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.colors.warning }]}>
            <Icon name="sync" size={16} color={theme.colors.contrast} />
            <Text style={[styles.quickActionText, { color: theme.colors.contrast }]}>Reconcile</Text>
          </TouchableOpacity>
        </View>

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
                  <Text style={[styles.transactionMeta, { color: theme.colors.secondaryText }]}>
                    {transaction.date} • {transaction.category}
                  </Text>
                  <Text style={[styles.transactionReference, { color: theme.colors.secondaryText }]}>
                    Ref: {transaction.reference}
                  </Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount > 0 ? theme.colors.success : theme.colors.error }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Text>
                <Text style={[styles.transactionBalance, { color: theme.colors.secondaryText }]}>
                  Bal: ${transaction.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bank Services */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>Bank Services</Text>
          
          <View style={styles.servicesGrid}>
            <TouchableOpacity style={[styles.serviceButton, { borderColor: theme.colors.border }]}>
              <Icon name="swap-horizontal-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.serviceButtonText, { color: theme.colors.primary }]}>Wire Transfer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.serviceButton, { borderColor: theme.colors.border }]}>
              <Icon name="card-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.serviceButtonText, { color: theme.colors.primary }]}>ACH Transfer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.serviceButton, { borderColor: theme.colors.border }]}>
              <Icon name="checkmark-circle-outline" size={20} color={theme.colors.success} />
              <Text style={[styles.serviceButtonText, { color: theme.colors.success }]}>Stop Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.serviceButton, { borderColor: theme.colors.border }]}>
              <Icon name="document-text-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.serviceButtonText, { color: theme.colors.primary }]}>Statements</Text>
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
  accountCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  accountName: {
    fontSize: 18,
    fontWeight: '600',
  },
  accountStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  accountStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  accountNumber: {
    fontSize: 14,
    marginBottom: 8,
  },
  accountBalance: {
    fontSize: 24,
    fontWeight: '700',
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
    fontSize: 18,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
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
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionMeta: {
    fontSize: 12,
    marginBottom: 2,
  },
  transactionReference: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionBalance: {
    fontSize: 12,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    width: '48%',
  },
  serviceButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});