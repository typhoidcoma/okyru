import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
// import Icon from './Icon';

type SplashScreenStackParamList = {
  Home: undefined; // No parameters expected for the Home screen
  // ... other screens in the stack
};

type SplashScreenNavigationProp = StackNavigationProp<SplashScreenStackParamList, 'Home'>;

type SplashScreenRouteProp = RouteProp<SplashScreenStackParamList, 'Home'>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
  route: SplashScreenRouteProp; // If you need to use the route prop
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(1)); // Initial value for opacity: 1

  useEffect(() => {
    // Start the fade-out animation after a delay
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true, // Add useNativeDriver for better performance
      }).start(() => navigation.replace('Home')); // Navigate to 'Home' after animation ends
    }, 3000); // Start the animation after 3 seconds

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]); // Add fadeAnim to dependency array

  return (
    <LinearGradient colors={['#F1F5F8', '#DDE7F3', '#E5F0F9']} style={styles.container}>
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
        <Image source={require('../assets/logos/logo.png')} style={styles.image} />
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: 250, // Or the size you want
    height: 250, // Or the size you want
    marginBottom: 20,
  },
});

export default SplashScreen;
