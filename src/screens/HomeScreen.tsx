import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomLinearGradient from '../components/CustomLinearGradient';
import IconButton from '../components/IconButton';
import StartButton from '../components/StartButton';
import Icon from '../components/Icon';
import CircularTimer from '../components/CircularTimer';
import { GlobalStyles } from '../styles/GlobalStyles';

const HomeScreen = () => {
    // State to track if the timer is running
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // Handler for starting the timer
    const handleStartPress = () => {
        console.log('Timer True');
        setIsTimerRunning(true); // Start the timer when the "Start" button is pressed
    };

    // Handler for when the timer is done
    const handleTimerDone = () => {
        console.log('Timer done');
        setIsTimerRunning(false); // Set isTimerRunning to false when the timer is done
    };

    return (
        <CustomLinearGradient style={styles.gradient}>
            <View style={styles.container}>
                {/* Circular Timer */}
                <CircularTimer
                    size={250}
                    strokeWidth={10}
                    time={200} // Duration of the countdown in seconds (20 seconds)
                    color="#EA0008"
                    // start={true} // Pass isTimerRunning as the start prop
                    onTimerDone={handleTimerDone} // Handle timer done event
                />

                {/* Rest of your UI components */}
                {/* Start Button */}
                <StartButton onPress={handleStartPress} isRunning={isTimerRunning} />

                {/* Other UI Components */}
                <IconButton
                    svgIconName="01_run"
                    width={64}
                    height={64}
                    onPress={() => console.log('Button pressed')}
                />
                <Text style={[GlobalStyles.text, styles.appName]}>okyru</Text>
                <Icon iconName="26_Menu" size={32} color="red" />
            </View>
        </CustomLinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1, // Ensure gradient fills the screen
    },
    container: {
        flex: 1, // Ensure container takes up the whole gradient space
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center', // Center items vertically
        padding: 20, // Add padding around the content
    },
    appName: {
        marginVertical: 20, // Add vertical space around the app name
    },
    // Add any other styles you need
});

export default HomeScreen;
