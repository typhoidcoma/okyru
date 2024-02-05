import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import IconTestScreen from './src/screens/IconTestScreen';
import { IconProvider } from './src/components/IconProvider';
import { LightTheme } from './src/styles/Theme';

const Stack = createStackNavigator();

const App = () => {
    return (
        <IconProvider>
            <NavigationContainer theme={LightTheme}>
                <Stack.Navigator initialRouteName="Splash">
                    <Stack.Screen
                        name="Splash"
                        component={SplashScreen}
                        options={{ headerShown: false, cardStyle: { backgroundColor: 'red' } }} // This removes the header
                    />
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false, cardStyle: { backgroundColor: 'red' } }} // This removes the header
                    />
                    <Stack.Screen
                        name="Icon Test Screen"
                        component={IconTestScreen}
                        options={{ headerShown: true }} // This removes the header
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </IconProvider>
    );
};
export default App;
