import React, { useEffect, useState } from 'react';
import { Animated, Image } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import CustomLinearGradient from '../components/CustomLinearGradient';
// import Icon from './Icon';

// type SplashScreenStackParamList = {
//   Home: undefined; // No parameters expected for the Home screen
//   // ... other screens in the stack
// };

// type SplashScreenNavigationProp = StackNavigationProp<SplashScreenStackParamList, 'Home'>;

// type SplashScreenRouteProp = RouteProp<SplashScreenStackParamList, 'Home'>;

// interface SplashScreenProps {
//   navigation: SplashScreenNavigationProp;
//   route: SplashScreenRouteProp;
//   // ... other props specific to this screen
// }

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
        }, 3000); // Start the animation after 3 seconds

        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, [navigation, fadeAnim]); // Add fadeAnim to dependency array

    return (
        <CustomLinearGradient>
            <Animated.View style={{ ...GlobalStyles.container, opacity: fadeAnim }}>
                <Image
                    source={require('../assets/logos/logo.png')}
                    style={GlobalStyles.imageLogo}
                />
            </Animated.View>
        </CustomLinearGradient>
    );
};

export default SplashScreen;
