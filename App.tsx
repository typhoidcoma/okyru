import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';
import { IconProvider } from './src/components/IconProvider';

const Stack = createStackNavigator();

const App = () => {
  return (
    <IconProvider>
      <LinearGradient colors={['#EBF3FA', '#DDE7F3', '#E5F0F9']} style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }} // This removes the header
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }} // This removes the header
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LinearGradient>
    </IconProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
export default App;
