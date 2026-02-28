import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import IconTestScreen from './src/screens/IconTestScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ExercisesScreen from './src/screens/ExercisesScreen';
import StatsScreen from './src/screens/StatsScreen';
import { IconProvider } from './src/components/IconProvider';
import { RootStackParamList } from './src/navigation/types';
// import { LightTheme } from './src/styles/Theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <IconProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Splash"
                    screenOptions={{
                        animation: 'none',
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Splash" component={SplashScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Icon Test Screen" component={IconTestScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                    <Stack.Screen name="Exercises" component={ExercisesScreen} />
                    <Stack.Screen name="Stats" component={StatsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </IconProvider>
    );
};

export default App;
