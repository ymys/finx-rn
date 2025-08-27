import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface FloatingSettingsMenuProps {
  visible: boolean;
  onClose: () => void;
  navigation?: any;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const FloatingSettingsMenu: React.FC<FloatingSettingsMenuProps> = ({
  visible,
  onClose,
  navigation,
}) => {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const nav = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 100,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim, scaleAnim]);

  const handleSettingsPress = (settingType: string) => {
    if (settingType === 'Profile') {
      onClose();
      // Navigate to Profile tab screen
      nav.navigate('Profile' as never);
    } else if (settingType === 'COA') {
      onClose();
      // Navigate to COA tab screen
      nav.navigate('COA' as never);
    } else if (settingType === 'Billing') {
      onClose();
      // Navigate to Billing tab screen
      nav.navigate('Billing' as never);
    } else if (settingType === 'Logout') {
      // Add a small delay to ensure Activity is ready
      setTimeout(() => {
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Logout',
              style: 'destructive',
              onPress: async () => {
                try {
                  await logout();
                  onClose();
                } catch (error) {
                  console.log('Logout failed:', error);
                }
              },
            },
          ]
        );
      }, 100);
    } else {
      Alert.alert('Settings', `You selected ${settingType}`);
      onClose();
    }
  };

  const menuItems = [
    {
      title: 'Profile',
      icon: 'person-outline',
      color: '#2196F3',
      onPress: () => handleSettingsPress('Profile'),
    },
    {
      title: 'COA',
      icon: 'list-outline',
      color: '#4CAF50',
      onPress: () => handleSettingsPress('COA'),
    },
    {
      title: 'Billing',
      icon: 'card-outline',
      color: '#FF9800',
      onPress: () => handleSettingsPress('Billing'),
    },
    {
      title: 'Logout',
      icon: 'log-out-outline',
      color: '#F44336',
      onPress: () => handleSettingsPress('Logout'),
    },
  ];

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      
      <Animated.View
        style={[
          styles.menuContainer,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        <View style={styles.menuHeader}>
          <Text style={[styles.menuTitle, { color: theme.colors.primaryText }]}>
            Settings
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuItems}>
          {menuItems.map((item, index) => (
            <Animated.View
              key={item.title}
              style={{
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: [0, 50 * (index + 1)],
                    }),
                  },
                ],
                opacity: fadeAnim,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                  <Icon name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={[styles.menuItemText, { color: theme.colors.primaryText }]}>
                  {item.title}
                </Text>
                <Icon name="chevron-forward" size={20} color={theme.colors.secondaryText} />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    marginHorizontal: 16,
    marginBottom: 104, // Above the tab bar (88px height + 16px margin)
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  menuItems: {
    padding: 16,
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});