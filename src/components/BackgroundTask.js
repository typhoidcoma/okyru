import BackgroundTimer from 'react-native-background-timer';

const BackgroundTimerTask = async () => {
    // Your timer logic here
    let seconds = 0;

    const timerInterval = BackgroundTimer.setInterval(() => {
        seconds++;
        console.log(`Background Timer: ${seconds} seconds`);

        // Check if you want to stop the timer at a certain point
        if (seconds >= 10) {
            BackgroundTimer.clearInterval(timerInterval);
            console.log('Background Timer stopped');
        }
    }, 1000);

    // Prevent the task from ending immediately
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // This is important to inform the system that the task is finished
    BackgroundTimer.stopBackgroundTimer();
};

export default BackgroundTimerTask;
