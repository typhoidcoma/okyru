import React from 'react';
import SplashScreen from '../src/screens/SplashScreen'; // Add the correct relative path to the 'App' component
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    jest.useFakeTimers();
    const navigation = { replace: jest.fn() } as any;
    const rendered = renderer.create(<SplashScreen navigation={navigation} />);
    const tree = rendered.toJSON();
    rendered.unmount();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    expect(tree).toMatchSnapshot();
});
