/**
 * ExercisesScreen — Full-screen exercise checklist.
 *
 * Navigated to when the timer finishes. The user physically does each
 * exercise and checks them off. Tracks how long the exercise break takes.
 *
 *   - "Time's Up!" heading (changes to "Great Work!" when all checked)
 *   - Exercise checklist (all unchecked by default)
 *   - "next round" (disabled until all checked) / "end session" buttons
 *   - Saves workout session before navigating back to Home
 */

import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomLinearGradient from '../components/CustomLinearGradient';
import Icon from '../components/Icon';
import Checkbox from '../components/CheckBox';
import { RootStackParamList, ExerciseResult } from '../navigation/types';
import { FlatDark } from '../styles/GlobalStyles';
import { formatExerciseLabel } from '../utils/exerciseUtils';
import { saveWorkoutSession } from '../storage/workoutHistory';

type Props = NativeStackScreenProps<RootStackParamList, 'Exercises'>;

const ExercisesScreen: React.FC<Props> = ({ navigation, route }) => {
    const { exercises, duration } = route.params;
    const startTime = useRef(Date.now()).current;

    const [results, setResults] = useState<ExerciseResult[]>(() =>
        exercises.map((name) => ({ name, completed: false }))
    );

    const allChecked = results.length > 0 && results.every((r) => r.completed);
    const hasExercises = exercises.length > 0;

    const saveAndNavigate = async (action: 'nextRound' | 'endSession') => {
        const exerciseDurationMs = Date.now() - startTime;
        await saveWorkoutSession({
            id: Date.now().toString(),
            date: new Date().toISOString(),
            duration,
            exerciseDuration: exerciseDurationMs,
            exercises: results,
        });
        navigation.navigate('Home', { action });
    };

    const handleEndSession = () => {
        saveAndNavigate('endSession');
    };

    const handleNextRound = () => {
        if (!allChecked && hasExercises) {
            return;
        }
        saveAndNavigate('nextRound');
    };

    const toggleExercise = (index: number) => {
        setResults((prev) =>
            prev.map((r, i) => (i === index ? { ...r, completed: !r.completed } : r))
        );
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (mins > 0 && secs > 0) {
            return `${mins}m ${secs}s`;
        }
        if (mins > 0) {
            return `${mins} min`;
        }
        return `${secs}s`;
    };

    return (
        <CustomLinearGradient style={styles.gradient}>
            <View style={styles.content}>
                {/* Dynamic heading */}
                <Text style={styles.heading}>
                    {allChecked || !hasExercises ? 'Great Work!' : "Time's Up!"}
                </Text>

                {/* Subtitle */}
                {allChecked || !hasExercises ? (
                    duration > 0 && (
                        <Text style={styles.subtitle}>{formatTime(duration)} completed</Text>
                    )
                ) : (
                    <Text style={styles.subtitle}>do your exercises</Text>
                )}

                {/* Exercise checklist */}
                {hasExercises && (
                    <ScrollView style={styles.exerciseList} showsVerticalScrollIndicator={false}>
                        {results.map((result, index) => (
                            <TouchableOpacity
                                key={result.name}
                                style={styles.exerciseRow}
                                onPress={() => toggleExercise(index)}
                                activeOpacity={0.7}
                            >
                                <Icon
                                    iconName={result.name}
                                    size={28}
                                    color={
                                        result.completed ? FlatDark.accentRed : FlatDark.textSubtle
                                    }
                                />
                                <Text
                                    style={[
                                        styles.exerciseLabel,
                                        !result.completed && styles.exerciseLabelUnchecked,
                                    ]}
                                >
                                    {formatExerciseLabel(result.name)}
                                </Text>
                                <Checkbox
                                    checked={result.completed}
                                    onChange={() => toggleExercise(index)}
                                    size={22}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}

                {/* Spacer */}
                <View style={styles.spacer} />

                {/* Action buttons */}
                <View style={styles.actionsRow}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.endButton]}
                        onPress={handleEndSession}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.actionText, styles.endText]}>end session</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            styles.nextRoundButton,
                            !allChecked && hasExercises && styles.nextRoundDisabled,
                        ]}
                        onPress={handleNextRound}
                        activeOpacity={0.7}
                        disabled={!allChecked && hasExercises}
                    >
                        <Text
                            style={[
                                styles.actionText,
                                styles.nextRoundText,
                                !allChecked && hasExercises && styles.nextRoundTextDisabled,
                            ]}
                        >
                            next round
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </CustomLinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 120,
        paddingHorizontal: 40,
        paddingBottom: 60,
    },
    heading: {
        fontFamily: 'NirmalaB',
        fontSize: 28,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: 'Nirmala',
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.5)',
        textAlign: 'center',
        marginBottom: 32,
    },
    exerciseList: {
        width: '100%',
        maxHeight: 360,
    },
    exerciseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    },
    exerciseLabel: {
        flex: 1,
        fontFamily: 'Nirmala',
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        marginLeft: 14,
    },
    exerciseLabelUnchecked: {
        color: 'rgba(255, 255, 255, 0.35)',
    },
    spacer: {
        flex: 1,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        borderRadius: 24,
        paddingHorizontal: 22,
        paddingVertical: 14,
        borderWidth: 1,
    },
    endButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderColor: 'rgba(255, 255, 255, 0.12)',
    },
    nextRoundButton: {
        backgroundColor: 'rgba(234, 0, 8, 0.15)',
        borderColor: 'rgba(234, 0, 8, 0.3)',
    },
    nextRoundDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderColor: 'rgba(255, 255, 255, 0.06)',
    },
    actionText: {
        fontFamily: 'NirmalaB',
        fontSize: 13,
        letterSpacing: 2,
        textTransform: 'lowercase',
    },
    endText: {
        color: 'rgba(255, 255, 255, 0.5)',
    },
    nextRoundText: {
        color: 'rgba(234, 0, 8, 0.7)',
    },
    nextRoundTextDisabled: {
        color: 'rgba(255, 255, 255, 0.2)',
    },
});

export default ExercisesScreen;
