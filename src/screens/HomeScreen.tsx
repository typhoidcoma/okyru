import React from 'react';
import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconButton from '../components/IconButton';
import StartButton from '../components/StartButton';
import Icon from '../components/Icon';
const HomeScreen = () => {
  return (
    <LinearGradient colors={['#EBF3FA', '#DDE7F3', '#E5F0F9']} style={styles.container}>
      <IconButton
        svgIconName="26_Menu"
        width={64}
        height={64}
        onPress={() => console.log('Button pressed')}
      />
      <StartButton onPress={() => console.log('Start button pressed')} />
      <Text style={styles.text}>okyru</Text>
      <Icon iconName="26_Menu" size={64} color="red" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Nirmala', // <- Use the exact name from the font file
    fontSize: 24,
    color: '#EA0008',
  },
  customFont: {
    fontFamily: 'roboto', // <- Use the exact name from the font file
    fontSize: 24,
    color: '#EA0008',
  },
});

export default HomeScreen;
