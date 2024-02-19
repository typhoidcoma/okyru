
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
import { TouchableOpacity, Image, StyleProp, ViewStyle } from 'react-native';

interface CheckboxProps {
    checked: boolean;
    onChange: (isChecked: boolean) => void;
    containerStyle?: StyleProp<ViewStyle>;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, containerStyle }) => {
    const checkedImage = require('./checked.png');
    const uncheckedImage = require('./unchecked.png');

    const toggleCheckbox = () => {
        onChange(!checked);
    };

    return (
        <TouchableOpacity onPress={toggleCheckbox} style={containerStyle}>
            <Image source={checked ? checkedImage : uncheckedImage} />
        </TouchableOpacity>
    );
};

export default Checkbox;
