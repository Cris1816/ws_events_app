import React from 'react'
import { Input, Text } from '@ui-kitten/components'
import { StyleSheet } from 'react-native';

const InputUI = (props) => 
{
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    return (
        <Input
            // status='primary'
            // id = { (props.id != null) ? props.id : null}
            label = { (props.label != null) ? evaProps => <Text {...evaProps} style={ styles.label }>{props.label}</Text> : null}
            placeholder = { props.placeholder }
            size = 'large'
            style = {styles.textInput}
            secureTextEntry = { (props.secureText != null) ?  props.secureText : false}
            accessoryLeft = {(props.icon != null) ? props.icon : null}
            keyboardType = { (props.type != null) ? props.type : 'default'}
            value={props.value}
            onChangeText={ props.onChangeText}
            ref = { input => { props.ref = input } }
            onSubmitEditing = {(props.onSubmitEditing != null) ? props.onSubmitEditing : null}
            />
    )
}

const styles = StyleSheet.create({
    textInput:
    {
        width: '100%',
        marginVertical: 10,
        borderRadius: 25,
        fontFamily: 'Sharp_Sans_SemiBold',
    },
    label:
    {
        color: "#FFF", 
        fontFamily: 'Sharp_Sans_SemiBold', 
        fontSize: 14, 
        paddingBottom: 4,
        paddingLeft: 17,
    }
});

export default InputUI