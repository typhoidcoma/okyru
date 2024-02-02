import React from 'react';
import { View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

const OkyruLogo = ({ width, height }: { width: number; height: number }) => {
  return (
    <View>
      <SvgUri width={width} height={height} source={require('../assets/logos/logo.svg')} />
    </View>
  );
};

export default OkyruLogo;
