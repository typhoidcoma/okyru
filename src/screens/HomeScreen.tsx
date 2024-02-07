import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomLinearGradient from '../components/CustomLinearGradient';
import IconButton from '../components/IconButton';
import CircularTimer from '../components/CircularTimer';
import { GlobalStyles } from '../styles/GlobalStyles';

type HomeScreenProps = {
    navigation: StackNavigationProp<any>; // Use the correct type for navigation
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <CustomLinearGradient style={styles.gradient}>
            <View style={styles.container}>
                <CircularTimer
                    size={220}
                    strokeWidth={8}
                    time={1200}
                    color="rgba(234,0,8,.65)"
                    onTimerDone={() => null}
                />

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
