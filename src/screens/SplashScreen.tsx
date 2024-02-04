import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Animated, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OkyruLogo from '../components/OkyruLogo'; // Import the okyruLogo component
const SplashScreen = ({ navigation }: { navigation: any }) => {
  const [fadeAnim] = useState(new Animated.Value(1)); // Initial value for opacity: 1

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => navigation.replace('Home')); // Start the animation
    }, 2000); // Wait for 3000 milliseconds = 3 seconds

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <LinearGradient colors={['#EBF3FA', '#DDE7F3', '#E5F0F9']} style={styles.container}>
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
        <Text style={styles.text}>Splash Screen</Text>
        <OkyruLogo />
        <Image source={require('../assets/logos/logo.png')} style={styles.image} />
        <Text style={styles.text}>Splash Screen</Text>
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
  text: {
    fontSize: 24,
  },
});

export default SplashScreen;
