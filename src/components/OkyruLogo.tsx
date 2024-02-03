import React from 'react';
import { View, StyleSheet } from 'react-native';
import Rive, { Alignment, Fit } from 'rive-react-native';

const OkyruLogo = () => {
  return (
    <View style={styles.container}>
      <Rive resourceName={'okyru_logo_anim'} fit={Fit.Contain} alignment={Alignment.Center} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OkyruLogo;
