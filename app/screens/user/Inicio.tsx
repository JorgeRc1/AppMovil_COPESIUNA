import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Text, Button, Icon } from '@rneui/base';
import StyleInicio from '../../assets/styles/StyleInicio';

const Home = () => {
    return (
        <ScrollView style={StyleInicio.container}>
            <View style={StyleInicio.headerContainer}>
                <View>
                    <Text h4 style={StyleInicio.title}>
                        Registro de Bitácoras
                    </Text>
                    <Text style={StyleInicio.subtitle}>
                        COPESIUNA
                    </Text>
                </View>
            </View>


            {/* Card para Bitacoras de Suelos */}
            <Card containerStyle={StyleInicio.card}>
                <View style={StyleInicio.cardHeader}>
                    <Icon name="terrain" type="material-icons" size={40} color="#00A850" />
                    <Card.Title style={StyleInicio.cardTitle}>Bitácoras de Suelos</Card.Title>
                </View>
                <Card.Divider />
                <Text style={StyleInicio.cardText}>Sin enviar: <Text style={StyleInicio.highlight}>5</Text></Text>
                <Button
                    title="Ver Bitácoras"
                    icon={<Icon name="file-document-outline" type="material-community" size={20} color="#fff" />}
                    buttonStyle={StyleInicio.button}
                />
            </Card>

            {/* Card para Bitacoras de Cosechas */}
            <Card containerStyle={StyleInicio.card}>
                <View style={StyleInicio.cardHeader}>
                    <Icon name="corn" type="material-community" size={40} color="#00A850" />
                    <Card.Title style={StyleInicio.cardTitle}>Bitácoras de Cosechas</Card.Title>
                </View>
                <Card.Divider />
                <Text style={StyleInicio.cardText}>Sin enviar: <Text style={StyleInicio.highlight}>2</Text></Text>
                <Button
                    title="Ver Bitácoras"
                    icon={<Icon name="file-document-outline" type="material-community" size={20} color="#fff" />}
                    buttonStyle={StyleInicio.button}
                />
            </Card>

            {/* Card para datos extras */}
            <Card containerStyle={StyleInicio.card}>
                <View style={StyleInicio.cardHeader}>
                    <Icon name="chart-bar" type="material-community" size={40} color="#00A850" />
                    <Card.Title style={StyleInicio.cardTitle}>Datos Generales</Card.Title>
                </View>
                <Card.Divider />
                <Text style={StyleInicio.cardText}>Total Bitácoras Enviadas: <Text style={StyleInicio.highlight}>15</Text></Text>
                <Text style={StyleInicio.cardText}>Último envío de bitácoras: <Text style={StyleInicio.highlight}>Hoy</Text></Text>
            </Card>
        </ScrollView>
    );

}

export default Home;