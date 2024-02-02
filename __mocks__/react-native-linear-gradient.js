import React from 'react';
jest.mock('react-native-linear-gradient', () => {
  // Mocked component
  return function LinearGradient(props) {
    return <div {...props} />;
  };
});
