import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import CircularTimer from '../components/CircularTimer';
import CustomLinearGradient from '../components/CustomLinearGradient';
import NavBar from '../components/NavBar';
import GearButton from '../components/GearButton';
import ModalScreen from '../screens/ModalScreen';
import React, { useCallback, useState } from 'react';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(1200);

    const loadSettings = useCallback(async () => {
        try {
            const savedSettings = await AsyncStorage.getItem('timerSettings');
            if (savedSettings) {
                const { time: savedTime } = JSON.parse(savedSettings);
                if (typeof savedTime === 'number' && savedTime > 0) {
                    setTimerSeconds(savedTime);
                }
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadSettings();
        }, [loadSettings])
    );

    const handleTimerDone = () => {
        if (!modalOpened) {
            setModalVisible(true);
            setModalOpened(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const resetModal = () => {
        setModalOpened(false);
    };

    return (
        <CustomLinearGradient style={styles.gradient}>
            {/* Unified NavBar: wordmark left, gear button right */}
            <NavBar
                left={<Text style={styles.wordmark}>okyru</Text>}
                right={
                    <GearButton
                        onPress={() => navigation.navigate('Settings')}
                    />
                }
            />

            {/* Main content */}
            <View style={styles.container}>
                <CircularTimer
                    size={270}
                    strokeWidth={6}
                    time={timerSeconds}
                    color="#ffffff"
                    onTimerDone={handleTimerDone}
                    onReset={resetModal}
                />
            </View>

            {/* Bottom wordmark */}
            <View style={styles.bottomWordmark}>
                <Text style={styles.bottomWordmarkText}>okyru</Text>
            </View>

            {/* Modal overlay */}
            {modalVisible && <ModalScreen onClose={closeModal} />}
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
    wordmark: {
        fontFamily: 'NirmalaB',
        fontSize: 16,
        fontWeight: '700',
        color: 'rgba(224,64,48,0.5)',
        letterSpacing: 2,
    },
    bottomWordmark: {
        alignItems: 'center',
        paddingBottom: 24,
    },
    bottomWordmarkText: {
        fontFamily: 'Nirmala',
        fontSize: 13,
        color: 'rgba(224,64,48,0.4)',
        letterSpacing: 3,
    },
});

export default HomeScreen;
