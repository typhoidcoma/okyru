import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
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
    const [currentTime, setCurrentTime] = useState<number | null>(null); // Initialize to null;
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

        if (currentTime !== null && currentTime > 0) {
            timer = setInterval(() => {
                setCurrentTime((prevTime) => prevTime! - 1);
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
        // backgroundColor: 'blue',
    },
    imagaContainer: {
        // flex: 1,
        alignItems: 'center',
        // position: 'relative',
        justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor: 'purple',
        // padding: 20,
        width: 400,
        height: 400,
    },
    timerCircleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
        position: 'absolute',
    },
    textContainer: {
        position: 'absolute',
        // justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: -10 }],
    },
    startButtonContainer: {
        marginTop: 100,
        // marginBottom: 2,
        marginVertical: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'yellow',
    },
});

export default forwardRef(CircularTimer);
