import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';

export const SettingsScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleAboutPress = () => {
    navigation.navigate('About' as never);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primaryText }]}>
            Settings
          </Text>
        </View>

        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>
            General
          </Text>
          
          <TouchableOpacity 
            style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
            onPress={handleAboutPress}
          >
            <View style={styles.menuItemContent}>
              <Text style={[styles.menuItemText, { color: theme.colors.primaryText }]}>
                About
              </Text>
              <Text style={[styles.menuItemArrow, { color: theme.colors.secondaryText }]}>
                ›
              </Text>
            </View>
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
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  menuSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuItemText: {
    fontSize: 17,
    fontWeight: '400',
  },
  menuItemArrow: {
    fontSize: 20,
    fontWeight: '300',
  },
});