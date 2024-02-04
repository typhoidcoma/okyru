import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface IconButtonProps {
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ onPress }) => {
  const [buttonState, setButtonState] = useState<'hover' | 'press' | 'inactive'>('inactive');

  const handlePressIn = () => {
    setButtonState('press');
  };

  const handlePressOut = () => {
    setButtonState('hover');
  };

  const handlePress = () => {
    setButtonState('press');
    onPress();
  };

  const handleBlur = () => {
    setButtonState('inactive');
  };

  const getButtonImage = () => {
    switch (buttonState) {
      case 'hover':
        return require('../assets/button_hover.png'); // Replace with your image path
      case 'press':
        return require('../assets/button_press.png'); // Replace with your image path
      default:
        return require('../assets/button_inactive.png'); // Replace with your image path
    }
  };

  const getButtonIcon = () => {
    switch (buttonState) {
      case 'hover':
        return require('../assets/icon_hover.svg'); // Replace with your SVG icon path
      case 'press':
        return require('../assets/icon_press.svg'); // Replace with your SVG icon path
      default:
        return require('../assets/icon_inactive.svg'); // Replace with your SVG icon path
    }
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      onBlur={handleBlur}
      activeOpacity={1} // To disable default opacity change on press
    >
      <View style={styles.buttonContainer}>
        <SvgXml xml={getButtonIcon()} width="24" height="24" /> {/* SVG icon */}
        <Text style={styles.buttonText}>Button Text</Text>
        <SvgXml xml={getButtonImage()} width="32" height="32" /> {/* Button image */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default IconButton;
