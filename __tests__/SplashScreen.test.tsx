import React from 'react';
import SplashScreen from '../src/screens/SplashScreen'; // Add the correct relative path to the 'App' component
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<SplashScreen navigation={undefined} />).toJSON();
    expect(tree).toMatchSnapshot();
});
