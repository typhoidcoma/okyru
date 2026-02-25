/* eslint-env jest */

jest.mock('react-native-linear-gradient', () => {
    const React = require('react');
    const { View } = require('react-native');
    return ({ children, ...props }) => React.createElement(View, props, children);
});

jest.mock('rive-react-native', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
        __esModule: true,
        default: (props) => React.createElement(View, props),
        Alignment: { Center: 'center' },
        Fit: { Fill: 'fill' },
    };
});

jest.mock('@react-navigation/native', () => {
    return {
        NavigationContainer: ({ children }) => children,
    };
});

jest.mock('@react-navigation/native-stack', () => {
    return {
        createNativeStackNavigator: () => {
            const Navigator = ({ children }) => children;
            const Screen = () => null;
            return { Navigator, Screen };
        },
    };
});

jest.mock('react-native-background-timer', () => ({
    setInterval: () => 1,
    clearInterval: () => undefined,
}));

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@react-native-community/slider', () => {
    const React = require('react');
    const { View } = require('react-native');
    return (props) => React.createElement(View, props);
});
