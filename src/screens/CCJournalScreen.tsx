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

export const CCJournalScreen: React.FC = () => {
  const { theme } = useTheme();

  const transactions = [
    {
      id: '1',
      date: '2024-02-15',
      description: 'Amazon Web Services',
      amount: -89.50,
      category: 'Software & Services',
      merchant: 'AWS',
      status: 'Posted',
    },
    {
      id: '2',
      date: '2024-02-14',
      description: 'Office Depot - Supplies',
      amount: -245.75,
      category: 'Office Expenses',
      merchant: 'Office Depot',
      status: 'Posted',
    },
    {
      id: '3',
      date: '2024-02-13',
      description: 'Fuel Station',
      amount: -65.00,
      category: 'Travel & Transport',
      merchant: 'Shell',
      status: 'Posted',
    },
    {
      id: '4',
      date: '2024-02-12',
      description: 'Client Lunch Meeting',
      amount: -125.30,
      category: 'Meals & Entertainment',
      merchant: 'Restaurant ABC',
      status: 'Pending',
    },
    {
      id: '5',
      date: '2024-02-11',
      description: 'Payment Received - Thank You',
      amount: 500.00,
      category: 'Payment',
      merchant: 'Payment',
      status: 'Posted',
    },
  ];

  const currentBalance = -1025.55;
  const creditLimit = 10000.00;
  const availableCredit = creditLimit + currentBalance;
  const minimumPayment = 125.00;

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
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.warning }]}>
            <Icon name="card" size={32} color={theme.colors.contrast} />
          </View>
          <Text style={[styles.title, { color: theme.colors.primaryText }]}>
            Credit Card Journal
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Track credit card transactions and payments
          </Text>
        </View>

        {/* Credit Card Info */}
        <View style={[styles.cardInfo, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardName, { color: theme.colors.primaryText }]}>Business Credit Card</Text>
            <View style={[styles.cardType, { backgroundColor: theme.colors.warning + '20' }]}>
              <Text style={[styles.cardTypeText, { color: theme.colors.warning }]}>Visa</Text>
            </View>
          </View>
          <Text style={[styles.cardNumber, { color: theme.colors.secondaryText }]}>•••• •••• •••• 4567</Text>
          <View style={styles.balanceRow}>
            <View>
              <Text style={[styles.balanceLabel, { color: theme.colors.secondaryText }]}>Current Balance</Text>
              <Text style={[styles.balanceAmount, { color: theme.colors.error }]}>
                ${Math.abs(currentBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
            </View>
            <View style={styles.balanceRight}>
              <Text style={[styles.balanceLabel, { color: theme.colors.secondaryText }]}>Available Credit</Text>
              <Text style={[styles.balanceAmount, { color: theme.colors.success }]}>
                ${availableCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Credit Limit</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>
              ${creditLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Min Payment</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.error }]}>
              ${minimumPayment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.colors.success }]}>
            <Icon name="card-outline" size={16} color={theme.colors.contrast} />
            <Text style={[styles.quickActionText, { color: theme.colors.contrast }]}>Make Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.colors.primary }]}>
            <Icon name="add" size={16} color={theme.colors.contrast} />
            <Text style={[styles.quickActionText, { color: theme.colors.contrast }]}>Add Expense</Text>
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
                    name={transaction.amount > 0 ? 'arrow-down' : 'card'} 
                    size={16} 
                    color={transaction.amount > 0 ? theme.colors.success : theme.colors.error} 
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={[styles.transactionDescription, { color: theme.colors.primaryText }]}>
                    {transaction.description}
                  </Text>
                  <Text style={[styles.transactionMeta, { color: theme.colors.secondaryText }]}>
                    {transaction.date} • {transaction.merchant}
                  </Text>
                  <View style={styles.transactionFooter}>
                    <Text style={[styles.transactionCategory, { color: theme.colors.secondaryText }]}>
                      {transaction.category}
                    </Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: transaction.status === 'Posted' ? theme.colors.success + '20' : theme.colors.warning + '20' }
                    ]}>
                      <Text style={[
                        styles.statusText,
                        { color: transaction.status === 'Posted' ? theme.colors.success : theme.colors.warning }
                      ]}>
                        {transaction.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount > 0 ? theme.colors.success : theme.colors.error }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Credit Card Services */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>Card Management</Text>
          
          <View style={styles.servicesGrid}>
            <TouchableOpacity style={[styles.serviceButton, { borderColor: theme.colors.border }]}>
              <Icon name="lock-closed-outline" size={20} color={theme.colors.error} />
              <Text style={[styles.serviceButtonText, { color: theme.colors.error }]}>Freeze Card</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.serviceButton, { borderColor: theme.colors.border }]}>
              <Icon name="settings-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.serviceButtonText, { color: theme.colors.primary }]}>Card Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.serviceButton, { borderColor: theme.colors.border }]}>
              <Icon name="document-text-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.serviceButtonText, { color: theme.colors.primary }]}>Statements</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.serviceButton, { borderColor: theme.colors.border }]}>
              <Icon name="analytics-outline" size={20} color={theme.colors.warning} />
              <Text style={[styles.serviceButtonText, { color: theme.colors.warning }]}>Spending Report</Text>
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
  cardInfo: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardNumber: {
    fontSize: 16,
    marginBottom: 16,
    letterSpacing: 2,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceRight: {
    alignItems: 'flex-end',
  },
  balanceLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 18,
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
    fontSize: 16,
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
    marginBottom: 6,
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionCategory: {
    fontSize: 11,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
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