import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider'; // Import Slider
import Checkbox from '../components/CheckBox';
import CustomLinearGradient from '../components/CustomLinearGradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface SettingsScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
}
const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
    const [time, setTime] = useState(1200); // Default time in seconds
    const [enabled, setEnabled] = useState(true);

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
                setEnabled(savedTime > 0);
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
                    onValueChange={(value) => {
                        setEnabled(true);
                        setTime(value);
                    }}
                />
                <Checkbox
                    checked={!enabled}
                    onChange={(isChecked) => {
                        const isDisabled = isChecked;
                        setEnabled(!isDisabled);
                        if (isDisabled) {
                            setTime(0);
                        } else if (time === 0) {
                            setTime(1200);
                        }
                    }}
                    size={48}
                />
                <Text style={styles.helperText}>Disable reminders</Text>
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
    helperText: {
        marginVertical: 12,
    },
});

export default SettingsScreen;
