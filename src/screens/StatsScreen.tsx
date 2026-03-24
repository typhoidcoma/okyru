/**
 * StatsScreen — FlatDark themed daily and weekly stats display.
 *
 * Shows workout session stats for today and this week:
 *   - Session count
 *   - Total work time (timer durations)
 *   - Total exercise time (break durations)
 *   - Exercise completion breakdown
 */

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomLinearGradient from '../components/CustomLinearGradient';
import FlatDarkCard from '../components/FlatDarkCard';
import Icon from '../components/Icon';
import { RootStackParamList, WorkoutSession } from '../navigation/types';
import { getSessionsForDate, getSessionsForWeek } from '../storage/workoutHistory';
import { IconName } from '../components/IconNames';
import { formatExerciseLabel } from '../utils/exerciseUtils';

interface StatsScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Stats'>;
}

interface StatsData {
    sessionCount: number;
    totalWorkSeconds: number;
    totalExerciseMs: number;
    exerciseCounts: Map<IconName, number>;
}

function computeStats(sessions: WorkoutSession[]): StatsData {
    const exerciseCounts = new Map<IconName, number>();

    let totalWorkSeconds = 0;
    let totalExerciseMs = 0;

    for (const session of sessions) {
        totalWorkSeconds += session.duration;
        totalExerciseMs += session.exerciseDuration || 0;

        for (const ex of session.exercises) {
            if (ex.completed) {
                exerciseCounts.set(ex.name, (exerciseCounts.get(ex.name) || 0) + 1);
            }
        }
    }

    return {
        sessionCount: sessions.length,
        totalWorkSeconds,
        totalExerciseMs,
        exerciseCounts,
    };
}

function formatTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0 && mins > 0) {
        return `${hrs}h ${mins}m`;
    }
    if (hrs > 0) {
        return `${hrs}h`;
    }
    if (mins > 0) {
        return `${mins} min`;
    }
    return `${seconds}s`;
}

function formatMs(ms: number): string {
    return formatTime(Math.round(ms / 1000));
}

const StatsScreen: React.FC<StatsScreenProps> = ({ navigation }) => {
    const [todayStats, setTodayStats] = useState<StatsData | null>(null);
    const [weekStats, setWeekStats] = useState<StatsData | null>(null);

    useFocusEffect(
        useCallback(() => {
            const load = async () => {
                const now = new Date();
                const todaySessions = await getSessionsForDate(now);
                const weekSessions = await getSessionsForWeek(now);
                setTodayStats(computeStats(todaySessions));
                setWeekStats(computeStats(weekSessions));
            };
            load();
        }, [])
    );

    const renderExerciseCounts = (counts: Map<IconName, number>) => {
        const entries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
        if (entries.length === 0) {
            return <Text style={styles.noData}>no exercises yet</Text>;
        }
        return (
            <View style={styles.exerciseGrid}>
                {entries.map(([name, count]) => (
                    <View key={name} style={styles.exerciseItem}>
                        <Icon iconName={name} size={20} color="rgba(234, 0, 8, 0.6)" />
                        <Text style={styles.exerciseCount}>
                            {formatExerciseLabel(name)} ×{count}
                        </Text>
                    </View>
                ))}
            </View>
        );
    };

    const renderSection = (title: string, stats: StatsData | null) => (
        <FlatDarkCard padding={24} style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {stats === null ? (
                <Text style={styles.noData}>loading...</Text>
            ) : stats.sessionCount === 0 ? (
                <Text style={styles.noData}>no sessions yet</Text>
            ) : (
                <>
                    <Text style={styles.statLine}>
                        {stats.sessionCount} session{stats.sessionCount !== 1 ? 's' : ''}
                    </Text>
                    <Text style={styles.statDetail}>
                        {formatTime(stats.totalWorkSeconds)} work
                        {stats.totalExerciseMs > 0
                            ? ` · ${formatMs(stats.totalExerciseMs)} exercise`
                            : ''}
                    </Text>
                    {renderExerciseCounts(stats.exerciseCounts)}
                </>
            )}
        </FlatDarkCard>
    );

    return (
        <CustomLinearGradient style={styles.gradient}>
            <Text style={styles.screenTitle}>stats</Text>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {renderSection('today', todayStats)}
                <View style={styles.sectionSpacer} />
                {renderSection('this week', weekStats)}
            </ScrollView>

            <View style={styles.spacer} />

            <TouchableOpacity
                style={styles.returnButton}
                onPress={() => navigation.goBack()}
                activeOpacity={0.6}
            >
                <Icon iconName="28_return" size={22} color="rgba(255,255,255,0.55)" />
            </TouchableOpacity>

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
    scrollView: {
        flex: 1,
        marginTop: 24,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    sectionCard: {
        borderRadius: 28,
    },
    sectionTitle: {
        fontFamily: 'NirmalaB',
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.4)',
        letterSpacing: 3,
        textTransform: 'lowercase',
        marginBottom: 12,
    },
    statLine: {
        fontFamily: 'NirmalaB',
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 4,
    },
    statDetail: {
        fontFamily: 'Nirmala',
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.5)',
        marginBottom: 16,
    },
    exerciseGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    exerciseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    exerciseCount: {
        fontFamily: 'Nirmala',
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.6)',
    },
    noData: {
        fontFamily: 'Nirmala',
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.3)',
    },
    sectionSpacer: {
        height: 16,
    },
    spacer: {
        flex: 0,
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

export default StatsScreen;
