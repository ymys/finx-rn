/**
 * Finx Portfolio Mobile App
 * A React Native app for portfolio management
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { LoginScreen, SplashScreen } from './src/screens';

const AppContent: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simulate app initialization time
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash || !appReady) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={login} />;
  }

  return <AppNavigator />;
};

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
