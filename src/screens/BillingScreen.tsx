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

export const BillingScreen: React.FC = () => {
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
            <Icon name="card-outline" size={32} color={theme.colors.contrast} />
          </View>
          <Text style={[styles.title, { color: theme.colors.primaryText }]}>
            Billing & Subscription
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Manage your subscription and payment methods
          </Text>
        </View>

        {/* Current Plan */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>Current Plan</Text>
          
          <View style={[styles.planCard, { backgroundColor: theme.colors.primary + '10', borderColor: theme.colors.primary }]}>
            <View style={styles.planHeader}>
              <Text style={[styles.planName, { color: theme.colors.primary }]}>Pro Plan</Text>
              <View style={[styles.planBadge, { backgroundColor: theme.colors.success }]}>
                <Text style={[styles.planBadgeText, { color: theme.colors.contrast }]}>Active</Text>
              </View>
            </View>
            <Text style={[styles.planPrice, { color: theme.colors.primaryText }]}>$29.99/month</Text>
            <Text style={[styles.planDescription, { color: theme.colors.secondaryText }]}>
              Full access to all features, unlimited transactions, and priority support
            </Text>
            <Text style={[styles.planRenewal, { color: theme.colors.secondaryText }]}>
              Next billing: March 15, 2024
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>Payment Method</Text>
          
          <View style={styles.paymentMethod}>
            <View style={[styles.cardIcon, { backgroundColor: theme.colors.primary + '20' }]}>
              <Icon name="card" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.cardDetails}>
              <Text style={[styles.cardNumber, { color: theme.colors.primaryText }]}>•••• •••• •••• 4242</Text>
              <Text style={[styles.cardExpiry, { color: theme.colors.secondaryText }]}>Expires 12/26</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Icon name="pencil" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Billing History */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>Recent Invoices</Text>
          
          <View style={styles.invoiceItem}>
            <View style={styles.invoiceDetails}>
              <Text style={[styles.invoiceDate, { color: theme.colors.primaryText }]}>February 15, 2024</Text>
              <Text style={[styles.invoiceDescription, { color: theme.colors.secondaryText }]}>Pro Plan - Monthly</Text>
            </View>
            <View style={styles.invoiceAmount}>
              <Text style={[styles.invoicePrice, { color: theme.colors.primaryText }]}>$29.99</Text>
              <View style={[styles.invoiceStatus, { backgroundColor: theme.colors.success + '20' }]}>
                <Text style={[styles.invoiceStatusText, { color: theme.colors.success }]}>Paid</Text>
              </View>
            </View>
          </View>

          <View style={styles.invoiceItem}>
            <View style={styles.invoiceDetails}>
              <Text style={[styles.invoiceDate, { color: theme.colors.primaryText }]}>January 15, 2024</Text>
              <Text style={[styles.invoiceDescription, { color: theme.colors.secondaryText }]}>Pro Plan - Monthly</Text>
            </View>
            <View style={styles.invoiceAmount}>
              <Text style={[styles.invoicePrice, { color: theme.colors.primaryText }]}>$29.99</Text>
              <View style={[styles.invoiceStatus, { backgroundColor: theme.colors.success + '20' }]}>
                <Text style={[styles.invoiceStatusText, { color: theme.colors.success }]}>Paid</Text>
              </View>
            </View>
          </View>

          <View style={styles.invoiceItem}>
            <View style={styles.invoiceDetails}>
              <Text style={[styles.invoiceDate, { color: theme.colors.primaryText }]}>December 15, 2023</Text>
              <Text style={[styles.invoiceDescription, { color: theme.colors.secondaryText }]}>Pro Plan - Monthly</Text>
            </View>
            <View style={styles.invoiceAmount}>
              <Text style={[styles.invoicePrice, { color: theme.colors.primaryText }]}>$29.99</Text>
              <View style={[styles.invoiceStatus, { backgroundColor: theme.colors.success + '20' }]}>
                <Text style={[styles.invoiceStatusText, { color: theme.colors.success }]}>Paid</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>Manage Subscription</Text>
          
          <TouchableOpacity style={[styles.actionButton, { borderColor: theme.colors.border }]}>
            <Icon name="refresh-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>Change Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, { borderColor: theme.colors.border }]}>
            <Icon name="download-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>Download Invoices</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, { borderColor: theme.colors.error }]}>
            <Icon name="close-circle-outline" size={20} color={theme.colors.error} />
            <Text style={[styles.actionButtonText, { color: theme.colors.error }]}>Cancel Subscription</Text>
          </TouchableOpacity>
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
  planCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
  },
  planBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  planBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  planRenewal: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardDetails: {
    flex: 1,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  cardExpiry: {
    fontSize: 14,
  },
  editButton: {
    padding: 8,
  },
  invoiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  invoiceDetails: {
    flex: 1,
  },
  invoiceDate: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  invoiceDescription: {
    fontSize: 14,
  },
  invoiceAmount: {
    alignItems: 'flex-end',
  },
  invoicePrice: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  invoiceStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  invoiceStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
});