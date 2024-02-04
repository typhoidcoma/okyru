import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Icon from './Icon';
import { IconName } from './IconNames';

interface IconButtonProps {
  onPress: () => void;
  width?: number;
  height?: number;
  svgIconName: IconName;
}

const IconButton: React.FC<IconButtonProps> = ({ onPress, width, height, svgIconName }) => {
  const [buttonState, setButtonState] = useState<'hover' | 'press' | 'inactive'>('inactive');
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

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
  let iconColor = '#EA0008';
  const getButtonImage = (): ImageSourcePropType => {
    switch (buttonState) {
      case 'hover':
        return require('../assets/images/buttons/icon_button_hover.png');
      case 'press':
        iconColor = '#88A5BF45';
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
      style={{ width, height }} // Set the size of the TouchableOpacity
    >
      <View style={styles.buttonContainer}>
        <Image source={getButtonImage()} style={[styles.buttonImage, { width, height }]} />
      </View>
      <View style={[styles.iconContainer, { width, height }]}>
        <Icon
          iconName={svgIconName}
          size={24} // Set the size of the Icon
          color={iconColor}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    // width and height are now set dynamically in the component
    resizeMode: 'contain', // Ensure the image scales nicely
  },
  // ...other styles...
});

export default IconButton;
