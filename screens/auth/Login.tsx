import React, { useState } from 'react';
import { Button, Input, CheckBox, Image } from '@rneui/base';
import StyleGeneral from '../../assets/styles/StyleGeneral';
import StyleLogin from '../../assets/styles/StyleLogin';
import { View } from 'react-native';




const Login = () => {

  // constantes locales 
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [recuerdame, setRecuerdame] = useState(false);

  return (
    <View style={StyleGeneral.container}>
      <View style={StyleLogin.tarjeta}>
        <View style={StyleLogin.logoContainer}>
          <Image source={require('../../assets/images/User.png')}
            style={StyleLogin.img}
            resizeMode='contain'
          />
        </View>

        <Input placeholder='Usuario' />
        <Input placeholder="Contraseña"
          secureTextEntry={passwordVisible}
          rightIcon={{
            type: 'font-awesome',
            name: passwordVisible ? 'eye-slash' : 'eye',
            onPress: () => setPasswordVisible(!passwordVisible)
          }}
        />
        <CheckBox
          title="Recordarme"
          checked={recuerdame}
          onPress={() => setRecuerdame(!recuerdame)}
        />

        <Button buttonStyle={StyleLogin.button} title="Entrar" />
      </View>
    </View>
  );
};

export default Login;