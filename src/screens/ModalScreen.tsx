/**
 * ModalScreen — FlatDark themed exercise checklist modal.
 *
 * Shown when the timer finishes. The user physically does each exercise
 * and checks them off. Tracks how long the exercise break takes.
 *
 *   - "Time's Up!" heading (changes to "Great Work!" when all checked)
 *   - Exercise checklist (all unchecked by default)
 *   - "next round" (disabled until all checked) / "end session" buttons
 *   - Both buttons save results + exercise duration via onSave
 */

import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
    ScrollView,
} from 'react-native';
import FlatDarkCard from '../components/FlatDarkCard';
import Icon from '../components/Icon';
import Checkbox from '../components/CheckBox';
import { IconName } from '../components/IconNames';
import { ExerciseResult } from '../navigation/types';
import { FlatDark } from '../styles/GlobalStyles';
import { formatExerciseLabel } from '../utils/exerciseUtils';

interface ModalScreenProps {
    onClose: () => void;
    onNextRound?: () => void;
    onSave?: (results: ExerciseResult[], exerciseDurationMs: number) => void;
    exercises: IconName[];
    duration?: number;
}

const ModalScreen: React.FC<ModalScreenProps> = ({
    onClose,
    onNextRound,
    onSave,
    exercises,
    duration,
}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;
    const startTime = useRef(Date.now()).current;

    // Initialize all exercises as unchecked — user checks them off as they complete each one
    const [results, setResults] = useState<ExerciseResult[]>(() =>
        exercises.map((name) => ({ name, completed: false }))
    );

    const allChecked = results.length > 0 && results.every((r) => r.completed);
    const hasExercises = exercises.length > 0;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 350,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 350,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    const animateOut = (callback: () => void, speed = 250) => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: speed,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 40,
                duration: speed,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start(() => callback());
    };

    const saveResults = () => {
        const elapsed = Date.now() - startTime;
        onSave?.(results, elapsed);
    };

    const handleEndSession = () => {
        saveResults();
        animateOut(onClose);
    };

    const handleNextRound = () => {
        if (!allChecked && hasExercises) {
            return;
        }
        saveResults();
        animateOut(() => onNextRound?.(), 200);
    };

    const toggleExercise = (index: number) => {
        setResults((prev) =>
            prev.map((r, i) => (i === index ? { ...r, completed: !r.completed } : r))
        );
    };

    const formatDuration = (seconds: number): string => {
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
        <View style={styles.backdrop}>
            <Animated.View
                style={[
                    styles.cardWrapper,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <FlatDarkCard padding={32} style={styles.card}>
                    {/* Dynamic heading */}
                    <Text style={styles.heading}>
                        {allChecked || !hasExercises ? 'Great Work!' : "Time's Up!"}
                    </Text>

                    {/* Subtitle */}
                    {allChecked || !hasExercises ? (
                        duration != null &&
                        duration > 0 && (
                            <Text style={styles.subtitle}>
                                {formatDuration(duration)} completed
                            </Text>
                        )
                    ) : (
                        <Text style={styles.subtitle}>do your exercises</Text>
                    )}

                    {/* Exercise checklist */}
                    {hasExercises && (
                        <ScrollView
                            style={styles.exerciseList}
                            showsVerticalScrollIndicator={false}
                        >
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
                                            result.completed
                                                ? FlatDark.accentRed
                                                : FlatDark.textSubtle
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

                    {/* Action buttons */}
                    <View style={styles.actionsRow}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.endButton]}
                            onPress={handleEndSession}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.actionText, styles.endText]}>end session</Text>
                        </TouchableOpacity>
                        {onNextRound && (
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
                        )}
                    </View>
                </FlatDarkCard>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardWrapper: {
        width: '85%',
        maxWidth: 300,
        maxHeight: '80%',
    },
    card: {
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'NirmalaB',
        fontSize: 24,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: 'Nirmala',
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.5)',
        textAlign: 'center',
        marginBottom: 20,
    },
    exerciseList: {
        width: '100%',
        maxHeight: 260,
        marginBottom: 20,
    },
    exerciseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 4,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    },
    exerciseLabel: {
        flex: 1,
        fontFamily: 'Nirmala',
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.8)',
        marginLeft: 12,
    },
    exerciseLabelUnchecked: {
        color: 'rgba(255, 255, 255, 0.35)',
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 12,
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

export default ModalScreen;
