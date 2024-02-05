import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import GlobalStyles from '../styles/GlobalStyles';
import { useSharedValue } from 'react-native-reanimated';
import StartButton from './StartButton'; // Import the StartButton component

interface CircularTimerProps {
    size: number;
    strokeWidth: number;
    time: number; // Input time in seconds
    color: string;
    onTimerDone: () => void;
}

interface CircularTimerRef {
    resetTimer: () => void;
}

const CircularTimer: React.ForwardRefRenderFunction<CircularTimerRef, CircularTimerProps> = (
    { size, strokeWidth, time, color, onTimerDone },
    ref
) => {
    const [currentTime, setCurrentTime] = useState(time);
    const animatedValue = useSharedValue(time);

    // Function to reset the timer to its initial time
    const resetTimer = () => {
        animatedValue.value = time;
        setCurrentTime(time);
    };

    // Expose the resetTimer function through the ref
    useImperativeHandle(ref, () => ({
        resetTimer,
    }));

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (currentTime > 0) {
            timer = setInterval(() => {
                setCurrentTime((prevTime) => prevTime - 1);
                console.log('Current time: ', currentTime);
            }, 1000);
        } else {
            if (onTimerDone) {
                onTimerDone();
            }
        }

        return () => clearInterval(timer);
    }, [currentTime, onTimerDone]);

    const circumference = 2 * Math.PI * (size / 2 - strokeWidth / 2);
    const strokeDashoffset = (currentTime / time) * circumference;

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${remainingSeconds}`;
    };

    return (
        <View style={styles.container}>
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

            <View style={styles.startButtonContainer}>
                {/* StartButton to control the timer */}
                <StartButton onPress={resetTimer} isRunning={currentTime > 0} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
    },
    timerCircleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
    },
    textContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    startButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default forwardRef(CircularTimer);
