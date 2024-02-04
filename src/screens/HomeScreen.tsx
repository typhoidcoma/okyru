import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconButton from '../components/IconButton';
import StartButton from '../components/StartButton';
import Icon from '../components/Icon';
const HomeScreen = () => {
  return (
    <LinearGradient colors={['#EBF3FA', '#DDE7F3', '#E5F0F9']} style={styles.container}>
      <IconButton onPress={() => console.log('Button pressed')} />
      <StartButton onPress={() => console.log('Start button pressed')} />
      <Icon iconName="01_run" size={48} color="blue" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 24,
  },
});

export default HomeScreen;
