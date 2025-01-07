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
import { insertAfectacion, getDbConnection, deleteAfectaciones, getAfectaciones, insertProductor,deleteProductores, deleteParcelas, getProductoresSuelos } from '@/app/utils/database/db';





const Login = ({ navigation }: { navigation: NavigationProp<any> }) => {

  useEffect(() => {

    async function validationToken() {
      // Obtener el token del storage si existe

      const token: any = await getToken();
      if (token != 'none' && token != undefined) {
        const { exp } = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (exp && exp > currentTime) {
          navigation.navigate('AppNavigation');
        } else {
          setIsValidating(true);
        }
      }
      else {
        setIsValidating(true);
      }
      //navigation.navigate('AppNavigation');
    }
    validationToken();

  }, []);

  const data = {
    "Usuario": {
      "id": 2,
        "nombre": "Tecnico 1",
          "apellido": "Primero",
            "telefono": null,
              "email": "tecnico@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$5/MUZYBe7HBB2RKqrQZ9EA$mvR4D0CZVKLEDWERK+gamZ9kfGVxitPgdOfTRw4sgbg",
                  "role": "TECNICO",
                    "fecha_create": "2025-01-02T19:50:26.620Z",
                      "fecha_update": "2025-01-02T19:50:26.620Z"
    },
    "Access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoidGVjbmljb0BnbWFpbC5jb20iLCJyb2xlIjoiVEVDTklDTyIsImlhdCI6MTczNTg1MTMxMCwiZXhwIjoxNzM1ODYyMTEwfQ._jA2lWZpvkpM1Zc3NTbpGZ-Wt_PKNEHlOm7SRTTLyWU",
      "imprensindibleData": [
        {
          "id": 1,
          "nombre": "comejen",
          "descripcion": "planta",
          "fecha_create": "2025-01-02T19:50:26.251Z",
          "fecha_update": "2025-01-02T19:50:26.251Z"
        },
        {
          "id": 2,
          "nombre": "chinche",
          "descripcion": "planta",
          "fecha_create": "2025-01-02T19:50:26.269Z",
          "fecha_update": "2025-01-02T19:50:26.269Z"
        },
        {
          "id": 3,
          "nombre": "mal de machete",
          "descripcion": "planta",
          "fecha_create": "2025-01-02T19:50:26.278Z",
          "fecha_update": "2025-01-02T19:50:26.278Z"
        },
        {
          "id": 4,
          "nombre": "gusano",
          "descripcion": "planta",
          "fecha_create": "2025-01-02T19:50:26.288Z",
          "fecha_update": "2025-01-02T19:50:26.288Z"
        },
        {
          "id": 5,
          "nombre": "hormiga",
          "descripcion": "planta",
          "fecha_create": "2025-01-02T19:50:26.297Z",
          "fecha_update": "2025-01-02T19:50:26.297Z"
        },
        {
          "id": 6,
          "nombre": "pajaro",
          "descripcion": "mazorca",
          "fecha_create": "2025-01-02T19:50:26.395Z",
          "fecha_update": "2025-01-02T19:50:26.395Z"
        },
        {
          "id": 7,
          "nombre": "monilla",
          "descripcion": "mazorca",
          "fecha_create": "2025-01-02T19:50:26.396Z",
          "fecha_update": "2025-01-02T19:50:26.396Z"
        },
        {
          "id": 8,
          "nombre": "gallina ciega o tecorón",
          "descripcion": "planta",
          "fecha_create": "2025-01-02T19:50:26.425Z",
          "fecha_update": "2025-01-02T19:50:26.425Z"
        },
        {
          "id": 9,
          "nombre": "monos",
          "descripcion": "mazorca",
          "fecha_create": "2025-01-02T19:50:26.438Z",
          "fecha_update": "2025-01-02T19:50:26.438Z"
        },
        {
          "id": 10,
          "nombre": "ardillas",
          "descripcion": "mazorca",
          "fecha_create": "2025-01-02T19:50:26.452Z",
          "fecha_update": "2025-01-02T19:50:26.452Z"
        },
        {
          "id": 11,
          "nombre": "antracnosis",
          "descripcion": "planta",
          "fecha_create": "2025-01-02T19:50:26.457Z",
          "fecha_update": "2025-01-02T19:50:26.457Z"
        },
        {
          "id": 12,
          "nombre": "phytophthora",
          "descripcion": "mazorca",
          "fecha_create": "2025-01-02T19:50:26.461Z",
          "fecha_update": "2025-01-02T19:50:26.461Z"
        },
        {
          "id": 13,
          "nombre": "cuyú",
          "descripcion": "mazorca",
          "fecha_create": "2025-01-02T19:50:26.487Z",
          "fecha_update": "2025-01-02T19:50:26.487Z"
        },
        {
          "id": 14,
          "nombre": "zompopo",
          "descripcion": "planta",
          "fecha_create": "2025-01-02T19:50:26.499Z",
          "fecha_update": "2025-01-02T19:50:26.499Z"
        }
      ],
        "asignaciones": [
          {
            "id": 1,
            "productor": {
              "id": 1,
              "nombre": "Productor 1",
              "apellido": "Primero",
              "direccion": "Comunidad cerro negro",
              "cedula": "xxxx xxxx",
              "parcelas": [
                {
                  "id": 1,
                  "nombre": "parcela de cacao",
                  "tamaño": "2 mz",
                  "cultivo": "cacao",
                  "tipo": {
                    "id": 1,
                    "descripcion": "parcela abierta",
                    "fecha_create": "2025-01-02T19:50:26.314Z",
                    "fecha_update": "2025-01-02T19:50:26.314Z"
                  }
                }
              ]
            },
            "tipo": "Estimacion de Cosecha"
          },
          {
            "id": 2,
            "productor": {
              "id": 2,
              "nombre": "Productor 2",
              "apellido": "Segundo",
              "direccion": "Comunidad cerro negro",
              "cedula": "xxxx xxxx",
              "parcelas": [
                {
                  "id": 2,
                  "nombre": "parcela de cacao",
                  "tamaño": "2 mz",
                  "cultivo": "cacao",
                  "tipo": {
                    "id": 1,
                    "descripcion": "parcela abierta",
                    "fecha_create": "2025-01-02T19:50:26.314Z",
                    "fecha_update": "2025-01-02T19:50:26.314Z"
                  }
                }
              ]
            },
            "tipo": "Analisis Fisico-Clinico de Suelo"
          }
        ]
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
const loadData = async (data: any) => {
  const db = await getDbConnection();

  // eliminando productores
  await deleteProductores(db);

  // eliminando parcelas
  await deleteParcelas(db);

  // cargando asignaciones
  const asignaciones = data.asignaciones;
  for (let i = 0 ; i < asignaciones.length; i++) {
    await insertProductor(db, asignaciones[i].productor, asignaciones[i].tipo);
    
  }

  // eliminando afectaciones
  await deleteAfectaciones(db);

  // cargando nuevas afectaciones
  const afectaciones = data.imprensindibleData;
  for (let i = 0 ; i < afectaciones.length; i++) {
    const afectacion = afectaciones[i];
    await insertAfectacion (afectacion, db);
  }
  const afectacionesDb = await getAfectaciones(db);
  //console.log(afectacionesDb);
  const productores = await getProductoresSuelos(db);
  //console.log(productores);
  

};

const handleLogin = async () => {

  if (validateEmail(email)) {
    setLoading(true);
    //const { data } = await userAuth({ email, password });
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
      let d = data;
      loadData(d);
      navigation.navigate('AppNavigation');
    }

  } else {
    showMessage({
      message: "Error",
      description: "Correo electrónico no válido",
      type: "warning",
    });
  }
  /*
     
         let Token = JSON.stringify(Access_token);
         let user = JSON.stringify(Usuario);
         setToken(Token);
         setUser(user);
         navigation.navigate('AppNavigation');
     */
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