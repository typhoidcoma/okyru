
/**
 * Checkbox component for selecting or deselecting an option.
 *
 * @component
 *
 * @param {boolean} checked - Indicates whether the checkbox is checked or not.
 * @param {(isChecked: boolean) => void} onChange - Callback function triggered when the checkbox is toggled.
 * @param {StyleProp<ViewStyle>} [containerStyle] - Optional style for the container of the checkbox.
 *
 * @returns {React.ReactElement} The rendered Checkbox component.
 */
import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';

interface CheckboxProps {
    checked: boolean;
    onChange: (isChecked: boolean) => void;
    containerStyle?: StyleProp<ViewStyle>;
    size?: number;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, containerStyle, size = 24 }) => {
    const checkedImage = require('../assets/images/buttons/checkbox_button_checked.png');
    const uncheckedImage = require('../assets/images/buttons/checkbox_button_unchecked.png');

    const toggleCheckbox = () => {
        onChange(!checked);
    };

    const imageSize: StyleProp<ImageStyle> = {
        width: size,
        height: size,
    };

    return (
        <TouchableOpacity onPress={toggleCheckbox} style={[containerStyle, imageSize]}>
            <Image source={checked ? checkedImage : uncheckedImage} style={imageSize} />
        </TouchableOpacity>
    );
};

export default Checkbox;
