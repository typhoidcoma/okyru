jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: jest.fn(),
    StackView: jest.fn(),
  };
});
