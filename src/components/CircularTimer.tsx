import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import {
    useSharedValue,
    useDerivedValue,
    useAnimatedReaction,
    runOnJS,
    withTiming,
    runOnUI,
} from 'react-native-reanimated';
import GlobalStyles from '../styles/GlobalStyles';

interface CircularTimerProps {
    size: number;
    strokeWidth: number;
    duration: number;
    color: string;
    start: boolean;
    onTimerDone: () => void;
}

const CircularTimer: React.FunctionComponent<CircularTimerProps> = ({
    size,
    strokeWidth,
    duration,
    color,
    start,
    onTimerDone,
}) => {
    const animatedValue = useSharedValue(0);
    const [timeText, setTimeText] = useState(duration / 1000);

    const { circumference, halfCircle } = useMemo(() => {
        const calculatedCircumference = 2 * Math.PI * (size / 2 - strokeWidth / 2);
        const calculatedHalfCircle = size / 2;
        return { circumference: calculatedCircumference, halfCircle: calculatedHalfCircle };
    }, [size, strokeWidth]);

    useEffect(() => {
        if (start) {
            // Start the animation
            animatedValue.value = withTiming(
                100, // End value
                {
                    duration: duration, // Duration in milliseconds
                    easing: Easing.linear, // Linear easing
                },
                (finished) => {
                    if (finished && onTimerDone) {
                        runOnUI(() => {
                            // Call onTimerDone in a worklet on the UI thread
                            runOnJS(onTimerDone)();
                        })();
                    }
                }
            );
        } else {
            // Reset the timer if start is false
            animatedValue.value = 0;
        }
    }, [animatedValue, duration, start, onTimerDone]);

    // Derived value for remaining time
    const remainingTime = useDerivedValue(() => {
        return Math.floor(((100 - animatedValue.value) / 100) * (duration / 1000));
    });

    useAnimatedReaction(
        () => remainingTime.value,
        (currentRemainingTime, previousRemainingTime) => {
            if (currentRemainingTime !== previousRemainingTime) {
                runOnJS(setTimeText)(currentRemainingTime);
            }
        },
        [remainingTime]
    );

    function formatTime(timeInSeconds: number): string {
        const minutes = Math.floor(timeInSeconds / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    return (
        <View style={styles.container}>
            <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
                <Circle
                    cx={halfCircle.toString()}
                    cy={halfCircle.toString()}
                    r={(halfCircle - strokeWidth / 2).toString()}
                    stroke={color}
                    strokeWidth={strokeWidth.toString()}
                    strokeLinecap="round"
                    strokeDasharray={circumference.toString()}
                    strokeDashoffset={(
                        circumference -
                        (animatedValue.value / 100) * circumference
                    ).toString()}
                    fill="transparent"
                    rotation="-90"
                    origin={`${halfCircle}, ${halfCircle}`}
                />
            </Svg>
            <View style={[styles.textContainer]}>
                <Text style={GlobalStyles.timerText}>{formatTime(timeText)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    textContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CircularTimer;
