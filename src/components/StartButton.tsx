import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface StartButtonProps {
    onPress: () => void;
    isRunning: boolean; // New prop to indicate whether the timer is running
}

const StartButton: React.FC<StartButtonProps> = ({ onPress, isRunning }) => {
    const [buttonState, setButtonState] = useState<'hover' | 'press' | 'inactive'>('inactive');
    const [timeoutId] = useState<number | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    useEffect(() => {
        // Update the buttonState based on the isRunning prop
        if (isRunning) {
            setButtonState('inactive'); // Timer is running, set to inactive
        } else {
            setButtonState('press'); // Timer is not running, set to press
        }
    }, [isRunning]);

    const handlePressIn = () => {
        if (!isRunning) {
            setButtonState('hover');
        }
    };

    const handlePressOut = () => {
        if (!isRunning) {
            setButtonState('inactive');
        }
    };

    const handlePress = () => {
        if (!isRunning) {
            setButtonState('press');
            onPress();
        }
    };

    const getButtonImage = (): ImageSourcePropType => {
        if (buttonState === 'hover') {
            return require('../assets/images/buttons/start_button_red_active.png');
        } else if (buttonState === 'press') {
            return require('../assets/images/buttons/start_button_red_inactive.png');
        } else {
            return require('../assets/images/buttons/start_button_red_active.png');
        }
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            activeOpacity={1}
        >
            <View style={styles.buttonContainer}>
                <Image source={getButtonImage()} style={styles.buttonImage} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    buttonImage: {
        width: 128,
        height: 128,
    },
});

export default StartButton;
