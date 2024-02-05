import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    Easing,
} from 'react-native-reanimated';

interface CircularTimerProps {
    size: number;
    strokeWidth: number;
    duration: number;
    color: string;
}

const CircularTimer: React.FC<CircularTimerProps> = ({ size, strokeWidth, duration, color }) => {
    const animatedValue = useSharedValue(0);

    // Calculate the circumference of the circle
    const circumference = 2 * Math.PI * (size / 2 - strokeWidth / 2);
    const halfCircle = size / 2;

    useEffect(() => {
        animatedValue.value = withTiming(100, {
            duration: duration,
            easing: Easing.linear,
        });
    }, [animatedValue, duration]);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: (1 - animatedValue.value / 100) * circumference,
    }));

    return (
        <View style={styles.container}>
            <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
                <AnimatedCircle
                    animatedProps={animatedProps}
                    cx={halfCircle}
                    cy={halfCircle}
                    r={halfCircle - strokeWidth / 2}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    fill="transparent"
                    rotation="-90"
                    origin={`${halfCircle}, ${halfCircle}`}
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default CircularTimer;
