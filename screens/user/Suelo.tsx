import React, { useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, FlatList } from "react-native";
import { Input, ListItem, Button, Card } from '@rneui/base';
import { Button as Modal, Dialog } from "@rneui/themed"
import StyleSuelo from "@/assets/styles/StyleSuelo";
import { getDbConnection, insertSueloBitacora, getSuelosBitacora, borrarBitacora } from '../../utils/db'


const Suelo = () => {
    const [expanded, setExpanded] = React.useState(false);
    const [showPicker1, setShowPicker1] = React.useState(false);
    const [showPicker2, setShowPicker2] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);


    // estados locales para almacenar los datos de la bitacora 
    const [nombre, setnombre] = React.useState('');
    const [tectura, setTectura] = React.useState('');
    const [color, setColor] = React.useState('');
    const [ph, setPh] = React.useState('');
    const [nitrogen, setNitrogen] = React.useState('');
    const [potassium, setPotassium] = React.useState('');
    const [aluminum, setAluminum] = React.useState('');
    const [calcium, setCalcium] = React.useState('');
    const [ferric_iron, setFerric_iron] = React.useState('');
    const [humus, setHumus] = React.useState('');
    const [magnecium, setMagnecium] = React.useState('');
    const [nitrite_nitrogeno, setNitrite_nitrogeno] = React.useState('');
    const [sulfate, setSulfate] = React.useState('');
    const [fecha_levantamiento, setFecha_levantamiento] = React.useState(new Date());
    const [fecha_laboratorio, setFecha_laboratorio] = React.useState(new Date());
    const [bitacoras, setBitacoras] = React.useState([]);

    useEffect(() => {

        async function cargarBitacoras() {
            const db = await getDbConnection();
            const Resultado = await getSuelosBitacora(db);
            setBitacoras(Resultado);
        }
        cargarBitacoras();

    }, [])
    async function saveForm() {

        const db = await getDbConnection();
        await insertSueloBitacora(db, nombre,
            tectura, color, ph, nitrogen, potassium, aluminum, calcium, ferric_iron,
            humus, magnecium, nitrite_nitrogeno, sulfate, fecha_levantamiento.toLocaleDateString(), fecha_laboratorio.toLocaleTimeString()
        );


        recargarLista();

        closeModal();
    }

    // Manejo del evento de presionar el botón para mostrar la modal

    const showModal = () => {
        if (nombre == '' || tectura == '' || color == '' || ph == '' || nitrogen == '' || potassium == ''
            || aluminum == '' || calcium == '' || ferric_iron == ''
            || humus == '' || magnecium == '' || nitrite_nitrogeno == ''
            || sulfate == '') {
            alert('Todos los campos son obligatorios');
            return;
        } else {
            setModalVisible(!modalVisible);
        }

    };

    const closeModal = () => {
        reducerList();
        setModalVisible(false);
    };


    // Manejo del evento de cambio de fecha del levantamiento 
    const onDateChange1 = (event, selectedDate) => {
        const currentDate = selectedDate || date1;
        setShowPicker1(false);
        setFecha_levantamiento(currentDate);
    };

    // Manejo del evento de cambio de fecha del Laboratorio
    const onDateChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date2;
        setShowPicker2(false);
        setFecha_laboratorio(currentDate);
    };

    const reducerList = () => {
        setExpanded(false);
    }

    // renderizado para la lista de bitacoras
    const renderItem = ({ item }) => (
        <Card containerStyle={StyleSuelo.cardContainer}>
            <ListItem.Content>
                <ListItem.Title>{item.nombre}</ListItem.Title>
                <ListItem.Subtitle>Fecha: {item.fecha_levantamiento}</ListItem.Subtitle>
                <Text style={StyleSuelo.detailText}>Resultado: </Text>

                {/* Botones de Enviar y Editar */}
                <View style={StyleSuelo.buttonContainer}>
                    <Button
                        title="Enviar"
                        onPress={() => BotonEnviar(item)}
                        buttonStyle={StyleSuelo.enviarButton}
                    />
                    <Button
                        title="Editar"
                        type="outline"
                        titleStyle={{ color: '#28A745' }}
                        onPress={() => BotonEditar(item)}
                        buttonStyle={StyleSuelo.editarButton}
                        containerStyle={StyleSuelo.editButtonContainer}
                    />
                </View>
            </ListItem.Content>
        </Card>
    );

    // Función para manejar el botón de enviar
    const BotonEnviar = async (bitacora: any) => {
        console.log("Enviando bitácora:", bitacora);
        const db = await getDbConnection();
         borrarBitacora(db,bitacora.id);
         recargarLista();

        //mandando a la API
    };

    const recargarLista = async() => {
        const db = await getDbConnection();
        const Resultado = await getSuelosBitacora(db);
        setBitacoras(Resultado);
    }

    const limpiarForm = () => {
        setnombre('');
        setTectura('');
        setColor('');
        setPh('');
        setNitrogen('');
        setPotassium('');
        setAluminum('');
        setCalcium('');
        setFerric_iron('');
        setHumus('');
        setMagnecium('');
        setNitrite_nitrogeno('');
        setSulfate('');
    }

    // Función para manejar el botón de editar
    const BotonEditar = (bitacora: any) => {
        console.log("Editando bitácora:", bitacora);
        setExpanded(true);
        setnombre(bitacora.nombre);
        setTectura(bitacora.tectura);
        setColor(bitacora.color);
        setPh(bitacora.ph); 
        setNitrogen(bitacora.nitrogen);
        setPotassium(bitacora.potassium);
        setAluminum(bitacora.aluminum);
        setCalcium(bitacora.calcium);
        setFerric_iron(bitacora.ferric_iron);
        setHumus(bitacora.humus);
        setMagnecium(bitacora.magnecium);
        setNitrite_nitrogeno(bitacora.nitrite_nitrogeno);
        setSulfate(bitacora.sulfate);

    };

    const manejarListItem = () => {
        setExpanded(!expanded);
        if (expanded == false){
            limpiarForm();
        }
    }


    return (


        <FlatList
            ListHeaderComponent={
                <View>
                    <ListItem.Accordion
                        style={StyleSuelo.StyleItem}
                        content={
                            <ListItem.Content>
                                <ListItem.Title>Realizar Identificación</ListItem.Title>
                                <ListItem.Subtitle>Presiona para abrir el formulario</ListItem.Subtitle>
                            </ListItem.Content>
                        }
                        isExpanded={expanded}
                        onPress={() => {
                            manejarListItem();
                        }}
                    >
                        <View style={StyleSuelo.ViewContent}>
                            <ListItem.Content>

                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Nombre del Productor'
                                    onChangeText={(value) => {
                                        setnombre(value)
                                    }}
                                    value={nombre}
                                />

                            </ListItem.Content>
                            <ListItem.Content >


                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Tectura'
                                    onChangeText={(value) => {
                                        setTectura(value)
                                    }}
                                />

                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Color'
                                    onChangeText={(value) => {
                                        setColor(value)
                                    }}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='PH'
                                    onChangeText={(value) => {
                                        setPh(value)
                                    }}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Nitrogen'
                                    onChangeText={(value) => {
                                        setNitrogen(value)
                                    }}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Potassium'
                                    onChangeText={(value) => {
                                        setPotassium(value)
                                    }}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Aluminum'
                                    onChangeText={(value) => {
                                        setAluminum(value)
                                    }}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Calcium'
                                    onChangeText={(value) => {
                                        setCalcium(value)
                                    }}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Ferric Iron'
                                    onChangeText={(value) => {
                                        setFerric_iron(value)
                                    }}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Humus'
                                    onChangeText={(value) => {
                                        setHumus(value)
                                    }}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Magnecium'
                                    onChangeText={(value) => {
                                        setMagnecium(value)
                                    }}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Nitrite Nitrogeno'
                                    onChangeText={(value) => {
                                        setNitrite_nitrogeno(value)
                                    }}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Sulfate'
                                    onChangeText={(value) => {
                                        setSulfate(value)
                                    }}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Text style={StyleSuelo.textStyle}>
                                    Fecha de levantamiento
                                </Text>
                                <Text
                                    style={StyleSuelo.TextBox}
                                    onPress={() => setShowPicker1(true)}
                                >
                                    {fecha_levantamiento.toLocaleDateString()}
                                </Text>
                                {showPicker1 && (
                                    <DateTimePicker
                                        value={fecha_levantamiento}
                                        mode="date"
                                        display="default"
                                        onChange={onDateChange1}

                                    />
                                )}
                            </ListItem.Content>
                            <ListItem.Content >
                                <Text style={StyleSuelo.textStyle}>
                                    Fecha en laboratorio
                                </Text>
                                <Text
                                    style={StyleSuelo.TextBox}
                                    onPress={() => setShowPicker2(true)}
                                >
                                    {fecha_laboratorio.toLocaleDateString()}
                                </Text>
                                {showPicker2 && (
                                    <DateTimePicker
                                        value={fecha_laboratorio}
                                        mode="date"
                                        display="default"
                                        onChange={onDateChange2}

                                    />
                                )}

                            </ListItem.Content>
                            <ListItem style={StyleSuelo.centerObject}>

                                <Modal
                                    title="Identificar"
                                    onPress={showModal}
                                    buttonStyle={StyleSuelo.ButtonStyle}
                                />

                                <Dialog
                                    isVisible={modalVisible}
                                    onBackdropPress={closeModal}

                                >
                                    <Dialog.Title title="Resultados" />
                                    <Text>El suelo es perfecto para el cultivo de Marihuana.</Text>
                                    <Dialog.Actions>
                                        <Dialog.Button title="Aceptar"
                                            onPress={() => saveForm()} />
                                    </Dialog.Actions>
                                </Dialog>

                            </ListItem>
                        </View>
                    </ListItem.Accordion>

        
                    <View style={StyleSuelo.textContainerView}>
                        <Text style={StyleSuelo.textDivider}>
                            Lista de Bitácoras
                        </Text>
                        <View style={StyleSuelo.divider} />
                    </View>


                </View>

            }

            data={bitacoras}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />

    );
}

export default Suelo;