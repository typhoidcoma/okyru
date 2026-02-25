/**
 * CircularTimer Component.
 *
 * This component displays a circular timer with customizable attributes such as size, stroke width, color, and time duration.
 *
 * @file CircularTimer.tsx
 * @component
 * @param {object} props - Props for the CircularTimer component
 * @param {number} props.size - Size of the circular timer
 * @param {number} props.strokeWidth - Width of the stroke used in the circular timer
 * @param {number} props.time - Duration of the timer in seconds
 * @param {string} props.color - Color of the circular timer
 * @param {() => void} props.onReset - Callback function to reset the timer
 * @param {() => void} props.onTimerDone - Callback function triggered when the timer is done
 * @returns {JSX.Element} A JSX element representing the CircularTimer component
 * @example
 * <CircularTimer
 *    size={220}
 *    strokeWidth={8}
 *    time={60}
 *    color="rgba(234,0,8,.65)"
 *    onReset={handleReset}
 *    onTimerDone={handleTimerDone}
 * />
 */

import { View, Text, StyleSheet, ImageBackground, Vibration } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import GlobalStyles from '../styles/GlobalStyles';
import React, {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
    useCallback,
} from 'react';
import StartButton from './StartButton';
import Svg, { Circle } from 'react-native-svg';

interface CircularTimerProps {
    color: string;
    onReset: () => void;
    onTimerDone: () => void;
    size: number;
    strokeWidth: number;
    time: number; // Input time in seconds
}

interface CircularTimerRef {
    resetTimer: () => void;
}

const CircularTimer: React.ForwardRefRenderFunction<CircularTimerRef, CircularTimerProps> = (
    { size, strokeWidth, time, color, onTimerDone, onReset },
    ref
) => {
    const [currentTime, setCurrentTime] = useState<number>(time);
    const [isRunning, setIsRunning] = useState<boolean>(true);
    const intervalRef = useRef<number | null>(null);

    const stopTimer = useCallback(() => {
        if (intervalRef.current !== null) {
            BackgroundTimer.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startTimer = useCallback(
        (initialTime: number) => {
            stopTimer();
            setCurrentTime(initialTime);
            setIsRunning(true);
            intervalRef.current = BackgroundTimer.setInterval(() => {
                setCurrentTime((prevTime) => {
                    if (prevTime <= 1) {
                        stopTimer();
                        setIsRunning(false);
                        onTimerDone();
                        Vibration.vibrate([200, 1000, 200, 1000]);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        },
        [onTimerDone, stopTimer]
    );

    // Function to reset the timer to its initial time
    const resetTimer = () => {
        onReset(); // Call the onReset function to reset the modalOpened state
        startTimer(time);
    };

    // Expose the resetTimer function through the ref
    useImperativeHandle(ref, () => ({
        resetTimer,
    }));

    useEffect(() => {
        startTimer(time);

        return () => {
            stopTimer();
        };
    }, [startTimer, stopTimer, time]);

    const circumference = 2 * Math.PI * (size / 2 - strokeWidth / 2);
    const strokeDashoffset = (currentTime / Math.max(time, 1)) * circumference;

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${remainingSeconds}`;
    };

    const image = require('../assets/images/backgrounds/timerBG_red.png');

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.imagaContainer}>
                <View style={styles.timerCircleContainer}>
                    <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
                        <Circle
                            cx={size / 2}
                            cy={size / 2}
                            r={size / 2 - strokeWidth / 2}
                            stroke={color}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            fill="transparent"
                            rotation="-90"
                            origin={`${size / 2}, ${size / 2}`}
                        />
                    </Svg>
                    {/* Text in the middle of the circle */}
                    <View style={styles.textContainer}>
                        <Text style={GlobalStyles.timerText}>{formatTime(currentTime)}</Text>
                    </View>
                </View>
            </ImageBackground>

            <View style={styles.startButtonContainer}>
                {/* StartButton to control the timer */}
                <StartButton onPress={resetTimer} isRunning={isRunning} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    imagaContainer: {
        alignContent: 'center',
        alignItems: 'center',
        width: 480,
        height: 480,
        justifyContent: 'center',
    },
    timerCircleContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
    },
    textContainer: {
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        transform: [{ translateY: -10 }],
    },
    startButtonContainer: {
        // position: 'absolute',
        // marginTop: 32,
        marginVertical: 12,
    },
});

export default forwardRef(CircularTimer);
