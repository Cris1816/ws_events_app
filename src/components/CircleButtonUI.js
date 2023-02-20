import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View, TouchableHighlight, Dimensions, Text } from 'react-native';

const { width, height } = Dimensions.get('window');
const buttonSize = Math.min(width, height) * 0.15;

const CircleButton = ({ onPress }) => 
{
  return (
    <TouchableOpacity
        underlayColor="#ccc"
        onPress={onPress}
        style={styles.button}>
            <Text>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create
({
    button: 
    {
        borderRadius: buttonSize / 2,
        width: buttonSize,
        height: buttonSize,
        backgroundColor: '#E51576',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContent: 
    {
        width: buttonSize * 0.5,
        height: buttonSize * 0.5,
        borderRadius: buttonSize / 4,
        backgroundColor: '#FFF',
    },
});

export default CircleButton;
