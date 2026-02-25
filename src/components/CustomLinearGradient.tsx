// CustomLinearGradient.tsx
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View } from 'react-native';

interface CustomLinearGradientProps {
    children: React.ReactNode;
    style?: object;
    // Add other props you might need, like colors or start/end points
}

const CustomLinearGradient: React.FC<CustomLinearGradientProps> = ({ children, style }) => {
    return (
        <View style={[styles.container, style]}>
            <LinearGradient
                colors={['#273243', '#1f2a3a', '#182231', '#101a28', '#0b1420', '#070d16']}
                locations={[0, 0.16, 0.34, 0.56, 0.78, 1]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            {/* Soft overlay to break up visible 8-bit band edges on dark Android gradients */}
            <LinearGradient
                colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0)', 'rgba(0,0,0,0.06)']}
                locations={[0, 0.42, 1]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0.08, y: 0 }}
                end={{ x: 0.9, y: 1 }}
                pointerEvents="none"
            />

            {children}
        </View>
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
