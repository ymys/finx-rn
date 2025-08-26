import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import { FloatingJournalMenu, FloatingSettingsMenu } from '../components';

// Import screens
import {
  PortfolioScreen,
  ExchangeScreen,
  JournalsScreen,
  InsightsScreen,
  SettingsScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string, focused: boolean, color: string, size: number) => {
  let iconName: string;

  switch (routeName) {
    case 'Wallet':
      iconName = focused ? 'wallet' : 'wallet-outline';
      break;
    case 'Exchange':
      iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
      break;
    case 'Journals':
      iconName = focused ? 'book' : 'book-outline';
      break;
    case 'Insights':
      iconName = focused ? 'analytics' : 'analytics-outline';
      break;
    case 'Settings':
      iconName = focused ? 'settings' : 'settings-outline';
      break;
    default:
      iconName = 'help-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

export const AppNavigator: React.FC = () => {
  const { theme } = useTheme();
  const [showJournalMenu, setShowJournalMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
            getTabBarIcon(route.name, focused, color, size),
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.secondaryText,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
            borderTopWidth: 1,
            paddingBottom: 8,
            paddingTop: 8,
            height: 88,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
            borderBottomColor: theme.colors.border,
            borderBottomWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: theme.colors.primaryText,
            fontSize: 18,
            fontWeight: '600',
          },
          headerTintColor: theme.colors.primaryText,
        })}
      >
        <Tab.Screen
          name="Wallet"
          component={PortfolioScreen}
          options={{
            title: 'Portfolio Overview',
          }}
        />
        <Tab.Screen
          name="Exchange"
          component={ExchangeScreen}
          options={{
            title: 'Exchange',
          }}
        />
        <Tab.Screen
          name="Journals"
          component={JournalsScreen}
          options={{
            title: 'Journals',
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setShowJournalMenu(true);
            },
          }}
        />
        <Tab.Screen
          name="Insights"
          component={InsightsScreen}
          options={{
            title: 'Insights',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setShowSettingsMenu(true);
            },
          }}
        />
      </Tab.Navigator>
      
      <FloatingJournalMenu
        visible={showJournalMenu}
        onClose={() => setShowJournalMenu(false)}
      />
      
      <FloatingSettingsMenu
        visible={showSettingsMenu}
        onClose={() => setShowSettingsMenu(false)}
      />
    </NavigationContainer>
  );
};