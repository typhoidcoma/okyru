/**
 * TimerDurationSlider — FlatDark themed duration picker.
 *
 * A slider inside a FlatDarkCard pill that lets users set
 * the workout timer duration (1–30 minutes).
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import FlatDarkCard from './FlatDarkCard';

interface TimerDurationSliderProps {
    /** Current duration in seconds */
    value: number;
    /** Called with new duration in seconds */
    onValueChange: (seconds: number) => void;
}

const MIN_MINUTES = 1;
const MAX_MINUTES = 30;

function formatMinutes(seconds: number): string {
    const mins = Math.round(seconds / 60);
    return `${mins} min`;
}

const TimerDurationSlider: React.FC<TimerDurationSliderProps> = ({
    value,
    onValueChange,
}) => {
    const currentMinutes = Math.round(value / 60);

    const handleChange = (minutes: number) => {
        onValueChange(Math.round(minutes) * 60);
    };

    return (
        <FlatDarkCard padding={16} style={styles.card}>
            <Text style={styles.label}>{formatMinutes(value)}</Text>
            <View style={styles.sliderRow}>
                <Text style={styles.rangeText}>{MIN_MINUTES}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={MIN_MINUTES}
                    maximumValue={MAX_MINUTES}
                    step={1}
                    value={currentMinutes}
                    onValueChange={handleChange}
                    minimumTrackTintColor="#EA0008"
                    maximumTrackTintColor="#1E2530"
                    thumbTintColor="#EA0008"
                />
                <Text style={styles.rangeText}>{MAX_MINUTES}</Text>
            </View>
        </FlatDarkCard>
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
    },
    label: {
        fontFamily: 'Nirmala',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 4,
    },
    sliderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 4,
    },
    slider: {
        flex: 1,
        height: 30,
        marginHorizontal: 8,
    },
    rangeText: {
        fontFamily: 'Nirmala',
        fontSize: 11,
        color: 'rgba(255,255,255,0.35)',
    },
});

export default TimerDurationSlider;
