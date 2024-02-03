import React from 'react';
import { View, StyleSheet } from 'react-native';
import Rive from 'rive-react-native';

const OkyruLogo = () => {
  return (
    <View style={styles.container}>
      <Rive resourceName="okyru_logo_anim" />
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
