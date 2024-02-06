import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import IconTestScreen from './src/screens/IconTestScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { IconProvider } from './src/components/IconProvider';
// import { LightTheme } from './src/styles/Theme';

const Stack = createStackNavigator();

const App = () => {
    return (
        <IconProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash">
                    <Stack.Screen
                        name="Splash"
                        component={SplashScreen}
                        options={{ headerShown: false, cardStyle: { backgroundColor: 'red' } }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false, cardStyle: { backgroundColor: 'red' } }}
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
