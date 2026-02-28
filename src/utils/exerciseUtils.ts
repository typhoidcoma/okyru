/**
 * Shared exercise utility functions.
 */
import { IconName } from '../components/IconNames';

/**
 * Converts an IconName like '01_run' or '13_dumbelllifts'
 * into a human-readable label like 'Run' or 'Dumbelllifts'.
 */
export function formatExerciseLabel(name: IconName): string {
    const raw = name.replace(/^\d+_/, '');
    const spaced = raw.replace(/_/g, ' ');
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
