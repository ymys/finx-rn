import { DIRECTUS_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Validate environment variables
if (!DIRECTUS_URL) {
  console.error('DIRECTUS_URL is not defined in environment variables');
  throw new Error('DIRECTUS_URL is required');
}

console.log('Directus URL:', DIRECTUS_URL);

// Define authentication response interface
interface AuthResponse {
  data: {
    expires: number;
    refresh_token: string;
    access_token: string;
  };
}

// Define user interface
interface DirectusUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  role?: string;
}

// Token storage keys
const ACCESS_TOKEN_KEY = 'directus_access_token';
const REFRESH_TOKEN_KEY = 'directus_refresh_token';
const TOKEN_EXPIRES_KEY = 'directus_token_expires';

// HTTP-based Directus authentication service
export const directusAuth = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      console.log('Attempting Directus login for:', email);
      console.log('Using Directus URL:', DIRECTUS_URL);
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      console.log('Login response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Login failed with status:', response.status, errorText);
        
        if (response.status === 401) {
          throw new Error('Invalid email or password');
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(`Login failed: ${response.statusText}`);
        }
      }
      
      const result: AuthResponse = await response.json();
      console.log('Directus login successful:', {
        expires: result.data.expires,
        hasAccessToken: !!result.data.access_token,
        hasRefreshToken: !!result.data.refresh_token,
      });
      
      // Store tokens
      await this.storeTokens(result.data);
      
      return result;
    } catch (error: any) {
      console.error('Directus login error details:', {
        message: error?.message,
        status: error?.status,
        stack: error?.stack
      });
      
      if (error.message) {
        throw error;
      } else {
        throw new Error('Network error. Please check your internet connection.');
      }
    }
  },

  async storeTokens(tokens: AuthResponse['data']) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
      
      // Calculate expiry time
      const expiryTime = Date.now() + (tokens.expires * 1000);
      await AsyncStorage.setItem(TOKEN_EXPIRES_KEY, expiryTime.toString());
      
      console.log('Tokens stored successfully');
    } catch (error) {
      console.error('Failed to store tokens:', error);
    }
  },

  async getAccessToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      const expiryTime = await AsyncStorage.getItem(TOKEN_EXPIRES_KEY);
      
      if (!token || !expiryTime) {
        return null;
      }
      
      // Check if token is expired
      if (Date.now() > parseInt(expiryTime)) {
        console.log('Access token expired');
        await this.clearTokens();
        return null;
      }
      
      return token;
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  },

  async getCurrentUser(): Promise<DirectusUser | null> {
    try {
      const token = await this.getAccessToken();
      
      if (!token) {
        console.log('No valid access token available');
        return null;
      }
      
      const response = await fetch(`${DIRECTUS_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.error('Failed to get current user:', response.status);
        if (response.status === 401) {
          await this.clearTokens();
        }
        return null;
      }
      
      const result = await response.json();
      console.log('Current user fetched successfully:', result.data?.email);
      
      return result.data;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  async logout() {
    try {
      const token = await this.getAccessToken();
      
      if (token) {
        // Attempt to logout from server
        try {
          await fetch(`${DIRECTUS_URL}/auth/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.log('Server logout failed, continuing with local logout:', error);
        }
      }
      
      // Clear local tokens
      await this.clearTokens();
      console.log('Logout completed');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear tokens even if server logout fails
      await this.clearTokens();
    }
  },

  async clearTokens() {
    try {
      await AsyncStorage.multiRemove([
        ACCESS_TOKEN_KEY,
        REFRESH_TOKEN_KEY,
        TOKEN_EXPIRES_KEY,
      ]);
      console.log('Tokens cleared');
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  },

  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
      
      if (!refreshToken) {
        console.log('No refresh token available');
        return false;
      }
      
      const response = await fetch(`${DIRECTUS_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      });
      
      if (!response.ok) {
        console.error('Token refresh failed:', response.status);
        await this.clearTokens();
        return false;
      }
      
      const result: AuthResponse = await response.json();
      await this.storeTokens(result.data);
      
      console.log('Token refreshed successfully');
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      await this.clearTokens();
      return false;
    }
  },
};

export default directusAuth;