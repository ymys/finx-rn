import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

interface GoogleSignInButtonProps {
  onSignInSuccess: (userInfo: any) => void;
  onSignInError?: (error: any) => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSignInSuccess,
  onSignInError,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  // Google Sign-In is now configured in AuthContext

  const signIn = async () => {
    try {
      setIsLoading(true);
      
      // Add a small delay to ensure Android activity is ready
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if Google Play Services are available
      const hasPlayServices = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      
      if (!hasPlayServices) {
        Alert.alert('Error', 'Google Play Services not available');
        return;
      }
      
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In Success:', userInfo);
      onSignInSuccess(userInfo);
    } catch (error: any) {
      console.log('Google Sign-In Error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play services not available');
      } else if (error.message && error.message.includes('activity is null')) {
        console.log('Activity not ready, please try again');
        // Don't show alert for activity null error as it's a timing issue
      } else {
        Alert.alert('Error', 'Something went wrong with Google Sign-In');
      }
      
      if (onSignInError) {
        onSignInError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Custom Continue with Google Button */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={signIn}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <View style={styles.googleButtonContent}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#4285F4" />
          ) : (
            <>
              {/* Google Logo SVG */}
              <View style={styles.googleLogo}>
                <Text style={styles.googleLogoText}>G</Text>
              </View>
              <Text style={styles.googleButtonText}>
                Continue with Google
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>

      {/* Alternative: Use the official GoogleSigninButton */}
      {/* 
      <GoogleSigninButton
        style={styles.officialButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signIn}
        disabled={isLoading}
      />
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DADCE0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogo: {
    width: 20,
    height: 20,
    backgroundColor: '#4285F4',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  googleLogoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  googleButtonText: {
    color: '#3C4043',
    fontSize: 16,
    fontWeight: '500',
  },
  officialButton: {
    width: 280,
    height: 48,
  },
});

export default GoogleSignInButton;