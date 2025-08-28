import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import packageJson from '../../package.json';

export const AboutScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.appName, { color: theme.colors.primaryText }]}>
            {packageJson.name}
          </Text>
          <Text style={[styles.version, { color: theme.colors.secondaryText }]}>
            Version {packageJson.version}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>
            About This App
          </Text>
          <Text style={[styles.description, { color: theme.colors.secondaryText }]}>
            FinxRN2 is a comprehensive financial portfolio management application designed to help you track your investments, manage your finances, and make informed trading decisions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>
            Features
          </Text>
          <View style={styles.featureList}>
            <Text style={[styles.feature, { color: theme.colors.secondaryText }]}>
              • Portfolio tracking and management
            </Text>
            <Text style={[styles.feature, { color: theme.colors.secondaryText }]}>
              • Real-time exchange rates
            </Text>
            <Text style={[styles.feature, { color: theme.colors.secondaryText }]}>
              • Financial insights and analytics
            </Text>
            <Text style={[styles.feature, { color: theme.colors.secondaryText }]}>
              • Journal management (Cash, Bank, Credit Card)
            </Text>
            <Text style={[styles.feature, { color: theme.colors.secondaryText }]}>
              • Chart of Accounts (COA)
            </Text>
            <Text style={[styles.feature, { color: theme.colors.secondaryText }]}>
              • Billing and expense tracking
            </Text>
            <Text style={[styles.feature, { color: theme.colors.secondaryText }]}>
              • Dark/Light theme support
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>
            Developer Information
          </Text>
          <Text style={[styles.info, { color: theme.colors.secondaryText }]}>
            Package: com.finxrn2
          </Text>
          <Text style={[styles.info, { color: theme.colors.secondaryText }]}>
            App Version: {packageJson.version}
          </Text>
          <Text style={[styles.info, { color: theme.colors.secondaryText }]}>
            Build: Release
          </Text>
          <Text style={[styles.info, { color: theme.colors.secondaryText }]}>
            Platform: React Native {packageJson.dependencies['react-native']}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>
            Contact & Support
          </Text>
          <Text style={[styles.info, { color: theme.colors.secondaryText }]}>
            For support and feedback, please contact our development team.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.copyright, { color: theme.colors.secondaryText }]}>
            © 2025 FinxRN2. All rights reserved.
          </Text>
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
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  featureList: {
    marginLeft: 10,
  },
  feature: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
  },
  info: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  copyright: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});