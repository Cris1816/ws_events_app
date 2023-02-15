import React from 'react'
import { Button, Icon } from '@ui-kitten/components';
import { Layout, Text } from '@ui-kitten/components/ui';
import { StyleSheet } from 'react-native';

const StarIcon = () => 
(
    <Icon name='log-out-outline' />
);

const ButtonUI = (props) => 
{
    return (
        <Layout style={styles.container} level='1'>
            <Button style={ styles.button } status={ props.status } accessoryRight={props.icon} onPress={props.onPress}>
                {evaProps => <Text {...evaProps} style={{color: "#FFF", fontFamily: 'Sharp_Sans_SemiBold'}}>{props.text}</Text>}
            </Button>
        </Layout>
    )
}


const styles = StyleSheet.create
({
    container:
    {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'transparent'
    },
    button: 
    {
        width: '100%', 
        borderRadius: 40,
    }
});

export default ButtonUI