import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
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
  ProfileScreen,
  COAScreen,
  BillingScreen,
  CashJournalScreen,
  BankJournalScreen,
  CCJournalScreen,
} from '../screens';

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const MainStack = createStackNavigator();

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

const SettingsScreenWithMenu: React.FC = () => {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowSettingsMenu(true);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <SettingsScreen />
      <FloatingSettingsMenu
        visible={showSettingsMenu}
        onClose={() => setShowSettingsMenu(false)}
        navigation={navigation as any}
      />
    </>
  );
};

const SettingsStackNavigator: React.FC = () => {
  const { theme } = useTheme();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowSettingsMenu(true);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <SettingsStack.Navigator
        screenOptions={{
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
        }}
      >
        <SettingsStack.Screen 
          name="SettingsMain" 
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />
        <SettingsStack.Screen 
           name="Profile" 
           component={ProfileScreen}
           options={{
             title: 'Profile',
           }}
         />
      </SettingsStack.Navigator>
      
      <FloatingSettingsMenu
        visible={showSettingsMenu}
        onClose={() => setShowSettingsMenu(false)}
        navigation={navigation}
      />
    </>
  );
};

const TabNavigator: React.FC = () => {
  const { theme } = useTheme();
  const [showJournalMenu, setShowJournalMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const customTabBar = (props: any) => {
    const { state, descriptors, navigation } = props;
    
    // Only show the main 5 tabs, filter out hidden ones
    const mainTabs = state.routes.filter((route: any) => 
      ['Wallet', 'Exchange', 'Journals', 'Insights', 'Settings'].includes(route.name)
    );
    
    return (
      <View style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderTopColor: theme.colors.border,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingTop: 8,
        height: 88,
      }}>
        {mainTabs.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
          const isFocused = state.index === state.routes.indexOf(route);
          
          const onPress = () => {
            if (route.name === 'Journals') {
              setShowJournalMenu(true);
            } else if (route.name === 'Settings') {
              setShowSettingsMenu(true);
            } else {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }
          };
          
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
              }}
            >
              {getTabBarIcon(route.name, isFocused, isFocused ? theme.colors.primary : theme.colors.secondaryText, 24)}
              <Text style={{
                color: isFocused ? theme.colors.primary : theme.colors.secondaryText,
                fontSize: 12,
                fontWeight: '500',
                marginTop: 4,
              }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <Tab.Navigator
        tabBar={customTabBar}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
            getTabBarIcon(route.name, focused, color, size),
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
          component={PortfolioScreen}
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

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
           name="COA"
           component={COAScreen}
           options={{
             title: 'COA',
             tabBarButton: () => null,
           }}
         />
         <Tab.Screen
            name="Billing"
            component={BillingScreen}
            options={{
              title: 'Billing',
              tabBarButton: () => null,
            }}
          />
          <Tab.Screen
            name="CashJournal"
            component={CashJournalScreen}
            options={{
              title: 'Cash Journal',
              tabBarButton: () => null,
            }}
          />
          <Tab.Screen
            name="BankJournal"
            component={BankJournalScreen}
            options={{
              title: 'Bank Journal',
              tabBarButton: () => null,
            }}
          />
          <Tab.Screen
            name="CCJournal"
            component={CCJournalScreen}
            options={{
              title: 'CC Journal',
              tabBarButton: () => null,
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
     </>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};