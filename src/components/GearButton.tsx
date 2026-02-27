/**
 * GearButton Component.
 *
 * Settings gear icon button for the top-right of the Home screen nav bar.
 * Styled for FlatDark theme: ghost circle with subtle border.
 *
 * @file GearButton.tsx
 * @component
 */

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface GearButtonProps {
    onPress: () => void;
    size?: number;
}

const GearButton: React.FC<GearButtonProps> = ({ onPress, size = 44 }) => {
    const iconSize = size * 0.45;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[styles.button, { width: size, height: size, borderRadius: size / 2 }]}
        >
            <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
                <Circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.8"
                    fill="none"
                />
                <Path
                    d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
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

export default GearButton;
