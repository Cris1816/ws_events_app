import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { default as theme } from './assets/theme/theme.json';
import AppLoading from 'expo-app-loading';
import useFonts from './hooks/useFonts';
import { useEffect, useState } from 'react';
import MainContainer from './src/screens/navigation/MainContainer';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaView } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { toastConfig } from './assets/theme/toastConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
const getTokenJWT = async () => 
{
	const result = await AsyncStorage.getItem('access_token');
	return result;
}
const token = getTokenJWT();

const Stack = createStackNavigator();

const App = () => 
{
    const [isReady, setIsReady] = useState(false);    

    const loadFonts = async () => 
    {
        await useFonts();
    };

    if (!isReady) 
    {
        return (
          <AppLoading
            startAsync={loadFonts}
            onFinish={() => setIsReady(true)}
            onError={() => {}}
          />
        );
    }

    const validateTokenExp = token => 
	{
		return (!(jwtDecode(token).exp < Date.now() / 1000)) ? true : false;
	}
    
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
                {Platform.OS === 'ios' &&
                    <View style={{
                        width: "100%",
                        height: 100,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundColor: "#E51576"}}
                />}
                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar translucent backgroundColor={'#181D36'} />
                    <NavigationContainer style={ styles.mainContainer } independent={true}>
                        <Stack.Navigator initialRouteName={(token['_z'] != null && validateTokenExp(token['_z'])) ? 'Layout' : 'Login' } screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ title: 'Login S' }}
                        /> 
                        <Stack.Screen
                            name="Layout"
                            component={MainContainer}
                            options={{ title: 'Layout S' }}
                        />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaView>
            </ApplicationProvider>
            <Toast config={toastConfig}/>
        </>
    );
}

const styles = StyleSheet.create
({
    mainContainer:
    {
        flex: 1,
    },
});

export default App;