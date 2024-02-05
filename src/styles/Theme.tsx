// Theme.tsx
import { DefaultTheme, Theme } from '@react-navigation/native';

// Light theme colors
const LightColors = {
    primary: '#EA0008',
    secondary: '#2ecc71',
    background: '#2ecc71',
    text: '#EA0008',
    // ... more colors for light theme
};

// Dark theme colors
const DarkColors = {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#333333',
    text: '#ffffff',
    // ... more colors for dark theme
};

// Define font sizes (common for both themes)
const FontSizes = {
    small: 12,
    medium: 16,
    large: 20,
    // ... more sizes
};

// Light theme
const LightTheme: Theme = {
    ...DefaultTheme,
    dark: false, // dark is set to false for light theme
    colors: {
        ...DefaultTheme.colors,
        ...LightColors,
        // Add other color overrides if needed for the light theme
    },
};

// Dark theme
const DarkTheme: Theme = {
    ...DefaultTheme,
    dark: true, // dark is set to true for dark theme
    colors: {
        ...DefaultTheme.colors,
        ...DarkColors,
        // Add other color overrides if needed for the dark theme
    },
};

// Exporting both themes and FontSizes
export { LightTheme, DarkTheme, FontSizes };
