// Modal component (ModalScreen.tsx)
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ModalScreenProps {
    onClose: () => void; // Callback function to close the modal
}

const ModalScreen: React.FC<ModalScreenProps> = ({ onClose }) => {
    return (
        <View style={styles.container}>
            <Text>Timer Finished!</Text>
            <Button title="Close" onPress={onClose} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)',
        width: '100%',
        height: '100%',
    },
});

export default ModalScreen;
