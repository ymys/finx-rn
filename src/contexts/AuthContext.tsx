import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  provider: 'google' | 'email';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  loginWithGoogle: (userInfo: any) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Configure Google Sign-In first
    GoogleSignin.configure({
      webClientId: '842989478300-c68a4ft3cft5uj1pr927f0pffhv206m0.apps.googleusercontent.com', // Dev Web Client ID
      offlineAccess: true,
      hostedDomain: '',
      forceCodeForRefreshToken: true,
    });
    
    // Then check if user is already signed in
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      
      // Check AsyncStorage for saved user
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
      
      // Add delay to ensure Android activity is ready before Google Sign-In operations
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if Google user is still signed in (with error handling)
      try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          const userInfo = await GoogleSignin.signInSilently();
          if (userInfo && !savedUser) {
            await loginWithGoogle(userInfo);
          }
        }
      } catch (googleError: any) {
        // Handle Google Sign-In specific errors silently
        if (googleError.message && googleError.message.includes('activity is null')) {
          console.log('Google Sign-In not ready yet, skipping silent sign-in');
        } else {
          console.log('Google Sign-In check error:', googleError);
        }
      }
    } catch (error) {
      console.log('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const loginWithGoogle = async (userInfo: any) => {
    try {
      console.log('Google userInfo structure:', JSON.stringify(userInfo, null, 2));
      
      const user: User = {
        id: userInfo.user?.id || userInfo.user?.email || 'unknown',
        name: userInfo.user?.name || userInfo.user?.givenName + ' ' + userInfo.user?.familyName || 'Unknown User',
        email: userInfo.user?.email || '',
        photo: userInfo.user?.photo || userInfo.user?.photoURL || undefined,
        provider: 'google',
      };
      
      // Save user to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Login with Google error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Sign out from Google (with error handling)
      try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          await GoogleSignin.signOut();
        }
      } catch (googleError: any) {
        // Handle Google Sign-In specific errors silently
        if (googleError.message && googleError.message.includes('activity is null')) {
          console.log('Google Sign-In not ready for logout, continuing with local logout');
        } else {
          console.log('Google Sign-Out error:', googleError);
        }
      }
      
      // Clear AsyncStorage
      await AsyncStorage.removeItem('user');
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        loginWithGoogle, 
        logout, 
        isLoading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};