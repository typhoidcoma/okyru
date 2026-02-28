import AsyncStorage from '@react-native-async-storage/async-storage';
import { WorkoutSession } from '../navigation/types';

const STORAGE_KEY = 'workoutHistory';

export async function saveWorkoutSession(session: WorkoutSession): Promise<void> {
    try {
        const existing = await AsyncStorage.getItem(STORAGE_KEY);
        const history: WorkoutSession[] = existing ? JSON.parse(existing) : [];
        history.push(session);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
        console.error('Error saving workout session:', error);
    }
}

export async function getWorkoutHistory(): Promise<WorkoutSession[]> {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading workout history:', error);
        return [];
    }
}

function isSameDay(d1: Date, d2: Date): boolean {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

export function getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    // Monday = start of week (day 0 = Sunday → offset 6, else offset day-1)
    const diff = day === 0 ? 6 : day - 1;
    d.setDate(d.getDate() - diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

export async function getSessionsForDate(date: Date): Promise<WorkoutSession[]> {
    const all = await getWorkoutHistory();
    return all.filter(s => isSameDay(new Date(s.date), date));
}

export async function getSessionsForWeek(date: Date): Promise<WorkoutSession[]> {
    const start = getStartOfWeek(date);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    const all = await getWorkoutHistory();
    return all.filter(s => {
        const d = new Date(s.date);
        return d >= start && d < end;
    });
}
