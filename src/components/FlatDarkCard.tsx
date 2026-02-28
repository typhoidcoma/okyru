/**
 * FlatDarkCard — Reusable dark pill-shaped card.
 *
 * Matches Figma node 264:508 (Card / FlatDark / InnerBG):
 *   - Background: rgba(0, 0, 0, 0.25)
 *   - Border: 1px solid #1e2431
 *   - Border-radius: 64px (pill)
 *
 * Used for: timer controls, modal content, action rows.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface FlatDarkCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    padding?: number;
}

const FlatDarkCard: React.FC<FlatDarkCardProps> = ({
    children,
    style,
    padding = 20,
}) => {
    return (
        <View style={[styles.card, { padding }, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderWidth: 1,
        borderColor: '#1e2431',
        borderRadius: 64,
        width: '100%',
    },
});

export default FlatDarkCard;
