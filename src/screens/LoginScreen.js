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
import { Image } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

const LoginScreen = ({ navigation }) => 
{
	const [loading, setLoading] = useState(false);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);
	const handleNavigation = () => navigation.replace('Layout');

    const { username, password, onChange } = useForm
    ({
        username: '',
        password: '' 
    });

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
				handleNavigation();
			}).catch(error => console.error(error));
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
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex:1 }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
					<View style={styles.container}>
						<Image
							style={{ width: 300, height: 300 }}
							source={ require('../../assets/img/login.png') }
							resizeMode='contain'
						/>
						<Text style={styles.title}>Login</Text>
						<Text style={styles.subtitle}>Inicia sesión con tu cuenta</Text>
						<InputUI icon={IconUser} placeholder='Usuario' secureText={false} onChangeText={ value => onChange(value, 'username') } value={username}></InputUI>
						<InputUI icon={IconPassword} onSubmitEditing={async () => await login()} placeholder='Contraseña' secureText={true} onChangeText={ value => onChange(value, 'password') } value={password}></InputUI>
						<View style={ styles.buttonContainer }>
							<ButtonUI icon={IconEnter} status='success' text='INICIAR' onPress={async () => await login()}></ButtonUI>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create
({
	mainContainer:
	{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#181D36',
	},
	container: 
	{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 30, 
	},
	title: 
	{ 
		alignSelf: 'flex-start',
		fontWeight: '600',
		fontFamily: 'Sharp_Sans_Bold', 
		fontSize: 36
	},
	subtitle:
	{
		fontSize: 20,
		paddingVertical: 10,
		paddingBottom: 12,
		alignSelf: 'flex-start',
		fontWeight: '600',
		fontFamily: 'Sharp_Sans_SemiBold',
	},
	buttonContainer:
	{
		marginVertical: 10,
		// width: '33%'
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
