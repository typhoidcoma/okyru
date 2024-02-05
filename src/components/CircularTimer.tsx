import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
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
    }, [animatedValue, duration]);

    const animatedProps = useAnimatedProps<AnimatedProps<CircleProps>>(() => ({
        strokeDashoffset: circumference - (animatedValue.value / 100) * circumference,
    }));

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
