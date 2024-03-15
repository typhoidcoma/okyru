import React from 'react';
import { StyleSheet, View } from 'react-native';
import Rive, { Alignment, Fit } from 'rive-react-native';

const OkyruLogo = () => {
    return (
        <View style={styles.container}>
            <Rive
                resourceName={'okyru_logo_anim'} // Make sure this points to the correct Rive animation
                fit={Fit.Fill}
                alignment={Alignment.Center}
                autoplay={true}
                // artboardName="Logo" // Uncomment this line if you have an artboard specified
                style={styles.logo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 250,
        // backgroundColor: '#fff',
    },
    logo: {
        width: 250,
        height: 250,
    },
});

export default OkyruLogo;
