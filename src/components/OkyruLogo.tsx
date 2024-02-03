import React from 'react';
import Rive, { Alignment, Fit } from 'rive-react-native';

const OkyruLogo = () => {
  return <Rive resourceName={'okyru_logo_anim'} fit={Fit.Contain} alignment={Alignment.Center} />;
};

export default OkyruLogo;
