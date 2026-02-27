import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import CustomLinearGradient from '../components/CustomLinearGradient';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import Icon from '../components/Icon';
import { IconName } from '../components/IconNames';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

// Exercise grid layout matching Figma (5 columns × 5 rows)
const EXERCISE_GRID: { id: IconName; label: string }[][] = [
    [
        { id: '01_run', label: 'Run' },
        { id: '02_swim', label: 'Swim' },
        { id: '03_bandstretchs', label: 'Band Stretch' },
        { id: '04_standingstretch', label: 'Standing Stretch' },
        { id: '10_liftedlegsitups', label: 'Leg Sit-ups' },
    ],
    [
        { id: '06_bike', label: 'Bike' },
        { id: '07_walk', label: 'Walk' },
        { id: '08_lift', label: 'Lift' },
        { id: '05_stepups', label: 'Step-ups' },
        { id: '20_standingtoetouch', label: 'Toe Touch' },
    ],
    [
        { id: '11_crunches', label: 'Crunches' },
        { id: '12_pushups', label: 'Push-ups' },
        { id: '09_situps', label: 'Sit-ups' },
        { id: '15_dumbellpress', label: 'Dumbbell Press' },
        { id: '25_weightedlegdip', label: 'Weighted Leg Dip' },
    ],
    [
        { id: '16_leglifts', label: 'Leg Lifts' },
        { id: '18_treadmil', label: 'Treadmill' },
        { id: '13_dumbelllifts', label: 'Dumbbell Lifts' },
        { id: '14_leglift', label: 'Leg Lift' },
        { id: '24_batlleropes', label: 'Battle Ropes' },
    ],
    [
        { id: '21_stationarybike', label: 'Stationary Bike' },
        { id: '17_jumprope', label: 'Jump Rope' },
        { id: '23_skimachine', label: 'Ski Machine' },
        { id: '19_kettlebell', label: 'Kettlebell' },
        { id: '22_yogapose', label: 'Yoga' },
    ],
];

interface SettingsScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
}

const ICON_SIZE = 48;
const ICON_COLOR = '#E04030';
const ICON_COLOR_SELECTED = '#FF6B5E';

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
    const [time, setTime] = useState(1200);
    const [enabled, setEnabled] = useState(true);
    const [selectedExercise, setSelectedExercise] = useState<IconName | null>(null);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const savedSettings = await AsyncStorage.getItem('timerSettings');
            if (savedSettings) {
                const { time: savedTime, exercise } = JSON.parse(savedSettings);
                setTime(savedTime);
                setEnabled(savedTime > 0);
                if (exercise) setSelectedExercise(exercise);
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    };

    const handleSave = async () => {
        try {
            await AsyncStorage.setItem(
                'timerSettings',
                JSON.stringify({ time, exercise: selectedExercise })
            );
            navigation.goBack();
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleExercisePress = (exerciseId: IconName) => {
        setSelectedExercise(prev => (prev === exerciseId ? null : exerciseId));
    };

    return (
        <CustomLinearGradient>
            {/* Unified NavBar: back button left, title center */}
            <NavBar
                left={
                    <BackButton onPress={() => navigation.goBack()} />
                }
                center={<Text style={styles.navTitle}>settings</Text>}
            />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Exercise Icon Grid */}
                <View style={styles.gridContainer}>
                    {EXERCISE_GRID.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.gridRow}>
                            {row.map((exercise) => {
                                const isSelected = selectedExercise === exercise.id;
                                return (
                                    <TouchableOpacity
                                        key={exercise.id}
                                        style={[
                                            styles.iconCell,
                                            isSelected && styles.iconCellSelected,
                                        ]}
                                        onPress={() => handleExercisePress(exercise.id)}
                                        activeOpacity={0.7}
                                    >
                                        <Icon
                                            iconName={exercise.id}
                                            size={ICON_SIZE}
                                            color={isSelected ? ICON_COLOR_SELECTED : ICON_COLOR}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ))}
                </View>

                {/* Timer Settings */}
                <View style={styles.timerSection}>
                    <Text style={styles.timerLabel}>
                        {enabled ? formatTime(time) : 'disabled'}
                    </Text>

                    <Slider
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={3600}
                        step={1}
                        value={time}
                        onValueChange={(value) => {
                            setEnabled(true);
                            setTime(value);
                        }}
                        minimumTrackTintColor="rgba(224,64,48,0.6)"
                        maximumTrackTintColor="rgba(255,255,255,0.12)"
                        thumbTintColor="rgba(224,64,48,0.8)"
                        disabled={!enabled}
                    />
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                    activeOpacity={0.7}
                >
                    <Text style={styles.saveButtonText}>save</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom wordmark */}
            <View style={styles.bottomWordmark}>
                <Text style={styles.bottomWordmarkText}>okyru</Text>
            </View>
        </CustomLinearGradient>
    );
};

const styles = StyleSheet.create({
    navTitle: {
        fontFamily: 'Nirmala',
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 2,
        textTransform: 'lowercase',
    },
    scrollView: {
        flex: 1,
        marginTop: 90,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 16,
        alignItems: 'center',
    },
    // Exercise icon grid
    gridContainer: {
        width: '100%',
        paddingVertical: 16,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 8,
    },
    iconCell: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
    iconCellSelected: {
        backgroundColor: 'rgba(224,64,48,0.12)',
        borderWidth: 1,
        borderColor: 'rgba(224,64,48,0.25)',
    },
    // Timer section
    timerSection: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.06)',
    },
    timerLabel: {
        fontFamily: 'Nirmala',
        fontSize: 28,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 16,
        letterSpacing: 1,
    },
    slider: {
        width: '85%',
        marginBottom: 8,
    },
    // Save button
    saveButton: {
        backgroundColor: 'rgba(224,64,48,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(224,64,48,0.3)',
        borderRadius: 24,
        paddingHorizontal: 48,
        paddingVertical: 14,
        marginTop: 12,
    },
    saveButtonText: {
        fontFamily: 'NirmalaB',
        fontSize: 14,
        color: 'rgba(224,64,48,0.7)',
        letterSpacing: 2,
        textTransform: 'lowercase',
    },
    // Bottom wordmark
    bottomWordmark: {
        alignItems: 'center',
        paddingBottom: 24,
    },
    bottomWordmarkText: {
        fontFamily: 'Nirmala',
        fontSize: 13,
        color: 'rgba(224,64,48,0.4)',
        letterSpacing: 3,
    },
});

export default SettingsScreen;
