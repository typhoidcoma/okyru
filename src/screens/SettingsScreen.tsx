import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider'; // Import Slider
import Checkbox from '../components/CheckBox';
import CustomLinearGradient from '../components/CustomLinearGradient';

interface SettingsScreenProps {
    navigation: any; // Use the correct type for navigation
}
const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
    const [time, setTime] = useState(1200); // Default time in seconds

    // Load the saved time when the component mounts
    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const savedSettings = await AsyncStorage.getItem('timerSettings');
            if (savedSettings) {
                const { time: savedTime } = JSON.parse(savedSettings); // Rename to savedTime
                setTime(savedTime); // Set the savedTime in the state
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    };

    const handleSave = async () => {
        try {
            // Save the settings to AsyncStorage
            await AsyncStorage.setItem('timerSettings', JSON.stringify({ time }));
            navigation.goBack(); // Navigate back to the previous screen (HomeScreen)
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    return (
        <CustomLinearGradient>
            <View style={styles.container}>
                <Text style={styles.title}>Settings</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={3600} // Adjust the maximum time as needed
                    step={1}
                    value={time}
                    onValueChange={(value) => setTime(value)}
                />
                <Checkbox
                    checked={time === 0}
                    onChange={(isChecked) => setTime(isChecked ? 0 : 1200)}
                    size={48}   // Add a size prop to the Checkbox component
                />
                <Checkbox
                    checked={time === 0}
                    onChange={(isChecked) => setTime(isChecked ? 0 : 1200)}
                    size={48}   // Add a size prop to the Checkbox component
                />
                <Checkbox
                    checked={time === 0}
                    onChange={(isChecked) => setTime(isChecked ? 0 : 1200)}
                    size={48}   // Add a size prop to the Checkbox component
                />
                <Checkbox
                    checked={time === 0}
                    onChange={(isChecked) => setTime(isChecked ? 0 : 1200)}
                    size={48}   // Add a size prop to the Checkbox component
                />
                <Checkbox
                    checked={time === 0}
                    onChange={(isChecked) => setTime(isChecked ? 0 : 1200)}
                    size={48}   // Add a size prop to the Checkbox component
                />
                <Checkbox
                    checked={time === 0}
                    onChange={(isChecked) => setTime(isChecked ? 0 : 1200)}
                    size={48}   // Add a size prop to the Checkbox component
                />
                <Text>{time} seconds</Text>
                <Button title="Save" onPress={handleSave} />
            </View>
        </CustomLinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    slider: {
        width: '80%',
        marginBottom: 16,
    },
});

export default SettingsScreen;
