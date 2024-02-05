import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import GlobalStyles from '../styles/GlobalStyles';

interface CircularTimerProps {
    size: number;
    strokeWidth: number;
    time: number; // Input time in seconds
    color: string;
    onTimerDone: () => void;
}

const CircularTimer: React.FC<CircularTimerProps> = ({
    size,
    strokeWidth,
    time,
    color,
    onTimerDone,
}) => {
    const [currentTime, setCurrentTime] = useState(time);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (currentTime > 0) {
            timer = setInterval(() => {
                setCurrentTime((prevTime) => prevTime - 1);
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
            <View style={styles.textContainer}>
                <Text style={GlobalStyles.timerText}>{formatTime(currentTime)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    textContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CircularTimer;