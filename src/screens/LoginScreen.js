import React, { useState } from 'react'
import { useWindowDimensions, StatusBar, View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components';
import Background from '../../assets/svg/BackgroundSVG'
import ButtonUI from '../components/ButtonUI';
import InputUI from '../components/InputUI';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useForm } from '../../hooks/useForms';
import { Keyboard } from 'react-native';
import ToastUI from '../components/ToastUI';
import { loginUser } from '../api/Auth';
import Spinner from 'react-native-loading-spinner-overlay';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const clearAsyncStorage = async () => 
{
	try 
	{
		await AsyncStorage.clear()
	} 
	catch(e) 
	{
		console.error(e);
	}
}
clearAsyncStorage();

const LoginScreen = ({ navigation }) => 
{
    const { width, height } = useWindowDimensions();
	const [loading, setLoading] = useState(false);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    const { username, password, onChange } = useForm
    ({
        username: '',
        password: ''  
    });

	// useEffect(() => 
	// {
	//   stopLoading();
	// }, [])

    const login = async () =>
    {
		const data = 
		{
			username,
			password
		}
		if(data.username == '' || data.password == '')
		{
			ToastUI('info', '¡Atención!', 'El usuario y/o contraseña son requeridos');
			return
		}
		startLoading();
		const response = await loginUser(data);
		const responseJSON = await response.json();

		if (response.status == 200 && 'access_token' in responseJSON) 
		{
			AsyncStorage.setItem('access_token', responseJSON['access_token']).then(result => 
			{
				stopLoading();
				ToastUI('success', '¡Éxito!', responseJSON['result']);
				navigation.replace('Layout');
			}).catch(error => console.log(error));
		}
		else if(response.status == 500 || response.status == 401 && 'error' in responseJSON) 
		{
			stopLoading();
			ToastUI('error', '¡Error!', responseJSON['error']);
		} 
		else
		{
			stopLoading();
			ToastUI('error', '¡Error!', 'Hubo un error inesperado, revisa tu conexión a internet');
		}
		Keyboard.dismiss();
    }

    return (
        <View style={styles.mainContainer}>
            <StatusBar style="auto" />
			<Spinner
				visible={loading}
				textContent={'Iniciando sesión...'}
				textStyle={styles.spinner}
				color='#E51576'
				animation='fade'
				overlayColor='#181D36'
			/>
            <View style={ styles.background }>
                <Background width={width} height={height}/>
            </View>
            <View style={styles.container}>
                <Text style={styles.title} category='c1'>Login</Text>
                <Text style={styles.subtitle} category='s1'>Inicia sesión con tu cuenta</Text>
                <InputUI icon={IconUser} placeholder='Usuario' onChangeText={ value => onChange(value, 'username') } value={username}></InputUI>
                <InputUI icon={IconPassword} placeholder='Contraseña' secureText={true} onChangeText={ value => onChange(value, 'password') } value={password}></InputUI>
                <View style={ styles.buttonContainer }>
                  <ButtonUI icon={IconEnter} status='success' text='INICIAR' onPress={async () => await login()}></ButtonUI>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create
({
	mainContainer:
	{
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: '#181D36'
	},
	container: 
	{
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 10,
		marginHorizontal: 30
	},
	background:
	{
		position: 'relative',
		top: 240
	},
	title: 
	{ 
		alignSelf: 'flex-end',
	},
	subtitle:
	{
		fontSize: 20,
		paddingVertical: 10,
		paddingBottom: 12,
		alignSelf: 'flex-end'
	},
	buttonContainer:
	{
		marginVertical: 10,
		width: '33%'
	}, 
	spinner: 
	{ 
		color: 'white', 
		fontWeight: '600',
		fontFamily: 'Sharp_Sans_SemiBold',  
	}
});

const IconUser = ({ style }) => 
{
	const { tintColor, marginVertical, marginHorizontal, width } = style;
	return (
		<Feather name="user" size={width - 4} color={tintColor} style={{ marginVertical: marginVertical, marginHorizontal: marginHorizontal }} />
	)
}

const IconPassword = ({ style }) => 
{
	const { tintColor, marginVertical, marginHorizontal, width } = style;
	return (
		<Feather name="lock" size={width - 4} color={tintColor} style={{ marginVertical: marginVertical, marginHorizontal: marginHorizontal }} />
	)
}

const IconEnter = ({ style }) => 
{
	const { tintColor, marginVertical, marginHorizontal, width } = style;
	return (
    <Ionicons name="enter-outline" size={width - 4} color={tintColor} style={{ paddingTop: 3, marginHorizontal: marginHorizontal - 4 }} />
  )
}

export default LoginScreen;
