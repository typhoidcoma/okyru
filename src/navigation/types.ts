import { IconName } from '../components/IconNames';

export type RootStackParamList = {
    Splash: undefined;
    Home: { action?: 'nextRound' | 'endSession' } | undefined;
    'Icon Test Screen': undefined;
    Settings: undefined;
    Exercises: { exercises: IconName[]; duration: number };
    Stats: undefined;
};

export interface ExerciseResult {
    name: IconName;
    completed: boolean;
}

export interface WorkoutSession {
    id: string;
    date: string;
    duration: number; // timer countdown seconds (work period)
    exerciseDuration: number; // ms to complete exercises (break period)
    exercises: ExerciseResult[];
}
