import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Avatar, Text, ListItem, Button, Icon } from "@rneui/base";
import stylesPerfil from "../../assets/styles/StylePerfil";
import { getUser, setToken } from "@/app/utils/security/SecureStore";
import UserModel from "@/app/utils/models/UserModel";
import { NavigationProp } from '@react-navigation/native';

const Perfil = ({ navigation }: { navigation: NavigationProp<any> }) => {

   const [user, setUser] = useState(UserModel); 


    useEffect( () => {
        async function  setUsuario(){
        let userR: any = await getUser();
        let convert = JSON.parse(userR);
        setUser(convert);
       
        }
        setUsuario();
        
    }, []);

const chagePassword = () => {

}

const cerraSesion = async () => {
  await setToken('none');
  navigation.navigate('Login');

}


return (
    <ScrollView style={stylesPerfil.container}>
        {/* Encabezado con Avatar */}
        <View style={stylesPerfil.header}>
            <Avatar
                rounded
                size="xlarge"
                title={`${user.nombre[0]}${user.apellido[0]}`}
                containerStyle={stylesPerfil.avatar}
            />
            <Text h3 style={stylesPerfil.name}>
                {user.nombre} {user.apellido}
            </Text>
        </View>

        {/* Información del Usuario */}
        <View style={stylesPerfil.infoSection}>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title style={stylesPerfil.label}>Teléfono</ListItem.Title>
                    <ListItem.Subtitle>
                      {user.telefono} 
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title style={stylesPerfil.label}>Correo Electrónico</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title style={stylesPerfil.label}>Contraseña</ListItem.Title>
                    <Button
                        titleStyle={{ color: '#28A745' }}
                        type="clear"
                        onPress={chagePassword}
                    >Cambiar
                        <Icon name="lock-reset" color="#00A850" />
                    </Button>
                </ListItem.Content>
            </ListItem>

            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title style={stylesPerfil.label}>Creado el</ListItem.Title>
                    <ListItem.Subtitle>
                        {new Date(user.fecha_create).toLocaleDateString()}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title style={stylesPerfil.label}>Actualizado el</ListItem.Title>
                    <ListItem.Subtitle>
                        {new Date(user.fecha_update).toLocaleDateString()}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </View>

        {/* Botón para Cerrar la sesion */}
        <Button
            title="Cerrar Sesion"
            onPress={cerraSesion}
            buttonStyle={stylesPerfil.ButtonSesion}
        />

    </ScrollView>
);

}

export default Perfil;