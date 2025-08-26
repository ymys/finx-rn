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
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface FloatingSettingsMenuProps {
  visible: boolean;
  onClose: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const FloatingSettingsMenu: React.FC<FloatingSettingsMenuProps> = ({
  visible,
  onClose,
}) => {
  const { theme } = useTheme();
  const { logout } = useAuth();
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
  }, [visible]);

  const handleSettingPress = (settingType: string) => {
    switch (settingType) {
      case 'profile':
        Alert.alert('Profile', 'Profile settings coming soon!');
        break;
      case 'coa':
        Alert.alert('COA', 'Chart of Accounts management coming soon!');
        break;
      case 'billing':
        Alert.alert('Billing', 'Billing settings coming soon!');
        break;
      case 'logout':
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
              onPress: () => {
                logout();
                onClose();
              },
            },
          ]
        );
        break;
      default:
        break;
    }
    if (settingType !== 'logout') {
      onClose();
    }
  };

  const settingsOptions = [
    {
      id: 'profile',
      title: 'Profile',
      icon: 'person-outline',
      color: '#4A90E2',
    },
    {
      id: 'coa',
      title: 'COA',
      icon: 'list-outline',
      color: '#7B68EE',
    },
    {
      id: 'billing',
      title: 'Billing',
      icon: 'card-outline',
      color: '#50C878',
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: 'log-out-outline',
      color: '#FF6B6B',
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
        <View style={[styles.menuHeader, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.menuTitle, { color: theme.colors.primaryText }]}>
            Settings
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="close" size={24} color={theme.colors.primaryText} />
          </TouchableOpacity>
        </View>
        <View style={styles.menuItems}>
          {settingsOptions.map((option, index) => (
            <Animated.View
              key={option.id}
              style={{
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => handleSettingPress(option.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: `${option.color}20` },
                  ]}
                >
                  <Icon name={option.icon} size={20} color={option.color} />
                </View>
                <Text style={[styles.menuItemText, { color: theme.colors.primaryText }]}>
                  {option.title}
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