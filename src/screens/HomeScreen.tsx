import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import CustomLinearGradient from '../components/CustomLinearGradient';
import IconButton from '../components/IconButton';
import StartButton from '../components/StartButton';
import Icon from '../components/Icon';

const HomeScreen = () => {
    return (
        <CustomLinearGradient style={styles.gradient}>
            <View style={styles.container}>
                <IconButton
                    svgIconName="01_run"
                    width={64}
                    height={64}
                    onPress={() => console.log('Button pressed')}
                />
                <StartButton onPress={() => console.log('Start button pressed')} />
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
