import { GlobalStyles } from '../styles/GlobalStyles'; // Importing GlobalStyles for consistent styling
import { StackNavigationProp } from '@react-navigation/stack'; // Importing StackNavigationProp for navigation
import { View, Text, StyleSheet } from 'react-native';
import CircularTimer from '../components/CircularTimer'; // Importing CircularTimer component
import CustomLinearGradient from '../components/CustomLinearGradient'; // Importing CustomLinearGradient component
import IconButton from '../components/IconButton'; // Importing IconButton component
import ModalScreen from '../screens/ModalScreen'; // Importing ModalScreen component
import React, { useState } from 'react';

type HomeScreenProps = {
    navigation: StackNavigationProp<any>; // Define the type for navigation prop
};

// Define the HomeScreen component
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    // State to manage modal visibility
    const [modalVisible, setModalVisible] = useState(false);
    // State to track whether modal has been opened
    const [modalOpened, setModalOpened] = useState(false);

    // Function to handle timer done event
    const handleTimerDone = () => {
        // Show the modal only if it hasn't been opened before
        if (!modalOpened) {
            setModalVisible(true);
            // Update the state to indicate that the modal has been opened
            setModalOpened(true);
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setModalVisible(false);
    };

    // Function to reset the state to indicate that the modal hasn't been opened yet
    const resetModal = () => {
        setModalOpened(false);
    };

    // Render the HomeScreen component
    return (
        <CustomLinearGradient style={styles.gradient}>
            {/* Container for the main content */}
            <View style={styles.container}>
                {/* Circular timer component */}
                <CircularTimer
                    size={220}
                    strokeWidth={8}
                    time={30}
                    color="rgba(234,0,8,.65)"
                    // Pass the function to handle timer done event
                    onTimerDone={handleTimerDone}
                    // Pass the function to reset modal state
                    onReset={resetModal}
                />

                {/* Rest of your UI components */}
                {/* IconButton for navigation */}
                <IconButton
                    svgIconName="26_Menu"
                    width={80}
                    height={80}
                    // Navigate to Settings screen on press
                    onPress={() => navigation.navigate('Settings')}
                />
                {/* Text component */}
                <Text style={[GlobalStyles.text, styles.appName]}>okyru</Text>
            </View>
            {/* ModalScreen component, conditionally rendered based on modalVisible state */}
            {modalVisible && <ModalScreen onClose={closeModal} />}
        </CustomLinearGradient>
    );
};

// Define the styles for the HomeScreen component
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appName: {
        marginVertical: 10,
        alignSelf: 'auto',
    },
});

// Export the HomeScreen component as default
export default HomeScreen;
