/**
 * SplashScreen Component.
 *
 * This component displays a splash screen with the app's logo fading out using animation.
 *
 * @file SplashScreen.tsx
 * @component
 * @param {object} props - Props for the SplashScreen component
 * @param {object} props.navigation - Navigation object for navigating between screens
 * @returns {JSX.Element} A JSX element representing the SplashScreen component
 * @example
 * <SplashScreen navigation={navigation} />
 */

import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import CustomLinearGradient from '../components/CustomLinearGradient';
import OkyruLogo from '../components/OkyruLogo';

const SplashScreen: React.FC<any> = ({ navigation }) => {
    const [fadeAnim] = useState(new Animated.Value(1)); // Initial value for opacity: 1

    useEffect(() => {
        // Start the fade-out animation after a delay
        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true, // Add useNativeDriver for better performance
            }).start(() => navigation.replace('Home')); // Navigate to 'Home' after animation ends
        }, 5000); // Start the animation after 3 seconds

        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, [navigation, fadeAnim]); // Add fadeAnim to dependency array

    return (
        <CustomLinearGradient>
            <Animated.View style={{ ...GlobalStyles.container, opacity: fadeAnim }}>
                <OkyruLogo />
            </Animated.View>
        </CustomLinearGradient>
    );
};

export default SplashScreen;
