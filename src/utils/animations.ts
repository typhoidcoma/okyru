/**
 * Animation helpers for okyru FlatDark theme.
 *
 * All animations use React Native's Animated API.
 * Native driver is used where possible for 60fps performance.
 */

import { Animated, Easing } from 'react-native';

/**
 * Spring-based press feedback.
 * Scales down to 0.92, then springs back to 1.0.
 */
export const pressAnimation = (
    animValue: Animated.Value,
    toValue: number = 0.92,
    callback?: () => void
) => {
    Animated.sequence([
        Animated.spring(animValue, {
            toValue,
            friction: 5,
            tension: 100,
            useNativeDriver: true,
        }),
        Animated.spring(animValue, {
            toValue: 1,
            friction: 5,
            tension: 80,
            useNativeDriver: true,
        }),
    ]).start(callback);
};

/**
 * Fade in + slide up entrance animation.
 */
export const fadeInUp = (
    opacityValue: Animated.Value,
    translateValue: Animated.Value,
    duration: number = 350
) => {
    Animated.parallel([
        Animated.timing(opacityValue, {
            toValue: 1,
            duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }),
        Animated.timing(translateValue, {
            toValue: 0,
            duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }),
    ]).start();
};

/**
 * Fade out + slide down exit animation.
 */
export const fadeOutDown = (
    opacityValue: Animated.Value,
    translateValue: Animated.Value,
    duration: number = 250,
    callback?: () => void
) => {
    Animated.parallel([
        Animated.timing(opacityValue, {
            toValue: 0,
            duration,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
        }),
        Animated.timing(translateValue, {
            toValue: 40,
            duration,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
        }),
    ]).start(callback);
};

/**
 * Looping pulse animation (opacity oscillation).
 * Used for the running-state indicator on StartButton.
 */
export const pulseAnimation = (
    animValue: Animated.Value,
    minOpacity: number = 0.7,
    maxOpacity: number = 1.0,
    duration: number = 1500
) => {
    return Animated.loop(
        Animated.sequence([
            Animated.timing(animValue, {
                toValue: minOpacity,
                duration: duration / 2,
                easing: Easing.inOut(Easing.sin),
                useNativeDriver: true,
            }),
            Animated.timing(animValue, {
                toValue: maxOpacity,
                duration: duration / 2,
                easing: Easing.inOut(Easing.sin),
                useNativeDriver: true,
            }),
        ])
    );
};

/**
 * Bounce scale animation for selection feedback.
 */
export const bounceSelect = (
    animValue: Animated.Value,
    callback?: () => void
) => {
    Animated.sequence([
        Animated.timing(animValue, {
            toValue: 0.85,
            duration: 80,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }),
        Animated.spring(animValue, {
            toValue: 1.05,
            friction: 4,
            tension: 120,
            useNativeDriver: true,
        }),
        Animated.spring(animValue, {
            toValue: 1,
            friction: 6,
            tension: 80,
            useNativeDriver: true,
        }),
    ]).start(callback);
};
