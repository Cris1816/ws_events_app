import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import ConsulteScreen from './auth/ConsulteScreen';
import RegisterScreen from './auth/RegisterScreen';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BackHandler } from 'react-native';
import { Alert } from 'react-native';
import { logoutUser } from '../../api/Auth';
import ToastUI from '../../components/ToastUI';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
const { Navigator, Screen } = createBottomTabNavigator();
const getTokenJWT = async () => 
{
	const result = await AsyncStorage.getItem('access_token');
	return result;
}
const token = getTokenJWT();

const IconRegister = ({ style }) => 
{
	const { tintColor, marginVertical, width } = style;
	return (
		<AntDesign name="menuunfold" size={width - 8} color={tintColor} style={{ marginVertical: marginVertical }} />
	)
}

const IconConsulte = ({ style }) => 
{
	const { tintColor, marginVertical, width } = style;
	return (
		<AntDesign name="form" size={width - 8} color={tintColor} style={{ marginVertical: marginVertical }} />
	)
}

const BottomTabBar = ({ navigation, state }) => 
(
	<BottomNavigation style={styles.bar}
		selectedIndex={state.index}
		onSelect={index => navigation.navigate(state.routeNames[index])}
		appearance='noIndicator'>
		<BottomNavigationTab style={{ paddingVertical: 8, paddingLeft: 25 }} icon={ IconRegister } title='CONSULTA' />
		<BottomNavigationTab style={{ paddingVertical: 8, paddingRight: 25 }} icon={ IconConsulte } title='REGISTRO'/>
	</BottomNavigation>
);

const TabNavigator = () => 
(
	<Navigator id='navSecondary' tabBar={props => <BottomTabBar {...props} />}>
		<Screen options={() => 
		{
			return {
				header: () => null,
			};
		}} name='CONSULTA' component={ConsulteScreen}/>
		<Screen options={() => 
		{
			return {
				header: () => null,
			};
		}} name='REGISTRO' component={RegisterScreen}/>
	</Navigator>
);
  
const MainContainer = ({ navigation }) => 
{
	const [loading, setLoading] = useState(false);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

	const clearAsyncStorage = async () =>
	{
		try 
		{
			await AsyncStorage.clear();	
		} 
		catch (error) 
		{
			console.error(error);
		}
	}

	const logout = async () =>
    {
		startLoading();
		const response = await logoutUser(token['_z']);
		const responseJSON = await response.json();
 
		if (response.status == 200 && 'result' in responseJSON)
		{
			ToastUI('success', '¡Éxito!', responseJSON['result']);
			stopLoading();
			clearAsyncStorage();
			navigation.replace('Login')
		}
		else if(response.status == 500 && 'error' in responseJSON) 
		{
			stopLoading();
			ToastUI('error', '¡Error!', responseJSON['error']);
		} 
		else
		{
			stopLoading();
			ToastUI('error', '¡Error!', 'Hubo un error inesperado, revisa tu conexión a internet');
		}
    }

    useEffect(() => 
    {
        const backAction = () => 
        {
            Alert.alert('Espera un momento', '¿Seguro que quieres salir?', 
            [
                {
                    text: 'No, cancelar',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: 'Si', onPress: async () => 
					{ 
						await logout(); 
					}
                },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);

	const validateTokenExp = token => 
	{
		return (!(jwtDecode(token).exp < Date.now() / 1000)) ? true : false;
	}

	return (token['_z'] != null && validateTokenExp(token['_z'])) ? 
	(
		<NavigationContainer independent={true}>
			<Spinner
				visible={loading}
				textContent={'Cerrando sesión...'}
				textStyle={styles.spinner}
				color='#E51576'
				animation='fade'
				overlayColor='#181D36'
			/>
			<TabNavigator/>
		</NavigationContainer>
	)
	: navigation.replace('Login');
}

const styles = StyleSheet.create
({
	bar: 
	{
		margin: 30,
		bottom: 0,
		borderRadius: 40,
		position: 'absolute',
		backgroundColor: '#181D36'
	},
	spinner:
	{ 
		color: 'white', 
		fontWeight: '600',
		fontFamily: 'Sharp_Sans_SemiBold',  
	}
});

export default MainContainer