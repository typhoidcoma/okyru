/**
 * StartButton — FlatDark theme.
 *
 * Plain neumorphic white gradient ball matching Figma node 203:308.
 * NO icons inside — just a smooth sphere with highlight.
 *
 * States:
 *   - Active (idle/paused/completed): Bright white-grey ball
 *   - Running: Muted dark ball with pulse
 *   - Pressed: Slightly darker, reduced shadow
 *
 * Size: 62px (matching Figma "startButtonGrp")
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { pulseAnimation } from '../utils/animations';

export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

interface StartButtonProps {
    onPress: () => void;
    timerState: TimerState;
    size?: number;
}

const StartButton: React.FC<StartButtonProps> = ({ onPress, timerState, size = 62 }) => {
    const [pressed, setPressed] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const pulseRef = useRef<Animated.CompositeAnimation | null>(null);

    // Start/stop pulse when running
    useEffect(() => {
        if (timerState === 'running') {
            pulseAnim.setValue(1);
            pulseRef.current = pulseAnimation(pulseAnim, 0.7, 1.0, 1500);
            pulseRef.current.start();
        } else {
            if (pulseRef.current) {
                pulseRef.current.stop();
                pulseRef.current = null;
            }
            pulseAnim.setValue(1);
        }
        return () => {
            if (pulseRef.current) {
                pulseRef.current.stop();
            }
        };
    }, [timerState, pulseAnim]);

    const handlePressIn = () => {
        setPressed(true);
        Animated.spring(scaleAnim, {
            toValue: 0.92,
            friction: 5,
            tension: 100,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        setPressed(false);
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 80,
            useNativeDriver: true,
        }).start();
    };

    // Visual states
    const isActive = timerState !== 'running';

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: pulseAnim }}>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                activeOpacity={1}
                style={[
                    styles.button,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                    },
                    isActive
                        ? pressed
                            ? styles.buttonPressed
                            : styles.buttonActive
                        : styles.buttonRunning,
                ]}
            >
                {/* Inner highlight — creates the sphere/ball illusion */}
                <View
                    style={[
                        styles.highlight,
                        {
                            width: size * 0.7,
                            height: size * 0.7,
                            borderRadius: (size * 0.7) / 2,
                            top: size * 0.08,
                            left: size * 0.12,
                        },
                        isActive ? styles.highlightActive : styles.highlightRunning,
                    ]}
                />
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    // Active: bright white-grey ball (idle/paused/completed) — prominent 3D floating look
    buttonActive: {
        backgroundColor: '#C0C4CC',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.55,
        shadowRadius: 10,
        elevation: 12,
    },
    // Pressed: held down — shadow collapses
    buttonPressed: {
        backgroundColor: '#A8ACB4',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 4,
    },
    // Running: muted dark ball with pulse
    buttonRunning: {
        backgroundColor: '#3A4050',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },

    // Glossy highlight overlay — upper-left sphere illusion
    highlight: {
        position: 'absolute',
    },
    highlightActive: {
        backgroundColor: 'rgba(255,255,255,0.35)',
    },
    highlightRunning: {
        backgroundColor: 'rgba(255,255,255,0.06)',
    },
});

export default StartButton;
