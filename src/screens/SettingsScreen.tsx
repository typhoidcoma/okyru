/**
 * SettingsScreen — FlatDark theme.
 *
 * Exercise icon grid: 5 cols × 5 rows, 48px icons with labels underneath.
 * Icons are multi-select toggles (independent on/off).
 * Timer duration slider (1–30 min).
 * Settings auto-save when navigating back.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLinearGradient from '../components/CustomLinearGradient';
import Icon from '../components/Icon';
import { IconName } from '../components/IconNames';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { bounceSelect } from '../utils/animations';
import TimerDurationSlider from '../components/TimerDurationSlider';
import { formatExerciseLabel } from '../utils/exerciseUtils';

const EXERCISE_GRID: IconName[][] = [
    ['01_run', '02_swim', '03_bandstretchs', '04_standingstretch', '10_liftedlegsitups'],
    ['06_bike', '07_walk', '08_lift', '05_stepups', '20_standingtoetouch'],
    ['11_crunches', '12_pushups', '09_situps', '15_dumbellpress', '25_weightedlegdip'],
    ['16_leglifts', '18_treadmil', '13_dumbelllifts', '14_leglift', '24_batlleropes'],
    ['21_stationarybike', '17_jumprope', '23_skimachine', '19_kettlebell', '22_yogapose'],
];

const ICON_SIZE = 44;
const ICON_COLOR_UNSELECTED = '#8A3028';
const ICON_COLOR_SELECTED = '#E84030';
const LABEL_COLOR_UNSELECTED = 'rgba(138, 48, 40, 0.6)';
const LABEL_COLOR_SELECTED = 'rgba(232, 64, 48, 0.8)';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ROW_SPACING = 80;

interface SettingsScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
    const [time, setTime] = useState(1200);
    const [selectedExercises, setSelectedExercises] = useState<Set<IconName>>(new Set());

    // Animation refs for each exercise icon
    const scaleAnims = useRef<{ [key: string]: Animated.Value }>({}).current;

    const getScaleAnim = (id: string): Animated.Value => {
        if (!scaleAnims[id]) {
            scaleAnims[id] = new Animated.Value(1);
        }
        return scaleAnims[id];
    };

    useEffect(() => {
        loadSettings();
    }, []);

    // Auto-save when navigating away
    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            saveSettings();
        });
        return unsubscribe;
    }, [navigation, saveSettings]);

    const loadSettings = async () => {
        try {
            const savedSettings = await AsyncStorage.getItem('timerSettings');
            if (savedSettings) {
                const { time: savedTime, exercises, exercise } = JSON.parse(savedSettings);
                if (typeof savedTime === 'number') {
                    setTime(savedTime);
                }
                if (exercises && Array.isArray(exercises)) {
                    setSelectedExercises(new Set(exercises));
                } else if (exercise) {
                    setSelectedExercises(new Set([exercise]));
                }
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    };

    const saveSettings = useCallback(async () => {
        try {
            await AsyncStorage.setItem(
                'timerSettings',
                JSON.stringify({ time, exercises: Array.from(selectedExercises) })
            );
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }, [time, selectedExercises]);

    const handleExercisePress = (exerciseId: IconName) => {
        const anim = getScaleAnim(exerciseId);
        bounceSelect(anim);
        setSelectedExercises((prev) => {
            const next = new Set(prev);
            if (next.has(exerciseId)) {
                next.delete(exerciseId);
            } else {
                next.add(exerciseId);
            }
            return next;
        });
    };

    const handleReturn = () => {
        saveSettings();
        navigation.goBack();
    };

    return (
        <CustomLinearGradient style={styles.gradient}>
            {/* "settings" title */}
            <Text style={styles.screenTitle}>settings</Text>

            {/* Timer Duration Slider */}
            <View style={styles.sliderContainer}>
                <TimerDurationSlider value={time} onValueChange={setTime} />
            </View>

            {/* Exercise Icon Grid with Labels */}
            <View style={styles.gridContainer}>
                {EXERCISE_GRID.map((row, rowIndex) => (
                    <View
                        key={rowIndex}
                        style={[
                            styles.gridRow,
                            { marginTop: rowIndex === 0 ? 0 : ROW_SPACING - ICON_SIZE - 16 },
                        ]}
                    >
                        {row.map((exerciseId) => {
                            const isSelected = selectedExercises.has(exerciseId);
                            const scaleAnim = getScaleAnim(exerciseId);
                            return (
                                <Animated.View
                                    key={exerciseId}
                                    style={[
                                        styles.iconCellWrapper,
                                        { transform: [{ scale: scaleAnim }] },
                                    ]}
                                >
                                    <TouchableOpacity
                                        onPress={() => handleExercisePress(exerciseId)}
                                        activeOpacity={0.6}
                                        style={[
                                            styles.iconCell,
                                            isSelected && styles.iconCellSelected,
                                        ]}
                                    >
                                        <Icon
                                            iconName={exerciseId}
                                            size={ICON_SIZE}
                                            color={
                                                isSelected
                                                    ? ICON_COLOR_SELECTED
                                                    : ICON_COLOR_UNSELECTED
                                            }
                                        />
                                    </TouchableOpacity>
                                    <Text
                                        style={[
                                            styles.iconLabel,
                                            {
                                                color: isSelected
                                                    ? LABEL_COLOR_SELECTED
                                                    : LABEL_COLOR_UNSELECTED,
                                            },
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {formatExerciseLabel(exerciseId)}
                                    </Text>
                                </Animated.View>
                            );
                        })}
                    </View>
                ))}
            </View>

            {/* Spacer */}
            <View style={styles.spacer} />

            {/* Return icon */}
            <TouchableOpacity
                style={styles.returnButton}
                onPress={handleReturn}
                activeOpacity={0.6}
            >
                <Icon iconName="28_return" size={22} color="rgba(255,255,255,0.55)" />
            </TouchableOpacity>

            {/* Bottom padding */}
            <View style={styles.bottomPadding} />
        </CustomLinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    screenTitle: {
        fontFamily: 'Nirmala',
        fontSize: 32,
        color: '#D8DCE3',
        textAlign: 'center',
        marginTop: 90,
        letterSpacing: 0,
    },
    sliderContainer: {
        paddingHorizontal: 24,
        marginTop: 16,
    },
    gridContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconCellWrapper: {
        alignItems: 'center',
        width: (SCREEN_WIDTH - 40) / 5,
    },
    iconCell: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.65,
    },
    iconCellSelected: {
        opacity: 1,
        shadowColor: '#EA0008',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    iconLabel: {
        fontFamily: 'Nirmala',
        fontSize: 9,
        textAlign: 'center',
        marginTop: 2,
    },
    spacer: {
        flex: 1,
    },
    returnButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        alignSelf: 'center',
    },
    bottomPadding: {
        height: 48,
    },
});

export default SettingsScreen;
