import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

const OkyruLogo = () => {
  const logoStyle = {
    width: 320,
    height: 320,
  };

  return (
    <View style={styles.logo}>
      <AnimatedLottieView
        source={require('../assets/logos/Logo.json')}
        autoPlay
        loop
        style={logoStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 320,
    height: 320,
    // backgroundColor: 'white',
  },
});

export default OkyruLogo;