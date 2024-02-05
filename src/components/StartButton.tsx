import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface StartButtonProps {
    onPress: () => void;
    isRunning: boolean; // New prop to indicate whether the timer is running
}

const StartButton: React.FC<StartButtonProps> = ({ onPress, isRunning }) => {
    const [buttonState, setButtonState] = useState<'hover' | 'press' | 'inactive'>('inactive');
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const handlePressIn = () => {
        if (isRunning) {
            setButtonState('press');
            console.log(isRunning);
        }
    };

    const handlePressOut = () => {
        if (!isRunning) {
            setButtonState('inactive');
            console.log(isRunning);
        }
    };

    const handlePress = () => {
        if (!isRunning) {
            setButtonState('press');
            console.log(isRunning);
            onPress();
            const id = setTimeout(() => {
                setButtonState('press');
            }, 100);
            setTimeoutId(id);
        }
    };

    const getButtonImage = (): ImageSourcePropType => {
        if (buttonState === 'hover') {
            return require('../assets/images/buttons/start_button_hover.png');
        } else if (buttonState === 'press') {
            return require('../assets/images/buttons/start_button_inactive.png');
        } else {
            return require('../assets/images/buttons/start_button_active.png');
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonImage: {
        width: 200,
        height: 200,
    },
});

export default StartButton;
