import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

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
        return require('../assets/images/buttons/icon_button_pressed.png'); // Replace with your image path
      case 'press':
        return require('../assets/images/buttons/icon_button_pressed.png'); // Replace with your image path
      default:
        return require('../assets/images/buttons/icon_button.png'); // Replace with your image path
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
        <Image source={getButtonImage()} style={styles.buttonImage} /> {/* Button image */}
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
  buttonImage: {
    width: 32,
    height: 32,
  },
});

export default IconButton;
