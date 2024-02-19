// CustomLinearGradient.tsx
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';

interface CustomLinearGradientProps {
    children: React.ReactNode;
    style?: object;
    // Add other props you might need, like colors or start/end points
}

const CustomLinearGradient: React.FC<CustomLinearGradientProps> = ({ children, style }) => {
    return (
        <LinearGradient
            // colors={['#EBF3FA', '#DDE7F3', '#E5F0F9']} // Default gradient colors
            colors={['#C80006', '#EA0008', '#C80006']} // Default gradient colors
            style={[styles.container, style]} // Allow custom styles to be passed
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
        >
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Add other default styles for your gradient
    },
    // ... add other styles as needed
});

export default CustomLinearGradient;
