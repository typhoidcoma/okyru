// CircularTimer.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, CircleProps } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    Easing,
    useDerivedValue,
    AnimatedProps,
    useAnimatedReaction,
    runOnJS,
} from 'react-native-reanimated';
import GlobalStyles from '../styles/GlobalStyles';

interface CircularTimerProps {
    size: number;
    strokeWidth: number;
    duration: number;
    color: string;
    start: boolean;
}

const CircularTimer: React.FunctionComponent<CircularTimerProps> = ({
    size,
    strokeWidth,
    duration,
    color,
    start,
}) => {
    const animatedValue = useSharedValue(0);
    const [timeText, setTimeText] = useState(duration / 1000); // Renamed from displayTime to timeText

    const { circumference, halfCircle } = useMemo(() => {
        const calculatedCircumference = 2 * Math.PI * (size / 2 - strokeWidth / 2);
        const calculatedHalfCircle = size / 2;
        return { circumference: calculatedCircumference, halfCircle: calculatedHalfCircle };
    }, [size, strokeWidth]);

    useEffect(() => {
        if (start) {
            animatedValue.value = withTiming(100, {
                duration: duration,
                easing: Easing.linear,
            });
        } else {
            animatedValue.value = 0; // Reset timer if start is false
        }
    }, [animatedValue, duration, start]);

    const animatedProps = useAnimatedProps<AnimatedProps<CircleProps>>(() => ({
        strokeDashoffset: circumference - (animatedValue.value / 100) * circumference,
    }));

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
        [remainingTime] // dependency array
    );

    function formatTime(timeInSeconds: number): string {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    return (
        <View style={styles.container}>
            <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
                <AnimatedCircle
                    animatedProps={animatedProps}
                    cx={halfCircle.toString()}
                    cy={halfCircle.toString()}
                    r={(halfCircle - strokeWidth / 2).toString()}
                    stroke={color}
                    strokeWidth={strokeWidth.toString()}
                    strokeLinecap="round"
                    strokeDasharray={circumference.toString()}
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

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default CircularTimer;
