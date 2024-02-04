import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const iconPaths = {
  icon1: require('../assets/icons/01_run.svg'),

  // Add more icons as needed
};

interface IconProps {
  iconName: keyof typeof iconPaths; // Make sure iconName is one of the keys in iconPaths
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ iconName, size = 24, color = 'black' }) => {
  const iconData = iconPaths[iconName];

  if (!iconData) {
    // Handle the case where the icon name is not found in iconPaths
    return null;
  }

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <Path d={iconData} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Icon;
