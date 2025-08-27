import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { directusAuth } from '../services';

interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  title?: string;
  description?: string;
  location?: string;
  language?: string;
  last_access?: string;
  role?: string;
  status?: string;
  provider?: string;
}

export const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // If user is logged in with Google, use their basic info
      if (user?.provider === 'google') {
        setProfile({
          id: user.id,
          email: user.email,
          first_name: user.name.split(' ')[0] || '',
          last_name: user.name.split(' ').slice(1).join(' ') || '',
          provider: 'google',
        } as UserProfile);
        setLoading(false);
        return;
      }
      
      // For email users, try to fetch from Directus
      try {
        const userProfile = await directusAuth.getCurrentUser();
        if (userProfile) {
          setProfile(userProfile as UserProfile);
        } else {
          // Fallback to basic user info if Directus profile doesn't exist
          setProfile({
            id: user?.id || 'unknown',
            email: user?.email || '',
            first_name: user?.name?.split(' ')[0] || '',
            last_name: user?.name?.split(' ').slice(1).join(' ') || '',
            provider: user?.provider || 'email',
          } as UserProfile);
        }
      } catch (directusError) {
        console.log('Directus profile fetch failed, using basic user info:', directusError);
        // Fallback to basic user info
        setProfile({
          id: user?.id || 'unknown',
          email: user?.email || '',
          first_name: user?.name?.split(' ')[0] || '',
          last_name: user?.name?.split(' ').slice(1).join(' ') || '',
          provider: user?.provider || 'email',
        } as UserProfile);
      }
    } catch (error: any) {
      console.error('Profile fetch error:', error);
      setError(error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const getDisplayName = () => {
    if (profile?.first_name || profile?.last_name) {
      return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    }
    return user?.name || 'User';
  };

  const getAvatarSource = () => {
    if (profile?.avatar) {
      return { uri: profile.avatar };
    }
    if (user?.photo) {
      return { uri: user.photo };
    }
    return null;
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.secondaryText }]}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={48} color={theme.colors.error} />
          <Text style={[styles.errorTitle, { color: theme.colors.error }]}>Error</Text>
          <Text style={[styles.errorMessage, { color: theme.colors.secondaryText }]}>{error}</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
            onPress={fetchUserProfile}
          >
            <Text style={[styles.retryButtonText, { color: theme.colors.contrast }]}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <View style={styles.avatarContainer}>
            {getAvatarSource() ? (
              <Image source={getAvatarSource()!} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: theme.colors.primary }]}>
                <Icon name="person" size={40} color={theme.colors.contrast} />
              </View>
            )}
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={[styles.displayName, { color: theme.colors.primaryText }]}>
              {getDisplayName()}
            </Text>
            {profile?.title && (
              <Text style={[styles.title, { color: theme.colors.secondaryText }]}>
                {profile.title}
              </Text>
            )}
            <Text style={[styles.email, { color: theme.colors.primary }]}>
              {profile?.email || user?.email}
            </Text>
            {profile?.description && (
              <Text style={[styles.description, { color: theme.colors.secondaryText }]}>
                {profile.description}
              </Text>
            )}
          </View>
        </View>

        {/* Profile Details */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>Personal Information</Text>
          
          <View style={styles.infoRow}>
            <Icon name="person-outline" size={20} color={theme.colors.secondaryText} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Full Name</Text>
              <Text style={[styles.infoValue, { color: theme.colors.primaryText }]}>
                {getDisplayName()}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Icon name="mail-outline" size={20} color={theme.colors.secondaryText} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Email</Text>
              <Text style={[styles.infoValue, { color: theme.colors.primaryText }]}>
                {profile?.email || user?.email || 'N/A'}
              </Text>
            </View>
          </View>

          {profile?.location && (
            <View style={styles.infoRow}>
              <Icon name="location-outline" size={20} color={theme.colors.secondaryText} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Location</Text>
                <Text style={[styles.infoValue, { color: theme.colors.primaryText }]}>
                  {profile.location}
                </Text>
              </View>
            </View>
          )}

          {profile?.language && (
            <View style={styles.infoRow}>
              <Icon name="language-outline" size={20} color={theme.colors.secondaryText} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Language</Text>
                <Text style={[styles.infoValue, { color: theme.colors.primaryText }]}>
                  {profile.language}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Account Details */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryText }]}>Account Details</Text>
          
          <View style={styles.infoRow}>
            <Icon name="shield-outline" size={20} color={theme.colors.secondaryText} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Account ID</Text>
              <Text style={[styles.infoValue, { color: theme.colors.primaryText }]}>
                {profile?.id || user?.id || 'N/A'}
              </Text>
            </View>
          </View>

          {profile?.role && (
            <View style={styles.infoRow}>
              <Icon name="person-circle-outline" size={20} color={theme.colors.secondaryText} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Role</Text>
                <Text style={[styles.infoValue, { color: theme.colors.primaryText }]}>
                  {profile.role}
                </Text>
              </View>
            </View>
          )}

          {profile?.provider && (
            <View style={styles.infoRow}>
              <Icon name="link-outline" size={20} color={theme.colors.secondaryText} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Provider</Text>
                <Text style={[styles.infoValue, { color: theme.colors.primaryText }]}>
                  {profile.provider}
                </Text>
              </View>
            </View>
          )}

          {profile?.status && (
            <View style={styles.infoRow}>
              <Icon name="checkmark-circle-outline" size={20} color={theme.colors.secondaryText} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Status</Text>
                <Text style={[styles.infoValue, { color: theme.colors.primaryText }]}>
                  {profile.status}
                </Text>
              </View>
            </View>
          )}

          {profile?.last_access && (
            <View style={styles.infoRow}>
              <Icon name="time-outline" size={20} color={theme.colors.secondaryText} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Last Access</Text>
                <Text style={[styles.infoValue, { color: theme.colors.primaryText }]}>
                  {formatDate(profile.last_access)}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  profileHeader: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  displayName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});