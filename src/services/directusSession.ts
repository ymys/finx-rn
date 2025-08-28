import { DIRECTUS_URL } from '@env';

// Validate environment variables
if (!DIRECTUS_URL) {
  console.error('DIRECTUS_URL is not defined in environment variables');
  throw new Error('DIRECTUS_URL is required');
}

console.log('Directus URL:', DIRECTUS_URL);

// Define user interface
interface DirectusUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  role?: string;
}

// Session-based Directus authentication service
export const directusSessionAuth = {
  async login(email: string, password: string): Promise<DirectusUser> {
    try {
      console.log('Attempting Directus session login for:', email);
      console.log('Using Directus URL:', DIRECTUS_URL);
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This enables session cookies
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      console.log('Login response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Login failed:', errorData);
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Login successful, session established');
      
      // Get user info immediately after login
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error('Failed to get user information after login');
      }
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async loginWithGoogle(googleToken: string): Promise<DirectusUser> {
    try {
      console.log('Attempting Directus Google SSO login');
      
      const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This enables session cookies
        body: JSON.stringify({
          provider: 'google',
          access_token: googleToken,
          email: this.extractEmailFromToken(googleToken),
        }),
      });
      
      console.log('Google SSO response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Google SSO failed:', errorData);
        throw new Error(`Google SSO failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Google SSO successful, session established');
      
      // Get user info immediately after login
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error('Failed to get user information after Google SSO');
      }
      
      return user;
    } catch (error) {
      console.error('Google SSO error:', error);
      throw error;
    }
  },

  async getCurrentUser(): Promise<DirectusUser | null> {
    try {
      console.log('Getting current user with session');
      
      const response = await fetch(`${DIRECTUS_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This sends session cookies
      });
      
      console.log('Get user response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 401) {
          console.log('User not authenticated (401)');
          return null;
        }
        const errorData = await response.text();
        console.error('Get user failed:', errorData);
        throw new Error(`Get user failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('User data retrieved:', data.data);
      
      return data.data;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  async logout(): Promise<void> {
    try {
      console.log('Logging out with session');
      
      const response = await fetch(`${DIRECTUS_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This sends session cookies
      });
      
      console.log('Logout response status:', response.status);
      
      if (!response.ok) {
        console.warn('Logout request failed, but continuing with local cleanup');
      }
      
      console.log('Logout successful, session cleared');
    } catch (error) {
      console.error('Logout error:', error);
      // Don't throw error for logout, just log it
    }
  },

  async checkSession(): Promise<DirectusUser | null> {
    try {
      console.log('Checking existing session');
      
      // Try to get current user to check if session is valid
      const user = await this.getCurrentUser();
      
      if (user) {
        console.log('Valid session found for user:', user.email);
        return user;
      } else {
        console.log('No valid session found');
        return null;
      }
    } catch (error) {
      console.error('Session check error:', error);
      return null;
    }
  },

  async refreshSession(): Promise<DirectusUser | null> {
    try {
      console.log('Attempting to refresh session');
      
      const response = await fetch(`${DIRECTUS_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This sends session cookies
      });
      
      console.log('Refresh response status:', response.status);
      
      if (!response.ok) {
        console.log('Session refresh failed');
        return null;
      }
      
      console.log('Session refreshed successfully');
      
      // Get updated user info
      return await this.getCurrentUser();
    } catch (error) {
      console.error('Session refresh error:', error);
      return null;
    }
  },

  extractEmailFromToken(token: string): string | null {
    try {
      // JWT tokens have 3 parts separated by dots
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error('Invalid JWT token format');
        return null;
      }
      
      // Decode the payload (second part)
      const payload = parts[1];
      // Add padding if needed for base64 decoding
      const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
      
      // Decode base64
      const decodedPayload = atob(paddedPayload);
      const payloadObj = JSON.parse(decodedPayload);
      
      console.log('Extracted email from JWT:', payloadObj.email);
      return payloadObj.email || null;
    } catch (error) {
      console.error('Failed to extract email from JWT token:', error);
      return null;
    }
  },
};

export default directusSessionAuth;