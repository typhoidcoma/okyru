import React from 'react';
import { StyleSheet } from 'react-native';
import Rive, { Alignment, Fit } from 'rive-react-native';

const OkyruLogo = () => {
  return (
    <Rive
      resourceName={'okyru_logo_anim'}
      fit={Fit.Fill}
      alignment={Alignment.Center}
      artboardName="Logo"
      style={styles.logo}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 400,
    height: 400,
  },
});

export default OkyruLogo;
