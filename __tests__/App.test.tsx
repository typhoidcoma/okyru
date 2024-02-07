import React from 'react';
import App from '../App'; // Add the correct relative path to the 'App' component
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});
