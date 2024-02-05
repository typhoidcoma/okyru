import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomLinearGradient from '../components/CustomLinearGradient';
import IconButton from '../components/IconButton';
import StartButton from '../components/StartButton';
import Icon from '../components/Icon';
import CircularTimer from '../components/CircularTimer'; // Import CircularTimer
import { GlobalStyles } from '../styles/GlobalStyles';

const HomeScreen = () => {
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const handleStartButtonPress = () => {
        setIsTimerRunning(false); // Start the timer when the "Start" button is pressed
    };

    const handleTimerDone = () => {
        setIsTimerRunning(true); // Set isTimerRunning to false when the timer is done
    };

    return (
        <CustomLinearGradient style={styles.gradient}>
            <View style={styles.container}>
                <CircularTimer
                    size={160}
                    strokeWidth={10}
                    duration={50000} // Duration of the countdown in milliseconds (10 seconds)
                    color="#EA0008"
                    start={true} // Pass isTimerRunning as the start prop
                    onTimerDone={handleTimerDone} // Handle timer done event
                />

                <IconButton
                    svgIconName="01_run"
                    width={64}
                    height={64}
                    onPress={() => console.log('Button pressed')}
                />
                <StartButton onPress={handleStartButtonPress} isRunning={isTimerRunning} />
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
