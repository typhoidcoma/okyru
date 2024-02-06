import { HeadlessJsTaskConfig, HeadlessJsTaskService } from 'react-native-headless-js-task';
import { NativeModules } from 'react-native';

const { BackgroundServiceModule } = NativeModules;

export const startBackgroundService = () => {
    // Define your taskKey and other task parameters here
    const taskKey = 'YOUR_BACKGROUND_TASK_KEY';
    const taskConfig = new HeadlessJsTaskConfig(
        taskKey,
        {},
        5000, // Timeout (milliseconds)
        true // Allow in background
    );

    HeadlessJsTaskService.start(taskConfig);
};

export const stopBackgroundService = () => {
    BackgroundServiceModule.stopService(); // Define a native module to stop the service
};
