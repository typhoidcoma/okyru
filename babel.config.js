module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        // ... your other plugins
        '@babel/plugin-proposal-export-namespace-from',
        'react-native-reanimated/plugin',
    ],
};
