import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, CircleProps } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    Easing,
    AnimatedProps,
} from 'react-native-reanimated';

interface CircularTimerProps {
    size: number;
    strokeWidth: number;
    duration: number;
    color: string;
}

const CircularTimer: React.FunctionComponent<CircularTimerProps> = ({
    size,
    strokeWidth,
    duration,
    color,
}) => {
    const animatedValue = useSharedValue(0);
    const [remainingTime, setRemainingTime] = useState(duration / 1000); // in seconds

    // Encapsulate calculations
    const { circumference, halfCircle } = useMemo(() => {
        const calculatedCircumference = 2 * Math.PI * (size / 2 - strokeWidth / 2);
        const calculatedHalfCircle = size / 2;
        return { circumference: calculatedCircumference, halfCircle: calculatedHalfCircle };
    }, [size, strokeWidth]);

    useEffect(() => {
        animatedValue.value = withTiming(100, {
            duration: duration,
            easing: Easing.linear,
        });

        // Update remaining time every second
        const interval = setInterval(() => {
            setRemainingTime((time) => (time > 0 ? time - 1 : 0));
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [animatedValue, duration]);

    const animatedProps = useAnimatedProps<AnimatedProps<CircleProps>>(() => ({
        strokeDashoffset: circumference - (animatedValue.value / 100) * circumference,
    }));

    // Format time to MM:SS
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

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
            <View style={[styles.textContainer, { top: halfCircle, left: halfCircle }]}>
                <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // for absolute positioning of the text
    },
    textContainer: {
        position: 'absolute',
        transform: [{ translateX: -50 }, { translateY: -10 }], // Adjust these values to center the text
    },
    timerText: {
        fontSize: 18,
        color: '#000', // Adjust the color as needed
        textAlign: 'center', // Center the text
        // ... Add more styling if needed
    },
});

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default CircularTimer;
