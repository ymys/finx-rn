import AsyncStorage from '@react-native-async-storage/async-storage';

const DIRECTUS_URL = 'https://adminfinx.goyong.in';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  expires: number;
  refresh_token: string;
}

interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  role?: string;
}

interface LoginResult {
  success: boolean;
  user?: UserProfile;
  tokens?: AuthResponse;
  error?: string;
}

class AuthService {
  private static readonly TOKEN_KEY = '@finx_access_token';
  private static readonly REFRESH_TOKEN_KEY = '@finx_refresh_token';
  private static readonly EXPIRES_KEY = '@finx_token_expires';
  private static readonly USER_KEY = '@finx_user_profile';

  async login(credentials: LoginCredentials): Promise<LoginResult> {
    try {
      // Step 1: Authenticate with email/password
      const loginResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        return {
          success: false,
          error: errorData.errors?.[0]?.message || 'Login failed',
        };
      }

      const authData: { data: AuthResponse } = await loginResponse.json();
      const tokens = authData.data;

      // Step 2: Get user profile
      const profileResponse = await fetch(`${DIRECTUS_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!profileResponse.ok) {
        return {
          success: false,
          error: 'Failed to fetch user profile',
        };
      }

      const profileData: { data: UserProfile } = await profileResponse.json();
      const user = profileData.data;

      // Step 3: Store tokens and user data
      await this.storeAuthData(tokens, user);

      return {
        success: true,
        user,
        tokens,
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      const refreshToken = await AsyncStorage.getItem(AuthService.REFRESH_TOKEN_KEY);
      
      if (refreshToken) {
        // Attempt to logout on server
        await fetch(`${DIRECTUS_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of server response
      await this.clearAuthData();
    }
  }

  async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = await AsyncStorage.getItem(AuthService.REFRESH_TOKEN_KEY);
      
      if (!refreshToken) {
        return null;
      }

      const response = await fetch(`${DIRECTUS_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        await this.clearAuthData();
        return null;
      }

      const data: { data: AuthResponse } = await response.json();
      const tokens = data.data;

      // Update stored tokens
      await AsyncStorage.setItem(AuthService.TOKEN_KEY, tokens.access_token);
      await AsyncStorage.setItem(AuthService.REFRESH_TOKEN_KEY, tokens.refresh_token);
      await AsyncStorage.setItem(AuthService.EXPIRES_KEY, tokens.expires.toString());

      return tokens.access_token;
    } catch (error) {
      console.error('Token refresh error:', error);
      await this.clearAuthData();
      return null;
    }
  }

  async getValidAccessToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(AuthService.TOKEN_KEY);
      const expiresStr = await AsyncStorage.getItem(AuthService.EXPIRES_KEY);
      
      if (!token || !expiresStr) {
        return null;
      }

      const expires = parseInt(expiresStr, 10);
      const now = Date.now();
      
      // Check if token is expired (with 5 minute buffer)
      if (now >= (expires - 300000)) {
        return await this.refreshAccessToken();
      }

      return token;
    } catch (error) {
      console.error('Get valid token error:', error);
      return null;
    }
  }

  async getStoredUser(): Promise<UserProfile | null> {
    try {
      const userStr = await AsyncStorage.getItem(AuthService.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Get stored user error:', error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getValidAccessToken();
    return token !== null;
  }

  private async storeAuthData(tokens: AuthResponse, user: UserProfile): Promise<void> {
    await Promise.all([
      AsyncStorage.setItem(AuthService.TOKEN_KEY, tokens.access_token),
      AsyncStorage.setItem(AuthService.REFRESH_TOKEN_KEY, tokens.refresh_token),
      AsyncStorage.setItem(AuthService.EXPIRES_KEY, tokens.expires.toString()),
      AsyncStorage.setItem(AuthService.USER_KEY, JSON.stringify(user)),
    ]);
  }

  private async clearAuthData(): Promise<void> {
    await Promise.all([
      AsyncStorage.removeItem(AuthService.TOKEN_KEY),
      AsyncStorage.removeItem(AuthService.REFRESH_TOKEN_KEY),
      AsyncStorage.removeItem(AuthService.EXPIRES_KEY),
      AsyncStorage.removeItem(AuthService.USER_KEY),
    ]);
  }

  // Helper method for making authenticated API calls
  async makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const token = await this.getValidAccessToken();
    
    if (!token) {
      throw new Error('No valid access token available');
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
}

export const authService = new AuthService();
export type { LoginCredentials, UserProfile, LoginResult };