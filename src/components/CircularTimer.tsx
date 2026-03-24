/**
 * CircularTimer Component — FlatDark theme.
 *
 * Matches Figma node 203:272 (main_timer).
 *
 * State machine: idle → running → paused → running → completed
 *
 * Visual layers (SVG circles):
 *   1. Outer ring: thin dark border (276px)
 *   2. Progress track: faint background ring
 *   3. Progress ring: red arc that depletes as timer counts down
 *   4. Inner circle: dark filled disc
 *   + Timer text overlay in RED (#EA0008) per Figma
 *
 * NOTE: StartButton is NOT rendered inside this component.
 * The parent screen controls layout of timer + button separately,
 * matching Figma positioning.
 */

import { View, Text, StyleSheet, Vibration, Animated, Easing } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import React, {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
    useCallback,
} from 'react';
import { TimerState } from './StartButton';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularTimerProps {
    color: string;
    onReset: () => void;
    onTimerDone: () => void;
    onTimerStateChange?: (state: TimerState) => void;
    onButtonPress?: () => void;
    size: number;
    strokeWidth: number;
    time: number;
}

export interface CircularTimerRef {
    resetTimer: () => void;
    getTimerState: () => TimerState;
    handleButtonPress: () => void;
    getCurrentTime: () => number;
}

// FlatDark theme colors
const OUTER_RING_COLOR = '#3A4858';
const OUTER_RING_STROKE = 2;
const PROGRESS_BG_COLOR = '#1E2530';
const INNER_CIRCLE_COLOR = '#1C2333';
const TIMER_TEXT_COLOR = '#FFFFFF'; // Figma: white timer text

const CircularTimer: React.ForwardRefRenderFunction<CircularTimerRef, CircularTimerProps> = (
    { size, strokeWidth, time, onTimerDone, onReset, onTimerStateChange },
    ref
) => {
    const [currentTime, setCurrentTime] = useState<number>(time);
    const [timerState, setTimerState] = useState<TimerState>('idle');
    const intervalRef = useRef<number | null>(null);

    // Animated progress value (0 = full, 1 = empty)
    const progressAnim = useRef(new Animated.Value(0)).current;

    const updateState = useCallback(
        (newState: TimerState) => {
            setTimerState(newState);
            onTimerStateChange?.(newState);
        },
        [onTimerStateChange]
    );

    const stopInterval = useCallback(() => {
        if (intervalRef.current !== null) {
            BackgroundTimer.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startCountdown = useCallback(
        (_fromTime: number) => {
            stopInterval();
            updateState('running');

            intervalRef.current = BackgroundTimer.setInterval(() => {
                setCurrentTime((prevTime) => {
                    if (prevTime <= 1) {
                        stopInterval();
                        updateState('completed');
                        onTimerDone();
                        Vibration.vibrate([200, 1000, 200, 1000]);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        },
        [onTimerDone, stopInterval, updateState]
    );

    // Smooth progress animation per tick
    useEffect(() => {
        if (timerState === 'running' && time > 0) {
            const targetProgress = 1 - currentTime / time;
            Animated.timing(progressAnim, {
                toValue: targetProgress,
                duration: 900,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();
        } else if (timerState === 'completed') {
            Animated.timing(progressAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    }, [currentTime, timerState, time, progressAnim]);

    // Exposed to parent via ref — called when StartButton is pressed
    const handleButtonPress = useCallback(() => {
        switch (timerState) {
            case 'idle':
                startCountdown(time);
                break;
            case 'running':
                stopInterval();
                updateState('paused');
                break;
            case 'paused':
                startCountdown(currentTime);
                break;
            case 'completed':
                setCurrentTime(time);
                progressAnim.setValue(0);
                onReset();
                startCountdown(time);
                break;
        }
    }, [
        timerState,
        time,
        currentTime,
        startCountdown,
        stopInterval,
        updateState,
        onReset,
        progressAnim,
    ]);

    const resetTimer = useCallback(() => {
        stopInterval();
        setCurrentTime(time);
        progressAnim.setValue(0);
        updateState('idle');
        onReset();
    }, [time, stopInterval, updateState, onReset, progressAnim]);

    useImperativeHandle(ref, () => ({
        resetTimer,
        getTimerState: () => timerState,
        handleButtonPress,
        getCurrentTime: () => currentTime,
    }));

    // Reset when time prop changes
    useEffect(() => {
        stopInterval();
        setCurrentTime(time);
        progressAnim.setValue(0);
        setTimerState('idle');
        // Defer parent callback to avoid setState-during-render warning
        setTimeout(() => onTimerStateChange?.('idle'), 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopInterval();
        };
    }, [stopInterval]);

    // --- SVG geometry ---
    const outerRadius = size / 2 - OUTER_RING_STROKE / 2;
    const progressRadius = size / 2 - strokeWidth / 2 - OUTER_RING_STROKE;
    const circumference = 2 * Math.PI * progressRadius;
    const innerRadius = size / 2 - strokeWidth - OUTER_RING_STROKE - 2;

    const animatedOffset = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, circumference],
    });

    const ringOpacity = timerState === 'idle' ? 0.5 : timerState === 'paused' ? 0.6 : 1.0;

    const isPaused = timerState === 'paused';

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${remainingSeconds}`;
    };

    const center = size / 2;

    // Timer text opacity varies by state
    const textOpacity = timerState === 'idle' ? 0.6 : timerState === 'paused' ? 0.5 : 1.0;

    return (
        <View style={[styles.timerWrapper, { width: size, height: size }]}>
            <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
                <Defs>
                    <LinearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0" stopColor={isPaused ? '#9A4545' : '#FF4040'} />
                        <Stop offset="1" stopColor={isPaused ? '#5A2020' : '#8B0000'} />
                    </LinearGradient>
                </Defs>

                {/* 1. Outer dark border ring */}
                <Circle
                    cx={center}
                    cy={center}
                    r={outerRadius}
                    stroke={OUTER_RING_COLOR}
                    strokeWidth={OUTER_RING_STROKE}
                    fill="transparent"
                />

                {/* 2. Progress track */}
                <Circle
                    cx={center}
                    cy={center}
                    r={progressRadius}
                    stroke={PROGRESS_BG_COLOR}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />

                {/* 3. Progress ring (animated gradient arc) */}
                <AnimatedCircle
                    cx={center}
                    cy={center}
                    r={progressRadius}
                    stroke="url(#ringGrad)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={animatedOffset}
                    fill="transparent"
                    rotation={-90}
                    origin={`${center}, ${center}`}
                    opacity={ringOpacity}
                />

                {/* 4. Inner dark filled circle */}
                <Circle cx={center} cy={center} r={innerRadius} fill={INNER_CIRCLE_COLOR} />
            </Svg>

            {/* Timer text overlay */}
            <View style={styles.textContainer}>
                <Text
                    style={[
                        styles.timerText,
                        { opacity: timerState === 'paused' ? 0 : textOpacity },
                    ]}
                >
                    {formatTime(currentTime)}
                </Text>
                {timerState === 'paused' && (
                    <View style={styles.pausedOverlay}>
                        <Text style={styles.pausedText}>paused</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    timerWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
    },
    timerText: {
        fontFamily: 'Nirmala',
        fontSize: 64,
        color: TIMER_TEXT_COLOR,
    },
    pausedOverlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pausedText: {
        fontFamily: 'Nirmala',
        fontSize: 28,
        color: 'rgba(255, 255, 255, 0.5)',
        letterSpacing: 4,
    },
});

export default forwardRef(CircularTimer);
