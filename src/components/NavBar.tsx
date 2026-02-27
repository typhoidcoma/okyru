/**
 * NavBar Component.
 *
 * Unified top navigation bar used across all screens.
 * Provides consistent left/center/right slot layout.
 *
 * @file NavBar.tsx
 * @component
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

interface NavBarProps {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ left, center, right }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftSlot}>{left}</View>
            <View style={styles.centerSlot}>{center}</View>
            <View style={styles.rightSlot}>{right}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 52,
        paddingBottom: 12,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    leftSlot: {
        width: 44,
        alignItems: 'flex-start',
    },
    centerSlot: {
        flex: 1,
        alignItems: 'center',
    },
    rightSlot: {
        width: 44,
        alignItems: 'flex-end',
    },
});

export default NavBar;
