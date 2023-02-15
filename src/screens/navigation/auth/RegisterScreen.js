import * as React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Keyboard, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import InputUI from '../../../components/InputUI';
import ButtonUI from '../../../components/ButtonUI';
import Spinner from 'react-native-loading-spinner-overlay';
import { useForm } from '../../../../hooks/useForms';
import ToastUI from '../../../components/ToastUI';
import { createRegistration } from '../../../api/Registrations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { useEffect } from 'react';
const getTokenJWT = async () => 
{
    const result = await AsyncStorage.getItem('access_token');
    return result;
}
const token = getTokenJWT();

const RegisterScreen = ({ navigation }) =>
{
    const [loading, setLoading] = React.useState(false);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);
    const { name, phone_number, email, comments, company, onChange } = useForm
    ({
        name: '',
        phone_number: '',
        email: '',
        comments: '',
        company: ''  
    });
    const clearInput = React.useCallback(() => onChange(''), []);

    const register = async () =>
    {
		const data =  
        { 
            name: name, 
            phone_number, 
            email: email, 
            comments: comments, 
            company: company 
        }
        if(data.name == '')
        {
            ToastUI('info', '¡Atención!', 'El nombre es obligatorio');
        }
        else
        {
            startLoading();
            const response = await createRegistration(data, token['_z']);
            const responseJSON = await response.json();

            if (response.status == 200 && 'result' in responseJSON) 
            {
                stopLoading();
                ToastUI('success', '¡Éxito!', responseJSON['result']);
                clearInput();
            }
            else if(response.status == 401) 
            {
                stopLoading();
                console.log('No está autorizado para realizar esta acción');
            }
            else
            {
                stopLoading();
                ToastUI('error', '¡Error!', 'Hubo un error inesperado, revisa tu conexión a internet');
            }
            Keyboard.dismiss();
        }
    }

    return (
        <Layout style={styles.container}>
            <Spinner
				visible={loading}
				textContent={'Espere un momento...'}
				textStyle={styles.spinner}
				color='#E51576'
				animation='fade'
				overlayColor='#181D36'
			/>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} overScrollMode='never'>
                <View style={ styles.scrollContainer }>
                    <Text category='c1'>Registro</Text>
                    <Text category='s1' style={styles.text}>Completa la siguiente información para realizar un nuevo registro</Text>
                    <InputUI label='Nombre' onChangeText={ value => onChange(value, 'name') } value={name}></InputUI>
                    <InputUI label='Teléfono' type='phone-pad' onChangeText={ value => onChange(value, 'phone_number') } value={phone_number}></InputUI>
                    <InputUI label='Correo' type='email-address' onChangeText={ value => onChange(value, 'email') } value={email}></InputUI>
                    <InputUI label='Motivo / Comentarios' onChangeText={ value => onChange(value, 'comments') } value={comments}></InputUI>
                    <InputUI label='Empresa' onChangeText={ value => onChange(value, 'company') } value={company}></InputUI>
                    <View style={ styles.buttonContainer }>
                        <ButtonUI status='success' text='REGISTRAR' onPress={async () => await register()}></ButtonUI>
                    </View>
                </View>
            </ScrollView>
        </Layout>
    );
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
    text:
    {
        paddingVertical: 5,
        fontSize: 16,
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

export default RegisterScreen;