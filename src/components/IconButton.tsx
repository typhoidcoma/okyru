import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface IconButtonProps {
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ onPress }) => {
  const [buttonState, setButtonState] = useState<'hover' | 'press' | 'inactive'>('inactive');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handlePressIn = () => {
    setButtonState('press');
  };

  const handlePressOut = () => {
    setButtonState('inactive');
  };

  const handlePress = () => {
    setButtonState('press');
    onPress();
    setTimeoutId(
      setTimeout(() => {
        setButtonState('inactive');
      }, 100)
    );
  };

  const getButtonImage = (): ImageSourcePropType => {
    switch (buttonState) {
      case 'hover':
        return require('../assets/images/buttons/icon_button_hover.png');
      case 'press':
        return require('../assets/images/buttons/icon_button_pressed.png');
      default:
        return require('../assets/images/buttons/icon_button_active.png');
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
