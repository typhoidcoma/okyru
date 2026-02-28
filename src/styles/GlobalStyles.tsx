// GlobalStyles.tsx
import { StyleSheet } from 'react-native';

// ── FlatDark Theme Tokens ──────────────────────────────────────────
export const FlatDark = {
    // Card surfaces
    cardBg: 'rgba(0, 0, 0, 0.25)',
    cardBorder: '#1e2431',

    // Accent reds
    accentRed: '#EA0008',
    mutedRed: '#E04030',
    redGlow: 'rgba(224, 64, 48, 0.15)',
    redBorder: 'rgba(224, 64, 48, 0.25)',

    // Text
    textPrimary: '#FFFFFF',
    textMuted: 'rgba(255, 255, 255, 0.5)',
    textSubtle: 'rgba(255, 255, 255, 0.25)',

    // Background gradient endpoints (Figma exact)
    gradientTop: '#212733',
    gradientBottom: '#080B15',

    // Timer ring colors
    outerRing: '#3A4858',
    progressRing: '#EA0008',
    progressTrack: '#1E2530',
    innerDisc: '#1C2333',
    timerText: '#FFFFFF',

    // Button surfaces
    buttonActive: '#C0C4CC',
    buttonInactive: '#3A4050',
    buttonHighlight: 'rgba(255, 255, 255, 0.35)',
};

export const Colors = {
    primary: '#FFFFFF',
    secondary: '#88A5BF45',
    background: 'transparent',
    text: '#FFFFFF',
};

export const FontSizes = {
    tiny: 10,
    small: 12,
    medium: 16,
    large: 20,
    screenTitle: 36,
    timer: 64,
};

export const Spacing = {
    small: 8,
    medium: 16,
    large: 24,
};

// ── Typography Presets ─────────────────────────────────────────────
export const Typography = StyleSheet.create({
    screenTitle: {
        fontFamily: 'Nirmala',
        fontSize: FontSizes.screenTitle,
        color: '#D8DCE3',
        letterSpacing: 0,
        textAlign: 'center',
    },
    bodyText: {
        fontFamily: 'Nirmala',
        fontSize: FontSizes.medium,
        color: FlatDark.textMuted,
    },
    caption: {
        fontFamily: 'Nirmala',
        fontSize: FontSizes.small,
        color: FlatDark.textSubtle,
        letterSpacing: 1,
    },
    heading: {
        fontFamily: 'NirmalaB',
        fontSize: 24,
        color: Colors.text,
    },
    wordmark: {
        fontFamily: 'NirmalaB',
        fontSize: 16,
        fontWeight: '700',
        color: 'rgba(224, 64, 48, 0.5)',
        letterSpacing: 2,
    },
    bottomWordmark: {
        fontFamily: 'Nirmala',
        fontSize: 13,
        color: 'rgba(224, 64, 48, 0.4)',
        letterSpacing: 3,
    },
});

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
        fontSize: FontSizes.timer,
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
});

export default GlobalStyles;
