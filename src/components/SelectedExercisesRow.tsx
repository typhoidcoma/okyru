/**
 * SelectedExercisesRow — Shows selected exercise icons
 * as a subtle horizontal row on the Home screen.
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from './Icon';
import { IconName } from './IconNames';

interface SelectedExercisesRowProps {
    exercises: IconName[];
}

const MAX_DISPLAY = 8;
const ICON_SIZE = 24;
const ICON_COLOR = 'rgba(224, 64, 48, 0.45)';

const SelectedExercisesRow: React.FC<SelectedExercisesRowProps> = ({ exercises }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    if (exercises.length === 0) {
        return null;
    }

    const displayed = exercises.slice(0, MAX_DISPLAY);
    const overflow = exercises.length - MAX_DISPLAY;

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {displayed.map((name) => (
                <View key={name} style={styles.iconWrapper}>
                    <Icon iconName={name} size={ICON_SIZE} color={ICON_COLOR} />
                </View>
            ))}
            {overflow > 0 && <Text style={styles.overflowText}>+{overflow}</Text>}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 14,
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    overflowText: {
        fontFamily: 'Nirmala',
        fontSize: 12,
        color: 'rgba(224, 64, 48, 0.4)',
        alignSelf: 'center',
    },
});

export default SelectedExercisesRow;
