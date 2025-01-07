import React, { useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, FlatList } from "react-native";
import { Input, ListItem, Button, Card } from '@rneui/base';
import { Button as Modal, Dialog } from "@rneui/themed"
import DropDownPicker from 'react-native-dropdown-picker';
import StyleSuelo from "../../assets/styles/StyleSuelo";
import { getDbConnection, insertSueloBitacora, getSuelosBitacora, deleteBitacora, editBitacora, getProductoresSuelos, insertProductor, FindByIdProductor } from '../../utils/database/db'
import BitacoraModel from '../../utils/models/BitacoraSuelo'
import ProductorModel from '../../utils/models/ProductorModel'
import { showMessage } from "react-native-flash-message";
import { sendBitacoraSuelo } from "@/app/services/BitacoraService";
import productor from "../../utils/models/ProductorModel";



const Suelo = () => {
    const [expanded, setExpanded] = React.useState(false);
    const [showPicker1, setShowPicker1] = React.useState(false);
    const [showPicker2, setShowPicker2] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalProdVisible, setModalProdVisible] = React.useState(false);
    const [date1, setDate1] = React.useState(new Date());
    const [date2, setDate2] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [selectedProductor, setSelectedProductor] = React.useState<number | null>(null);

    // estados locales para almacenar los datos de la bitacora 
    const [bitacora, setBitacora] = React.useState(BitacoraModel);
    const [productorF, setProductorF] = React.useState(ProductorModel);
    const [bitacoras, setBitacoras] = React.useState([]);
    const [productores, setProductores] = React.useState<any[]>([]);


    useEffect(() => {

        async function cargarBitacoras() {
            await loadProductores();
            const db = await getDbConnection();
            const Resultado: any = await getSuelosBitacora(db);
            setBitacoras(Resultado);
            console.log("execute");



        }
        cargarBitacoras();

    }, [])
    async function ShowNewBitacora() {
        loadList();
        closeModal();
    }

    const loadProductores = async () => {
        const db = await getDbConnection();
        const Resultado: any = await getProductoresSuelos(db);
        console.log("busqueda", Resultado);
        const productoresData: { label: string; value: number }[] = Resultado.map((productor: { nombre: string; id: number }) => ({
            label: productor.nombre,
            value: productor.id
        }));
        setProductores(productoresData);
    }

 

    // Manejo del evento de presionar el botón para mostrar la modal
    const saveForm = async () => {

        if (bitacora.tectura == '' || bitacora.color == '' || bitacora.ph == '' || bitacora.nitrogen == '' || bitacora.potassium == ''
            || bitacora.aluminum == '' || bitacora.calcium == '' || bitacora.ferric_iron == ''
            || bitacora.humus == '' || bitacora.magnecium == '' || bitacora.nitrite_nitrogeno == ''
            || bitacora.sulfate == '') {
            alert('Todos los campos son obligatorios');
            return;
        } else {
            const db = await getDbConnection();
            if (bitacora.id == -1) {

                await insertSueloBitacora(db, bitacora);
                
            } else {

                await editBitacora(db, bitacora);

            }
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
        setDate1(currentDate);
        handleChange('fecha_levantamiento', currentDate.toLocaleDateString());
    };

    // Manejo del evento de cambio de fecha del Laboratorio
    const onDateChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date2;
        setShowPicker2(false);
        setDate2(currentDate);
        handleChange('fecha_laboratorio', currentDate.toLocaleDateString());
    };

    const reducerList = () => {
        setExpanded(false);
    }

    // renderizado para la lista de bitacoras
    const renderItem = ({ item }) => {

        const productor = productores.find(p => p.value === item.productor_id);
        return (
            <Card containerStyle={StyleSuelo.cardContainer}>
                <ListItem.Content>
                    <ListItem.Title>{productor.label}</ListItem.Title>
                    <ListItem.Subtitle>Fecha: {item.fecha_levantamiento}</ListItem.Subtitle>
                    <Text style={StyleSuelo.detailText}>Resultado: </Text>


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
                            onPress={() => BotonEditar(item, productor)}
                            buttonStyle={StyleSuelo.editarButton}
                            containerStyle={StyleSuelo.editButtonContainer}
                        />
                    </View>
                </ListItem.Content>
            </Card>)
    }

    // Función para manejar el botón de enviar
    const BotonEnviar = async (bitacora: any) => {

        try {
;
            console.log("Enviando bitácora:", bitacora);
            const db = await getDbConnection();
            const {data} = await sendBitacoraSuelo(bitacora);
            console.log(data);
            deleteBitacora(db, bitacora.id);
            loadList();
            showMessage({
                message: "¡Éxito!",
                description: "Productor creado con éxito.",
                type: "success",
            });
        } catch (err) {
            console.error(err);
            showMessage({
                message: "Error",
                description: "Error al enviar la bitácora." + err,
                type: "danger",
            });
        }


    };

    const loadList = async () => {
        const db = await getDbConnection();
        const Resultado: any = await getSuelosBitacora(db);
        console.log(Resultado);
        setBitacoras(Resultado);
    }

    const cleanForm = () => {
        setBitacora(BitacoraModel);
        setSelectedProductor(null);
    }

    // Función para manejar el botón de editar
    const BotonEditar = (bitacora: any, productor: any) => {
        setBitacora(bitacora);
        setSelectedProductor(productor.value);
        setExpanded(!expanded);
    };

    // Función para manejar cambios en los inputs
    const handleChange = (key: string, value: any) => {
        setBitacora(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleChangeProduct = (key: string, value: any) => {
        setProductorF(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    // Función para manejar cambios en la listas de Items
    const handlerListItem = () => {
        setExpanded(!expanded);
        if (expanded == false) {
            cleanForm();
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
                            handlerListItem();
                        }}
                    >
                        <View style={StyleSuelo.ViewContent}>
                            <ListItem.Content>
                     
                                    <DropDownPicker
                                        open={open}
                                        value={selectedProductor}
                                        items={productores}
                                        setOpen={setOpen}
                                        setValue={(callback) => {
                                            const newValue = typeof callback === 'function' ? callback(selectedProductor) : callback;
                                            setSelectedProductor(newValue);
                                            handleChange('productor_id', newValue);
                                        }}
                                        setItems={setProductores}
                                        placeholder="Selecciona un productor"
                                        placeholderStyle={{ color: "#86939E" }}
                                        style={StyleSuelo.StyleDropDownPicker}
                                        textStyle={{fontSize: 18}}

                                    />

                            </ListItem.Content>
                            <ListItem.Content >


                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Tectura'
                                    onChangeText={value => handleChange('tectura', value)}
                                    value={bitacora.tectura}
                                />

                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Color'
                                    onChangeText={value => handleChange('color', value)}
                                    value={bitacora.color}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='PH'
                                    onChangeText={value => handleChange('ph', value)}
                                    value={bitacora.ph}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Nitrogen'
                                    onChangeText={value => handleChange('nitrogen', value)}
                                    value={bitacora.nitrogen}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Potassium'
                                    onChangeText={value => handleChange('potassium', value)}
                                    value={bitacora.potassium}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Aluminum'
                                    onChangeText={value => handleChange('aluminum', value)}
                                    value={bitacora.aluminum}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Calcium'
                                    onChangeText={value => handleChange('calcium', value)}
                                    value={bitacora.calcium}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Ferric Iron'
                                    onChangeText={value => handleChange('ferric_iron', value)}
                                    value={bitacora.ferric_iron}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Humus'
                                    onChangeText={value => handleChange('humus', value)}
                                    value={bitacora.humus}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Magnecium'
                                    onChangeText={value => handleChange('magnecium', value)}
                                    value={bitacora.magnecium}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Nitrite Nitrogeno'
                                    onChangeText={value => handleChange('nitrite_nitrogeno', value)}
                                    value={bitacora.nitrite_nitrogeno}
                                />
                            </ListItem.Content>
                            <ListItem.Content >
                                <Input style={StyleSuelo.StyleList}
                                    placeholder='Sulfate'
                                    onChangeText={value => handleChange('sulfate', value)}
                                    value={bitacora.sulfate}
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
                                    {bitacora.fecha_levantamiento}
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
                                    {bitacora.fecha_laboratorio}
                                </Text>
                                {showPicker2 && (
                                    <DateTimePicker
                                        value={date2}
                                        mode="date"
                                        display="default"
                                        onChange={onDateChange2}

                                    />
                                )}

                            </ListItem.Content>
                            <ListItem style={StyleSuelo.centerObject}>

                                <Modal
                                    title="Identificar"
                                    onPress={saveForm}
                                    buttonStyle={StyleSuelo.ButtonStyle}
                                />

                                <Dialog
                                    isVisible={modalVisible}
                                    onBackdropPress={closeModal}

                                >
                                    <Dialog.Title title="Resultados" />
                                    <Text>El suelo es perfecto para el cultivo de Marihuana.</Text>
                                    <Dialog.Actions>
                                        <Button title="Aceptar" type="clear"
                                            onPress={() => ShowNewBitacora()}
                                        />
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