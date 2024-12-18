import React, { useEffect, useState } from 'react';
import { Button, Input, CheckBox, Image } from '@rneui/base';
import StyleGeneral from '../../assets/styles/StyleGeneral';
import StyleLogin from '../../assets/styles/StyleLogin';
import { View, ActivityIndicator } from 'react-native';
import { userAuth } from '@/app/services/UserService';
import { setToken, getToken, setUser } from '@/app/utils/security/SecureStore';
import { showMessage } from "react-native-flash-message";
import { jwtDecode } from 'jwt-decode';
import { NavigationProp } from '@react-navigation/native';





const Login = ({ navigation }: { navigation: NavigationProp<any> }) => {

  useEffect(() => {

    async function validationToken() {
      // Obtener el token del storage si existe
      const token: any = await getToken();
      if (token != 'none') {
        const { exp } = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (exp && exp > currentTime) {
          navigation.navigate('AppNavigation');
        } else{
          setIsValidating(true);
        }
      }
      else {
        setIsValidating(true);
      }
    }
    validationToken();

  }, []);

  const Access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVjbmljb0BnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTczNDM3MjYyNCwiZXhwIjoxNzM0OTc3NDI0fQ.wxEnjgM0PFxMtFNqCkLJYGPI6ndStMQqoKsEF36HPtw";
  const Usuario = {
    apellido: "Tecnico numero 1",
    email: "tecnico@gmail.com",
    fecha_create: "2024-11-17T22:12:16.181Z",
    fecha_update: "2024-11-17T22:12:16.181Z",
    id: 1, nombre: "jhon osman",
    password: "$argon2id$v=19$m=65536,t=3,p=4$B7dKpWFmLGGrsBOiFBZhew$J311Ss8USc6JAJ02BXI7woqSqtrNKOmkhl3y/ziLtKo",
    role: "USER", telefono: "xxxx xxxx"
  };

  // constantes locales 
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [recuerdame, setRecuerdame] = useState(false);
  const [password, setPassword] = useState('12345678');
  const [email, setEmail] = useState('tecnico@gmail.com');
  const [loading, setLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
/*
    if (validateEmail(email)) {
      setLoading(true);
      const { data } = await userAuth({ email, password });
      if (data.Access_token === undefined) {
        showMessage({
          message: "Error",
          description: data.message,
          type: "danger",
        });
        setLoading(false);
        return;
      } else {
        let Token = JSON.stringify(data.Access_token);
        let user = JSON.stringify(data.Usuario);
        setToken(Token);
        setUser(user);
        setLoading(false);
        navigation.navigate('AppNavigation');
      }

    } else {
      showMessage({
        message: "Error",
        description: "Correo electrónico no válido",
        type: "warning",
      });
    }
*/
    
        let Token = JSON.stringify(Access_token);
        let user = JSON.stringify(Usuario);
        setToken(Token);
        setUser(user);
        navigation.navigate('AppNavigation');
    
  };

  if (isValidating) {
    return (
      <View style={StyleGeneral.container}>
        <View style={StyleLogin.tarjeta}>



          <View style={StyleLogin.logoContainer}>
            <Image source={require('../../assets/images/User.png')}
              style={StyleLogin.img}
              resizeMode='contain'
            />
          </View>

          <Input placeholder='Correo'
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <Input placeholder="Contraseña"
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry={passwordVisible}
            rightIcon={{
              type: 'font-awesome',
              color: '#666666',
              name: passwordVisible ? 'eye-slash' : 'eye',
              onPress: () => setPasswordVisible(!passwordVisible)
            }}
          />
          <CheckBox
            title="Recordarme"
            checked={recuerdame}
            onPress={() => setRecuerdame(!recuerdame)}
          />

          <Button buttonStyle={StyleLogin.button} title="Entrar"
            onPress={handleLogin}
          />
          {loading && <ActivityIndicator size={40} />}
        </View>


      </View>
    );

  }


};

export default Login;