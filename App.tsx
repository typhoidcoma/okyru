import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import IconTestScreen from './src/screens/IconTestScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { IconProvider } from './src/components/IconProvider';
import { RootStackParamList } from './src/navigation/types';
// import { LightTheme } from './src/styles/Theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <IconProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash">
                    <Stack.Screen
                        name="Splash"
                        component={SplashScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Icon Test Screen"
                        component={IconTestScreen}
                        options={{ headerShown: true }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </IconProvider>
    );
};

export default App;
