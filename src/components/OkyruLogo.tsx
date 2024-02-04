import React from 'react';
import { StyleSheet } from 'react-native';
import Rive, { Alignment, Fit } from 'rive-react-native';

const OkyruLogo = () => {
  return (
    <Rive
      resourceName={'truck_v7.riv'}
      fit={Fit.Fill}
      alignment={Alignment.Center}
      autoplay={true}
      // artboardName="Logo"
      // style={styles.logo}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 320,
    height: 320,
  },
});

export default OkyruLogo;
