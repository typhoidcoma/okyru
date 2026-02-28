/**
 * HomeScreen — FlatDark theme.
 *
 * Layout:
 *   - Top bar: "okyru" wordmark (left) + menu icon (right)
 *   - Timer: centered, 276x276
 *   - StartButton: below timer, 62x62
 *   - Selected exercises row
 *   - Stats icon: bottom center
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CircularTimer, { CircularTimerRef } from '../components/CircularTimer';
import StartButton from '../components/StartButton';
import { TimerState } from '../components/StartButton';
import CustomLinearGradient from '../components/CustomLinearGradient';
import Icon from '../components/Icon';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconName } from '../components/IconNames';
import SelectedExercisesRow from '../components/SelectedExercisesRow';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
    const [timerSeconds, setTimerSeconds] = useState(1200);
    const [selectedExercises, setSelectedExercises] = useState<IconName[]>([]);
    const [timerState, setTimerState] = useState<TimerState>('idle');
    const timerRef = useRef<CircularTimerRef>(null);
    const [timerKey, setTimerKey] = useState(0);

    const loadSettings = useCallback(async () => {
        try {
            const savedSettings = await AsyncStorage.getItem('timerSettings');
            if (savedSettings) {
                const { time: savedTime, exercises, exercise } = JSON.parse(savedSettings);
                if (typeof savedTime === 'number' && savedTime > 0) {
                    setTimerSeconds(savedTime);
                }
                if (exercises && Array.isArray(exercises)) {
                    setSelectedExercises(exercises);
                } else if (exercise) {
                    setSelectedExercises([exercise]);
                } else {
                    setSelectedExercises([]);
                }
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadSettings();
        }, [loadSettings])
    );

    // Handle action param when returning from ExercisesScreen
    useEffect(() => {
        const action = route.params?.action;
        if (!action) return;

        if (action === 'nextRound') {
            timerRef.current?.handleButtonPress();
        } else if (action === 'endSession') {
            setTimerKey(prev => prev + 1);
        }

        navigation.setParams({ action: undefined });
    }, [route.params?.action, navigation]);

    const handleTimerDone = () => {
        navigation.navigate('Exercises', {
            exercises: selectedExercises,
            duration: timerSeconds,
        });
    };

    const handleStartButtonPress = () => {
        timerRef.current?.handleButtonPress();
    };

    const handleTimerStateChange = (state: TimerState) => {
        setTimerState(state);
    };

    return (
        <CustomLinearGradient style={styles.gradient}>
            {/* Top bar: wordmark left, menu right */}
            <View style={styles.topBar}>
                <Text style={styles.wordmarkText}>okyru</Text>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => navigation.navigate('Settings')}
                    activeOpacity={0.6}
                >
                    <Icon iconName="26_Menu" size={24} color="rgba(255,255,255,0.55)" />
                </TouchableOpacity>
            </View>

            {/* Timer */}
            <View style={styles.timerArea}>
                <CircularTimer
                    ref={timerRef}
                    key={timerKey}
                    size={276}
                    strokeWidth={26}
                    time={timerSeconds}
                    color="#EA0008"
                    onTimerDone={handleTimerDone}
                    onReset={() => {}}
                    onTimerStateChange={handleTimerStateChange}
                />
            </View>

            {/* Spacer above button */}
            <View style={styles.spacer} />

            {/* StartButton — centered between timer and exercises */}
            <View style={styles.startButtonArea}>
                <StartButton
                    onPress={handleStartButtonPress}
                    timerState={timerState}
                    size={62}
                />
            </View>

            {/* Spacer below button */}
            <View style={styles.spacer} />

            {/* Selected exercises */}
            {selectedExercises.length > 0 && (
                <View style={styles.selectedExercisesArea}>
                    <SelectedExercisesRow exercises={selectedExercises} />
                </View>
            )}

            {/* Stats button — bottom center */}
            <TouchableOpacity
                style={styles.statsButton}
                onPress={() => navigation.navigate('Stats')}
                activeOpacity={0.6}
            >
                <Icon iconName="29_stats" size={24} color="rgba(255,255,255,0.55)" />
            </TouchableOpacity>

            {/* Bottom padding */}
            <View style={styles.bottomPad} />
        </CustomLinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 48,
        paddingHorizontal: 20,
    },
    wordmarkText: {
        fontFamily: 'Nirmala',
        fontSize: 14,
        color: '#C84030',
        letterSpacing: 3,
    },
    menuButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
    },
    timerArea: {
        alignItems: 'center',
        paddingTop: 24,
    },
    startButtonArea: {
        alignItems: 'center',
    },
    selectedExercisesArea: {
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 40,
    },
    spacer: {
        flex: 1,
    },
    statsButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        alignSelf: 'center',
    },
    bottomPad: {
        height: 24,
    },
});

export default HomeScreen;
