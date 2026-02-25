import React from 'react';
import App from '../App'; // Add the correct relative path to the 'App' component
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const rendered = renderer.create(<App />);
    const tree = rendered.toJSON();
    rendered.unmount();
    expect(tree).toMatchSnapshot();
});
