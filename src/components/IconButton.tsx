import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface IconButtonProps {
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ onPress }) => {
  const [buttonState, setButtonState] = useState<'hover' | 'press' | 'inactive'>('inactive');

  const handlePressIn = () => {
    setButtonState('press');
  };

  const handlePressOut = () => {
    setButtonState('inactive'); // Set the button state to 'inactive' on press out
  };

  const handlePress = () => {
    setButtonState('press');
    onPress();
    setTimeout(() => {
      setButtonState('inactive'); // Set the button state to 'inactive' after a short delay
    }, 100); // Adjust the delay time as needed
  };

  const getButtonImage = (): ImageSourcePropType => {
    switch (buttonState) {
      case 'hover':
        return require('../assets/images/buttons/icon_button_pressed.png');
      case 'press':
        return require('../assets/images/buttons/icon_button_pressed.png');
      default:
        return require('../assets/images/buttons/icon_button.png');
    }
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      activeOpacity={1}
    >
      <View style={styles.buttonContainer}>
        <Image source={getButtonImage()} style={styles.buttonImage} />
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
    width: 64,
    height: 64,
  },
});

export default IconButton;
