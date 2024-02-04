// IconTestScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import Icon from '../components/Icon'; // Adjust the path as needed

type IconName =
    | '01_run'
    | '02_swim'
    | '03_bandstretchs'
    | '04_standingstretch'
    | '05_stepups'
    | '06_bike'
    | '07_walk'
    | '08_lift'
    | '09_situps'
    | '10_liftedlegsitups'
    | '11_crunches'
    | '12_pushups'
    | '13_dumbelllifts'
    | '14_leglift'
    | '15_dumbellpress'
    | '16_leglifts'
    | '17_jumprope'
    | '18_treadmil'
    | '19_kettlebell'
    | '20_standingtoetouch'
    | '21_stationarybike'
    | '22_yogapose'
    | '23_skimachine'
    | '24_batlleropes'
    | '25_weightedlegdip'
    | '26_Menu';

const iconNames: IconName[] = [
    '01_run',
    '02_swim',
    '03_bandstretchs',
    '04_standingstretch',
    '05_stepups',
    '06_bike',
    '07_walk',
    '08_lift',
    '09_situps',
    '10_liftedlegsitups',
    '11_crunches',
    '12_pushups',
    '13_dumbelllifts',
    '14_leglift',
    '15_dumbellpress',
    '16_leglifts',
    '17_jumprope',
    '18_treadmil',
    '19_kettlebell',
    '20_standingtoetouch',
    '21_stationarybike',
    '22_yogapose',
    '23_skimachine',
    '24_batlleropes',
    '25_weightedlegdip',
    '26_Menu',
];

const numColumns = 4; // Number of columns in the grid
const screenWidth = Dimensions.get('window').width;
const iconSize = screenWidth / numColumns; // Adjust the size of the icons based on screen width

const IconTestScreen: React.FC = () => {
    return (
        <View style={GlobalStyles.container}>
            <FlatList
                scrollEnabled={true}
                data={iconNames}
                style={styles.container}
                numColumns={numColumns}
                keyExtractor={(item) => item}
                renderItem={({ item: iconName }) => (
                    <View style={styles.iconContainer}>
                        <Icon iconName={iconName} size={64} color="green" />
                        <Text style={GlobalStyles.text}>{iconName}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#transparent',
    },
    iconContainer: {
        width: iconSize,
        height: iconSize,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        borderWidth: 5, // Optional, just for visual separation
        borderColor: '#eee', // Optional, color for visual separation
    },
    iconText: {
        marginTop: 5, // Space between icon and text
        fontSize: 10, // Smaller text size for the grid layout
        textAlign: 'center', // Center the text below the icon
    },
});

export default IconTestScreen;
