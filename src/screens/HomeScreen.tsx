import { View, Text, StyleSheet } from 'react-native';
import CustomLinearGradient from '../components/CustomLinearGradient';
import IconButton from '../components/IconButton';
import CircularTimer from '../components/CircularTimer'; // Import the CircularTimer component
import { GlobalStyles } from '../styles/GlobalStyles';
import React from 'react';

const HomeScreen = () => {
    return (
        <CustomLinearGradient style={styles.gradient}>
            <View style={styles.container}>
                {/* Circular Timer */}
                <CircularTimer
                    size={220}
                    strokeWidth={8}
                    time={1200} // Duration of the countdown in seconds (20 seconds)
                    color="rgba(234,0,8,.65)"
                    onTimerDone={() => console.log('Timer done!')}
                />

                {/* Rest of your UI components */}
                {/* Start Button */}
                {/* <StartButton onPress={handleRestartPress} isRunning={isTimerRunning} /> */}

                {/* Other UI Components */}
                <IconButton
                    svgIconName="26_Menu"
                    width={80}
                    height={80}
                    onPress={() => console.log('Button pressed')}
                />

                {/* <Icon iconName="26_Menu" size={32} color="red" /> */}
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
        justifyContent: 'center', // Center the content
        alignItems: 'center', // Center the content
    },
    appName: {
        marginVertical: 10, // Add vertical space around the app name
        alignSelf: 'auto', // Center the app name
    },
    buttonStyle: {
        alignSelf: 'center',
    },
    // Add any other styles you need
});

export default HomeScreen;
