import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomLinearGradient from '../components/CustomLinearGradient';
import IconButton from '../components/IconButton';
import CircularTimer from '../components/CircularTimer';
import { GlobalStyles } from '../styles/GlobalStyles';
import ModalScreen from '../screens/ModalScreen';

type HomeScreenProps = {
    navigation: StackNavigationProp<any>; // Use the correct type for navigation
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
    const [modalOpened, setModalOpened] = useState(false); // State to track whether modal has been opened

    const handleTimerDone = () => {
        if (!modalOpened) {
            setModalVisible(true); // Show the modal only if it hasn't been opened before
            setModalOpened(true); // Update the state to indicate that the modal has been opened
        }
    };

    const closeModal = () => {
        setModalVisible(false); // Close the modal
    };

    const resetModal = () => {
        setModalOpened(false); // Reset the state to indicate that the modal hasn't been opened yet
    };
    return (
        <CustomLinearGradient style={styles.gradient}>
            <View style={styles.container}>
                <CircularTimer
                    size={220}
                    strokeWidth={8}
                    time={10}
                    color="rgba(234,0,8,.65)"
                    onTimerDone={() => handleTimerDone()}
                    onReset={resetModal} // Pass the resetModal function to CircularTimer
                />

                {modalVisible && <ModalScreen onClose={closeModal} />}

                {/* Rest of your UI components */}
                <IconButton
                    svgIconName="26_Menu"
                    width={80}
                    height={80}
                    onPress={() => navigation.navigate('Settings')}
                />
                <Text style={[GlobalStyles.text, styles.appName]}>okyru</Text>
            </View>
        </CustomLinearGradient>
    );
};

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

export default HomeScreen;
