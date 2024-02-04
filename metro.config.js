const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Default configuration
const defaultConfig = getDefaultConfig(__dirname);

// Custom configuration to handle SVG files
const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    // Add other custom transformer configurations if needed
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    // Add other custom resolver configurations if needed
  },
};

// Merge and export the configuration
module.exports = mergeConfig(defaultConfig, customConfig);
