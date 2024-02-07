import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, ImageBackground, Vibration } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import GlobalStyles from '../styles/GlobalStyles';
import BackgroundTimer from 'react-native-background-timer';
import StartButton from './StartButton';

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
    const [currentTime, setCurrentTime] = useState<number | null>(null);
    const animatedValue = useRef<number>(time);

    // Function to reset the timer to its initial time
    const resetTimer = () => {
        animatedValue.current = time;
        setCurrentTime(time);
    };

    // Expose the resetTimer function through the ref
    useImperativeHandle(ref, () => ({
        resetTimer,
    }));

    useEffect(() => {
        let timer: number | null = null;

        const startBackgroundTimer = () => {
            timer = BackgroundTimer.setInterval(() => {
                setCurrentTime((prevTime) => {
                    if (prevTime! > 0) {
                        return prevTime! - 1;
                    } else {
                        if (onTimerDone) {
                            onTimerDone();
                            // Vibrate the device when the timer is done
                            Vibration.vibrate([200, 1000, 200, 1000]);
                        }
                        return prevTime;
                    }
                });
            }, 1000);
        };

        const stopBackgroundTimer = () => {
            if (timer !== null) {
                BackgroundTimer.clearInterval(timer);
                timer = null;
            }
        };

        startBackgroundTimer();

        return () => {
            stopBackgroundTimer();
        };
    }, [onTimerDone]);

    const circumference = 2 * Math.PI * (size / 2 - strokeWidth / 2);
    const strokeDashoffset = (currentTime! / time) * circumference;

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${remainingSeconds}`;
    };

    const image = require('../assets/images/backgrounds/timerBG_light.png');

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
                        <Text style={GlobalStyles.timerText}>{formatTime(currentTime!)}</Text>
                    </View>
                </View>
            </ImageBackground>

            <View style={styles.startButtonContainer}>
                {/* StartButton to control the timer */}
                <StartButton onPress={resetTimer} isRunning={currentTime! > 0} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagaContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: 360,
        height: 360,
    },
    timerCircleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    textContainer: {
        position: 'absolute',
        alignItems: 'center',
        transform: [{ translateY: -10 }],
    },
    startButtonContainer: {
        // position: 'absolute',
        marginTop: 100,
        marginVertical: 20,
    },
});

export default forwardRef(CircularTimer);
