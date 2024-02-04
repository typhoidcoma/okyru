import React, { FunctionComponent } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useIcons } from './IconProvider'; // Adjust the import path as needed
import { IconName } from './IconNames'; // Adjust the import path as needed

interface IconProps {
    iconName: IconName; // Use IconName type instead of string
    size?: number;
    color?: string;
}

const Icon: FunctionComponent<IconProps> = ({ iconName, size = 24, color = 'purple' }) => {
    // Use IconProps Purple means an error. It should be a color string
    const { getIconComponent } = useIcons(); // Use getIconComponent
    const IconComponent = getIconComponent(iconName);

    if (!IconComponent) {
        return <ActivityIndicator size="small" color="#EA0008" />;
    }

    return (
        <View style={styles.container}>
            <IconComponent width={size} height={size} fill={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Icon;
