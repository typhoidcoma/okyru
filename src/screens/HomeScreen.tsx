import { View, Text, StyleSheet } from 'react-native';
import CustomLinearGradient from '../components/CustomLinearGradient';
import IconButton from '../components/IconButton';

import Icon from '../components/Icon';
import CircularTimer from '../components/CircularTimer'; // Import the CircularTimer component
import { GlobalStyles } from '../styles/GlobalStyles';
import React from 'react';

const HomeScreen = () => {
    return (
        <CustomLinearGradient style={styles.gradient}>
            <View style={styles.container}>
                {/* Circular Timer */}
                <CircularTimer
                    size={250}
                    strokeWidth={10}
                    time={60} // Duration of the countdown in seconds (20 seconds)
                    color="#EA0008"
                    onTimerDone={() => console.log('Timer done!')}
                />

                {/* Rest of your UI components */}
                {/* Start Button */}
                {/* <StartButton onPress={handleRestartPress} isRunning={isTimerRunning} /> */}

                {/* Other UI Components */}
                <IconButton
                    svgIconName="01_run"
                    width={64}
                    height={64}
                    onPress={() => console.log('Button pressed')}
                />

                <Icon iconName="26_Menu" size={32} color="red" />
                <Text style={[GlobalStyles.text, styles.appName]}>okyru</Text>
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
