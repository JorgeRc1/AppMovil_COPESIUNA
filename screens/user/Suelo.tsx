import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, ScrollView, Text } from "react-native";
import { Input, ListItem } from '@rneui/base';
import { Button as Modal, Dialog } from "@rneui/themed"
import StyleSuelo from "@/assets/styles/StyleSuelo";

const Suelo = () => {
    const [expanded, setExpanded] = React.useState(false);
    const [date1, setDate1] = React.useState(new Date());
    const [date2, setDate2] = React.useState(new Date());
    const [showPicker1, setShowPicker1] = React.useState(false);
    const [showPicker2, setShowPicker2] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);

    // Manejo del evento de presionar el botón para mostrar la modal

    const showModal = () => {
        setModalVisible(!modalVisible);
    };

    const closeModal = () => {
        reducerList();
        setModalVisible(false);
    };

    // Manejo del evento de cambio de fecha del levantamiento 
    const onDateChange1 = (event, selectedDate) => {
        const currentDate = selectedDate || date1;
        setShowPicker1(false);
        setDate1(currentDate);
    };

    // Manejo del evento de cambio de fecha del Laboratorio
    const onDateChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date2;
        setShowPicker2(false);
        setDate2(currentDate);
    };

    const reducerList = () => {
        setExpanded(false);
    }




    return (
        <View>
            <ScrollView>
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
                        setExpanded(!expanded);
                    }}
                >
                    <View style={StyleSuelo.ViewContent}>
                        <ListItem.Content>

                            <Input style={StyleSuelo.StyleList}
                                placeholder='Nombre del Productor'
                            />

                        </ListItem.Content>
                        <ListItem.Content >


                            <Input style={StyleSuelo.StyleList}
                                placeholder='Tectura'
                            />

                        </ListItem.Content>
                        <ListItem.Content >
                            <Input style={StyleSuelo.StyleList}
                                placeholder='Color'
                            />
                        </ListItem.Content>
                        <ListItem.Content >
                            <Input style={StyleSuelo.StyleList}
                                placeholder='PH'
                            />
                        </ListItem.Content>
                        <ListItem.Content >
                            <Input style={StyleSuelo.StyleList}
                                placeholder='Nitrogen'
                            />
                        </ListItem.Content>
                        <ListItem.Content >
                            <Input style={StyleSuelo.StyleList}
                                placeholder='Potassium'
                            />
                        </ListItem.Content>
                        <ListItem.Content >
                            <Input style={StyleSuelo.StyleList}
                                placeholder='Aluminum'
                            />
                        </ListItem.Content>
                        <ListItem.Content >
                            <Input style={StyleSuelo.StyleList}
                                placeholder='Calcium'
                            />
                        </ListItem.Content>
                        <ListItem.Content >
                            <Input style={StyleSuelo.StyleList}
                                placeholder='Ferric Iron'
                            />
                        </ListItem.Content>
                        <ListItem.Content >
                            <Input style={StyleSuelo.StyleList}
                                placeholder='Humus'
                            />
                        </ListItem.Content>
                        <ListItem.Content >
                            <Input style={StyleSuelo.StyleList}
                                placeholder='Magnecium'
                            />
                        </ListItem.Content>
                        <ListItem.Content >
                            <Input style={StyleSuelo.StyleList}
                                placeholder='Nitrite Nitrogeno'
                            />
                        </ListItem.Content>
                        <ListItem.Content >
                            <Input style={StyleSuelo.StyleList}
                                placeholder='Sulfate'
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
                                {date1.toLocaleDateString()}
                            </Text>
                            {showPicker1 && (
                                <DateTimePicker
                                    value={date1}
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
                                {date2.toLocaleDateString()}
                            </Text>
                            {showPicker2 && (
                                <DateTimePicker
                                    value={date1}
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
                                    <Dialog.Button title="Aceptar" onPress={closeModal}/>
                                </Dialog.Actions>
                            </Dialog>

                        </ListItem>
                    </View>
                </ListItem.Accordion>


                <Text>Lista de Bitacoras</Text>



            </ScrollView>

        </View>
    );
}

export default Suelo;