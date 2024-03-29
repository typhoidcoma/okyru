// GlobalStyles.tsx
import { StyleSheet } from 'react-native';

export const Colors = {
    primary: '##FFFFFF',
    secondary: '#88A5BF45',
    background: 'transparent',
    text: '#FFFFFF',
    // ... add more colors as needed
};

export const FontSizes = {
    tiny: 10,
    small: 12,
    medium: 16,
    large: 20,
    // ... add more sizes as needed
};

export const Spacing = {
    small: 8,
    medium: 16,
    large: 24,
    // ... add more spacing sizes as needed
};

export const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tinyText: {
        fontFamily: 'NirmalaB',
        fontSize: FontSizes.tiny,
        color: Colors.text,
    },
    text: {
        fontFamily: 'Nirmala',
        fontSize: FontSizes.medium,
        color: Colors.text,
    },
    timerText: {
        fontFamily: 'Nirmala',
        fontSize: 64,
        color: Colors.text,
    },
    headerText: {
        fontFamily: 'NirmalaB',
        fontSize: FontSizes.large,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: Colors.primary,
        padding: Spacing.medium,
        borderRadius: 5,
    },
    buttonText: {
        fontFamily: 'NirmalaB',
        color: 'white',
        fontSize: FontSizes.medium,
    },
    imageLogo: {
        width: 250,
        height: 250,
        position: 'relative',
        bottom: 100,
    },
    // ... add more global styles as needed
});

export default GlobalStyles;
