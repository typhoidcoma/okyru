/**
 * BackButton Component.
 *
 * Back navigation arrow button for the top-left of sub-screens.
 * Styled for FlatDark theme: ghost circle with subtle border.
 *
 * @file BackButton.tsx
 * @component
 */

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface BackButtonProps {
    onPress: () => void;
    size?: number;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, size = 44 }) => {
    const iconSize = size * 0.45;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[styles.button, { width: size, height: size, borderRadius: size / 2 }]}
        >
            <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
                <Path
                    d="M15 18l-6-6 6-6"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </Svg>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BackButton;
