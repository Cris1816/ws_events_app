import React from 'react';
import { Divider, List, ListItem, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export const ListUI = (props) => 
{
    const renderItemIcon = ({ style }) => 
    {
        const { marginHorizontal, width } = style;
        return (
            <AntDesign 
                name="user" 
                size={width - 4} 
                color={'#E51576'} 
                style={{ paddingTop: 3, marginHorizontal: marginHorizontal - 4 }} />
        )
    }

    const renderItem = ({ item, index }) => 
    (
        <ListItem
            title={ props => ( generateTitleText(props, item) ) }
            description={ props => ( generateDescriptionText(props, item) ) }
            accessoryLeft={renderItemIcon}
        />
    );

    return(
        <List
            data={props.data}
            ItemSeparatorComponent={ () => (<Divider style={{ backgroundColor: '#8F9BB3' }}/>)  }
            style={(props.marginBottom) ? { marginBottom: props.marginBottom } : null}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
        />
    ) 
};


const generateTitleText = ({ style }, item) => 
{
	const { color, fontSize, marginHorizontal } = style[0];
    const { textAlign } = style[1];
	return (
        <Text style={{ color: color, fontSize: fontSize, fontFamily: 'Sharp_Sans_SemiBold', marginHorizontal: marginHorizontal, textAlign: textAlign }}>{item.title}</Text>
    )
}

const generateDescriptionText = ({ style }, item) => 
{
	const { color, fontSize, marginHorizontal } = style[0];
    const { textAlign } = style[1];
	return (
        <Text style={{ color: color, fontSize: fontSize / 3, fontFamily: 'Sharp_Sans', marginHorizontal: marginHorizontal, textAlign: textAlign }}>{item.description}</Text>
    )
}

export default ListUI;