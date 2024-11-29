import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Avatar, Text, ListItem, Button, Icon } from "@rneui/base";
import stylesPerfil from "@/assets/styles/StylePerfil";

const Perfil = () => {

    const user = {
        nombre: "Jhon Z",
        apellido: "Melendez",
        email: "johndoe@example.com",
        telefono: "1234567890",
        fecha_create: new Date,
        fecha_update: new Date
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
                            {user.telefono ? user.telefono : "No proporcionado"}
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
                onPress={() => alert("Editar perfil")}
                buttonStyle={stylesPerfil.ButtonSesion}
            />

        </ScrollView>
    );

}

export default Perfil;