import React from 'react';
import { Text, View } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import CustomLinearGradient from '../components/CustomLinearGradient';
import IconButton from '../components/IconButton';
import StartButton from '../components/StartButton';
import Icon from '../components/Icon';
const HomeScreen = () => {
    return (
        <CustomLinearGradient>
            <View style={GlobalStyles.container}>
                <IconButton
                    svgIconName="26_Menu"
                    width={64}
                    height={64}
                    onPress={() => console.log('Button pressed')}
                />
                <StartButton onPress={() => console.log('Start button pressed')} />
                <Text style={GlobalStyles.text}>okyru</Text>
                <Icon iconName="26_Menu" size={64} color="red" />
            </View>
        </CustomLinearGradient>
    );
};

export default HomeScreen;
