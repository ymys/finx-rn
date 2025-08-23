import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'light' | 'dark';

interface ThemeColors {
  // Background colors
  background: string;
  surface: string;
  glassEffect: string;
  border: string;
  
  // Text colors
  primaryText: string;
  secondaryText: string;
  
  // Accent colors
  primary: string;
  limeGlow: string;
  glowShadow: string;
  largeGlowShadow: string;
  
  // Status colors
  success: string;
  error: string;
  warning: string;
  info: string;
  
  // Utility colors
  glassShadow: string;
  modalOverlay: string;
  contrast: string;
}

interface Theme {
  colors: ThemeColors;
  isDark: boolean;
}

const lightTheme: Theme = {
  colors: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    glassEffect: 'rgba(0, 0, 0, 0.05)',
    border: 'rgba(0, 0, 0, 0.1)',
    primaryText: '#1A1A1A',
    secondaryText: '#6B7280',
    primary: '#65A30D',
    limeGlow: 'rgba(225, 252, 2, 0.2)',
    glowShadow: 'rgba(225, 252, 2, 0.3)',
    largeGlowShadow: 'rgba(225, 252, 2, 0.4)',
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#007bff',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    modalOverlay: 'rgba(0, 0, 0, 0.5)',
    contrast: '#FFFFFF',
  },
  isDark: false,
};

const darkTheme: Theme = {
  colors: {
    background: '#0D1412',
    surface: '#1A1F1D',
    glassEffect: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
    primaryText: '#E8E8E8',
    secondaryText: '#A0A0A0',
    primary: '#65A30D',
    limeGlow: 'rgba(225, 252, 2, 0.2)',
    glowShadow: 'rgba(225, 252, 2, 0.3)',
    largeGlowShadow: 'rgba(225, 252, 2, 0.4)',
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#007bff',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    modalOverlay: 'rgba(0, 0, 0, 0.5)',
    contrast: '#000000',
  },
  isDark: true,
};

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@finx_theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [systemColorScheme, setSystemColorScheme] = useState<ColorScheme>(
    Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'
  );

  // Load saved theme mode from storage
  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
          setThemeModeState(savedMode as ThemeMode);
        }
      } catch (error) {
        console.error('Error loading theme mode:', error);
      }
    };
    loadThemeMode();
  }, []);

  // Listen to system color scheme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme === 'dark' ? 'dark' : 'light');
    });

    return () => subscription?.remove();
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  };

  const toggleTheme = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setThemeMode(modes[nextIndex]);
  };

  // Determine the actual theme to use
  const getActiveTheme = (): Theme => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark' ? darkTheme : lightTheme;
    }
    return themeMode === 'dark' ? darkTheme : lightTheme;
  };

  const theme = getActiveTheme();

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        setThemeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { lightTheme, darkTheme };
export type { Theme, ThemeColors };