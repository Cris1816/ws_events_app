import * as React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import ListUI from '../../../components/ListUI';
import { getRegistrations } from '../../../api/Registrations';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastUI from '../../../components/ToastUI';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import jwtDecode from 'jwt-decode';
import { RefreshControl } from 'react-native-gesture-handler';
let interval;
const getTokenJWT = async () => 
{
    const result = await AsyncStorage.getItem('access_token');
    return result;
}
const validateTokenExp = token => 
{
    return (!(jwtDecode(token).exp < Date.now() / 1000)) ? true : false;
}
const token = getTokenJWT();

const ConsulteScreen = ({ navigation }) =>
{
    const [state, setState] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);
   
    React.useEffect(() => 
    {
        getData();
        startLoading();
        setTimeout(() => stopLoading(), 3000);
    }, [])
    
    const getData = async () =>
    { 
        let data = [];
        const response = await getRegistrations(token['_z']);
        const responseJSON = await response.json();

        console.log(token['_z']);
        
        if (response.status == 200 && responseJSON.length > 0)
        {
            responseJSON.forEach(element => 
            {
                const list = 
                {
                    title: element.name,
                    description: 'Registrado por: ' + element.user.name,
                }
                data.push(list);
            });
            setState(data);
        }
        else if(response.status == 500 && 'error' in responseJSON) 
        {
            ToastUI('error', '¡Error!', responseJSON['error']);
            setState(data);
        }
        else if(response.status == 401) 
        {
            console.log('No está autorizado para ver esta información');
            setState(data);
        }
        else if(response.status == 429)
        {
            console.log('Error de servidor');
        }
        else
        {
            ToastUI('error', '¡Error!', 'Hubo un error inesperado, revisa tu conexión a internet');
        }
    }

    const IconNoData = () => 
    {
        return (
            <MaterialCommunityIcons
                name="database-remove-outline" 
                size={100} 
                color={'#E51576'} />
        )
    }

    return (
        <Layout style={styles.container}>
            <Spinner
				visible={loading}
				textContent={'Cargando información...'}
				textStyle={styles.spinner}
				color='#E51576'
				animation='fade'
				overlayColor='#181D36'
			/>
            <View style={ styles.scrollContainer }>
                <Text style={styles.title}>Consulta</Text>
                <Text category='s1' style={styles.text}>Listado de los registros realizados</Text>
                { 
                    (!state.length > 0) ? 
                    (
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }}>
                            <IconNoData/>
                            <Text category='p1' style={{ paddingTop: 14 }}>No hay registros aún</Text>
                        </View>
                    ) 
                    : 
                    ( <ListUI data={state} marginBottom={ 150 } refreshControl={ <RefreshControl tintColor={'white'} refreshing={refreshing} onRefresh={getData} />} /> )
                }
            </View>
        </Layout>
    ) 
}

const styles = StyleSheet.create
({
    container: 
    { 
        flex: 1,
    },
    scrollContainer: 
    {
        padding: 30,
    },
	title: 
	{ 
		alignSelf: 'flex-start',
		fontWeight: '600',
		fontFamily: 'Sharp_Sans_Bold', 
		fontSize: 36
	},
    text:
    {
        paddingVertical: 5,
        fontSize: 16,
        fontWeight: '600',
		fontFamily: 'Sharp_Sans_SemiBold', 
    },
    buttonContainer:
    {
        width: '40%',
        marginVertical: 15,
        paddingBottom: 70,
        alignSelf: 'center'
    }, 
	spinner: 
	{ 
		color: 'white', 
		fontWeight: '600',
		fontFamily: 'Sharp_Sans_SemiBold',  
	}
});

export default ConsulteScreen;