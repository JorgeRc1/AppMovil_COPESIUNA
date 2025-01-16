import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import styleCosecha from "../../assets/styles/StyleCosecha";
import { Input, ListItem, Button, Card, Icon } from '@rneui/base';
import { Dialog } from '@rneui/themed';
import { Button as Modal } from "@rneui/themed"
import { FAB } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import {
    getDbConnection, getParcelas, getProductoresCosecha, getAfectaciones,
    insertCosechaBitacora, getCosechaBitacora, getPlantasById, insertPlantas, insertAfectaciones,
    getAfectacionById, insertMazorca, getMazorcasById
} from "@/app/utils/database/db";
import BitacoraCosechaDB from "@/app/utils/models/BitacoraCosechaDB";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Cosecha = () => {
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [visibleFAB, setVisibleFAB] = React.useState(true);
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [visibleModal1, setVisibleModal1] = React.useState(false);

    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [showInput, setShowInput] = React.useState(false);


    const [selectedProductor, setSelectedProductor] = React.useState<number | null>(null);
    const [productores, setProductores] = React.useState<any[]>([]);

    const [selectedParcela, setSelectedParcela] = React.useState<number | null>(null);
    const [parcelas, setParcelas] = React.useState<any[]>([]);

    const [selectedAfectacion, setSelectedAfectacion] = React.useState<number | null>(null);
    const [afectacion, setAfectacion] = React.useState<any[]>([]);

    const [plants, setPlants] = React.useState<{
        id: number;
        numeroPlanta: number;
        cantidadSanas: number;
        ID_bitacora: number;
        afectacion: { id: number, ID_planta: number; ID_afectacion: number }[];
        mazorcas: { id: number, ID_planta: number; ID_afectacion: number; cantidad: number }[];
    }[]>([]);


    const [bitacora, setBitacora] = React.useState(BitacoraCosechaDB);
    const [bitacoras, setBitacoras] = React.useState<typeof BitacoraCosechaDB[]>([]);
    const [contador, setContador] = React.useState<number>(0);
    const [indexPlant, setIndexPlant] = React.useState<number>(0);
    const [cantidaMazorcas, setCantidadMazorcas] = React.useState<string>("");


    useEffect(() => {
        async function loadData() {
            const db = await getDbConnection();
            await loadProductores();
            await loadAfectaciones();
            await loadBitacoras();

        }
        loadData();
    }, [])

    const loadProductores = async () => {
        const db = await getDbConnection();
        const Resultado: any = await getProductoresCosecha(db);
        const productoresData: { label: string; value: number }[] = Resultado.map((productor: { nombre: string; id: number }) => ({
            label: productor.nombre,
            value: productor.id
        }));
        setProductores(productoresData);
    }

    const loadBitacoras = async () => {
        const db = await getDbConnection();
        setBitacoras([]);
        const BitacoraList: any = await getCosechaBitacora(db);
        let list = [];
        for (let i = 0; i < BitacoraList.length; i++) {
            let model: typeof BitacoraCosechaDB;
            model = BitacoraList[i];
            let plantas: any = await getPlantasById(model.id, db);
            let modelPlantas: typeof plants;
            modelPlantas = plantas;

            for (let e = 0; e < plantas.length; e++) {
                let modelPlant = plantas[e];
                let afectaciones: any = await getAfectacionById(modelPlant.id.ID_afectacion, db);
                let mazorcas: any = await getMazorcasById(modelPlant.ID_afectacion, db);
                modelPlant.afectacion = afectaciones;
                modelPlant.mazorcas = mazorcas;

            }
            model.plantas = modelPlantas;
            list.push(model);
        }
        setBitacoras(list);

    }
    const loadParcela = async (id: number) => {
        const db = await getDbConnection();
        const Resultado: any = await getParcelas(db, id);
        const parcelaData: { label: string; value: number }[] = Resultado.map((parcela: { nombre: string; id: number }) => ({
            label: parcela.nombre,
            value: parcela.id
        }));
        setParcelas(parcelaData);
    }

    const loadAfectaciones = async () => {
        const db = await getDbConnection();
        const Resultado: any = await getAfectaciones(db);
        const afectacionData: { label: string; value: number }[] = Resultado.map((afectacion: { descripcion: string, nombre: string; id: number }) => ({
            label: afectacion.nombre + ' ' + '(' + afectacion.descripcion + ')',
            value: afectacion.id,
            descripcion: afectacion.descripcion
        }));
        setAfectacion(afectacionData);
    }

    const reducerList = () => {
        setExpanded(false);

    }

    const cleanForm = () => {

        setBitacora(BitacoraCosechaDB);
        let plantas = plants;
        setPlants([]);
        setContador(0);

        setSelectedProductor(null);
        setSelectedParcela(null);
    }

    // Función para manejar cambios en la listas de Items
    const handlerListItem = () => {
        setExpanded(!expanded);
        if (expanded == true) {
            cleanForm();
        }
    }


    async function ShowNewBitacora() {
        loadBitacoras();
        closeModal();
    }

    const toggleDialog = () => {
        setVisibleModal(!visibleModal);
    };
    const toggleDialogOpen = (index: number) => {
        setVisibleModal(!visibleModal);
        setIndexPlant(index)
    };
    const toggleDialogSave = () => {
        if (showInput) {
            const updatePlantas = { ...plants };
            if (selectedAfectacion !== null) {
                let cantidad: number = parseInt(cantidaMazorcas, 10);
                let nuevaAfectacion = { id: -1, ID_planta: -1, ID_afectacion: selectedAfectacion, cantidad: cantidad };
                updatePlantas[indexPlant].mazorcas.push(nuevaAfectacion);


            }
        } else {
            const updatePlantas = { ...plants };
            if (selectedAfectacion !== null) {
                let nuevaAfectacion = { id: -1, ID_planta: -1, ID_afectacion: selectedAfectacion };
                updatePlantas[indexPlant].afectacion.push(nuevaAfectacion);

            }
        }
        setCantidadMazorcas("");
        setSelectedAfectacion(null);
        setShowInput(false);
        setVisibleModal(!visibleModal);
    };

    const handleAddPlant = () => {
        setContador(prev => prev + 1);
        setPlants([...plants, { id: -1, ID_bitacora: -1, numeroPlanta: contador + 1, cantidadSanas: 0, afectacion: [], mazorcas: [], }]);
    };
    const handleRemovePlant = (index: number) => {
        const updatedPlants = plants.filter((_, i) => i !== index);

        setContador(prev => prev - 1)

        // update list
        for (let i = index + 1; i < contador; i++) {
            console.log(updatedPlants[i - 1])
            updatedPlants[i - 1].numeroPlanta = i;


        }

        setPlants(updatedPlants);




    };
    const hanldlerChangePLant = (index: number, cantidad: any) => {
        let cant: number = Number(cantidad)
        const newPlants = [...plants];
        newPlants[index].cantidadSanas = cant;
        setPlants(newPlants);
    }




    // Función para manejar cambios en los inputs
    const handleChange = (key: string, value: any) => {
        setBitacora(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleChangeP = (key: string, value: any) => {

        loadParcela(value);
        setBitacora(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleRemoveAfectacion = (plantIndex: number, afectacionId: number) => {

        const updatedPlants = [...plants];

        updatedPlants[plantIndex].afectacion = updatedPlants[plantIndex].afectacion.filter(
            (afect) => afect.ID_afectacion !== afectacionId
        );


        setPlants(updatedPlants);
    };

    const handleRemoveMazorca = (plantIndex: number, afectacionId: number) => {

        const updatedPlants = [...plants];

        updatedPlants[plantIndex].mazorcas = updatedPlants[plantIndex].mazorcas.filter(
            (mazorca) => mazorca.ID_afectacion !== afectacionId
        );


        setPlants(updatedPlants);
    };


    const handleChangeF = (key: string, value: any) => {
        let afec = afectacion.find(item => item.value === value);

        if (afec.descripcion == 'mazorca') {
            setShowInput(true);
        } else {
            setShowInput(false);
        }

        /*
        setBitacora(prevState => ({
            ...prevState,
            [key]: value,
        })); */
    };

    const closeModal = () => {
        reducerList();
        setVisibleModal1(!visibleModal1!);
    }


    // Manejo del evento de presionar el botón para mostrar la modal
    const saveForm = async () => {

        if (bitacora.edad == '' || bitacora.estadoClima == '' || plants.length == 0) {
            alert('Todos los campos son obligatorios');
            return;
        } else {
            const db = await getDbConnection();
            let idBitacora = await insertCosechaBitacora(bitacora, db);
            bitacora.plantas = plants;
            for (let i = 0; i < plants.length; i++) {
                let plant = plants[i];
                let idPlanta = await insertPlantas(plant, idBitacora, db);
                for (let j = 0; j < plant.afectacion.length; j++) {
                    let afectacion = plant.afectacion[j];
                    await insertAfectaciones(afectacion, idPlanta, db)

                }
                for (let e = 0; e < plant.mazorcas.length; e++) {
                    let mazorca = plant.mazorcas[e];
                    await insertMazorca(mazorca, idPlanta, db)
                }
            }


            setVisibleModal1(!visibleModal1);
        }

    };

    // renderizado para la lista de bitacoras
    const renderItem = ({ item }) => {
        const productor = productores.find(p => p.value === item.ID_productor);
        const parcela = parcelas.find(parcela => parcela.value === item.ID_parcela);
        return (
            <View key={item.id}>
            <Card containerStyle={styleCosecha.cardContainer}>
                <ListItem.Content>
                    <ListItem.Title>{productor.label}</ListItem.Title>
                    <ListItem.Subtitle>{parcela.label}</ListItem.Subtitle>
                    <Text style={styleCosecha.detailText}>Resultado:{item.id} </Text>


                    <View style={styleCosecha.buttonContainer}>
                        <Button
                            title="Enviar"
                            
                            buttonStyle={styleCosecha.enviarButton}
                        />
                        <Button
                            title="Editar"
                            type="outline"
                            titleStyle={{ color: '#28A745' }}
                    
                            buttonStyle={styleCosecha.editarButton}
                            containerStyle={styleCosecha.editButtonContainer}
                        />
                    </View>
                </ListItem.Content>
            </Card>
            </View>
            )
   
    }


    return (
        <FlatList
            ListHeaderComponent={
                <View>
                    <ListItem.Accordion
                        style={styleCosecha.StyleItem}
                        content={
                            <ListItem.Content>
                                <ListItem.Title>Realizar Estimación</ListItem.Title>
                                <ListItem.Subtitle>Presiona para abrir el formulario</ListItem.Subtitle>
                            </ListItem.Content>
                        }
                        isExpanded={expanded}
                        onPress={() => {
                            handlerListItem();
                        }}
                    >

                        <View style={styleCosecha.ViewContent}>

                            <ListItem.Content>
                                <View style={{ marginBottom: open ? 30 * productores.length : 0 }}>
                                    <DropDownPicker
                                        open={open}
                                        value={selectedProductor}
                                        items={productores}
                                        setOpen={setOpen}
                                        setValue={(callback) => {
                                            const newValue = typeof callback === 'function' ? callback(selectedProductor) : callback;
                                            setSelectedProductor(newValue);
                                            handleChangeP('ID_productor', newValue);
                                        }}
                                        setItems={setProductores}
                                        placeholder="Selecciona un productor"
                                        placeholderStyle={{ color: "#86939E" }}
                                        style={styleCosecha.StyleDropDownPicker}
                                        textStyle={{ fontSize: 18 }}

                                    />
                                </View>

                            </ListItem.Content>


                            <ListItem.Content >


                                <Input style={styleCosecha.StyleList}
                                    placeholder='Estado del clima'
                                    onChangeText={value => handleChange('estadoClima', value)}
                                    value={bitacora.estadoClima}

                                />

                            </ListItem.Content>
                            <ListItem.Content >

                                <Input style={styleCosecha.StyleList}
                                    placeholder='Edad'
                                    onChangeText={value => handleChange('edad', value)}
                                    value={bitacora.edad}

                                />
                            </ListItem.Content>
                            <ListItem.Content>
                                <View style={{ marginBottom: open1 ? 25 * parcelas.length : 0 }}>
                                    <DropDownPicker
                                        open={open1}
                                        value={selectedParcela}
                                        items={parcelas}
                                        setOpen={setOpen1}
                                        setValue={(callback) => {
                                            const newValue = typeof callback === 'function' ? callback(selectedParcela) : callback;
                                            setSelectedParcela(newValue);
                                            handleChange('ID_parcela', newValue);
                                        }}
                                        setItems={setParcelas}
                                        placeholder="Parcela"
                                        placeholderStyle={{ color: "#86939E" }}
                                        style={styleCosecha.StyleDropDownPicker}
                                        textStyle={{ fontSize: 18 }}


                                    />
                                </View>

                            </ListItem.Content>

                            <ListItem.Content >
                                <View style={styleCosecha.containerRow}>
                                    <Text style={styleCosecha.textRegistro}>Registro de plantas</Text>
                                    <Text style={styleCosecha.textContador}>{contador}</Text>
                                </View>

                            </ListItem.Content>

                            <ListItem.Content >

                                {
                                    plants.map((plant, indexP) => (

                                        <View key={plant.numeroPlanta}>

                                            <View

                                                style={styleCosecha.containerRow} >
                                                <Icon
                                                    name='delete'
                                                    size={25}
                                                    color='red'
                                                    onPress={() => handleRemovePlant(indexP)}
                                                    style={{ marginLeft: 3 }}

                                                />
                                                <Text style={styleCosecha.textStyle}>Planta N° {plant.numeroPlanta}</Text>

                                                <View style={{
                                                    width: '67%'
                                                }}>
                                                    <Input style={styleCosecha.StyleInput}
                                                        keyboardType='numeric'
                                                        placeholder='Cantidad mazorcas sanas'
                                                        value={plant.cantidadSanas === 0 ? "" : String(plant.cantidadSanas)}
                                                        onChangeText={value => hanldlerChangePLant(indexP, value)}
                                                    />
                                                </View>

                                            </View>
                                            <Text style={styleCosecha.textAfectaciones} >Lista de afectaciones</Text>

                                            {
                                                plant.afectacion.map((afect, index) => (
                                                    <View key={index}>

                                                        <View

                                                            style={styleCosecha.containerRow} >

                                                            <FontAwesome name="minus-circle" size={28} color="red" onPress={() => handleRemoveAfectacion(indexP, afect.ID_afectacion)} />

                                                            <Text style={styleCosecha.tetxAfec}>{afectacion.find(item => item.value === afect.ID_afectacion)?.label || ''}</Text>
                                                        </View>
                                                    </View>
                                                ))
                                            }

                                            {
                                                plant.mazorcas.map((mazorca, index) => (
                                                    <View key={index}>

                                                        <View

                                                            style={styleCosecha.containerRow} >

                                                            <FontAwesome name="minus-circle" size={28} color="red" onPress={() => handleRemoveMazorca(indexP, mazorca.ID_afectacion)} />

                                                            <Text style={styleCosecha.tetxAfec}>{afectacion.find(item => item.value === mazorca.ID_afectacion)?.label || ''} cantidad: {mazorca.cantidad}</Text>
                                                        </View>
                                                    </View>
                                                ))
                                            }
                                            <View style={{ alignItems: 'center', }}>
                                                <Button
                                                    title="Agregar afectacion"
                                                    type="outline"
                                                    buttonStyle={styleCosecha.buttonAfectacion}
                                                    titleStyle={{
                                                        color: '#4CAF50',
                                                        fontWeight: 'bold'
                                                    }}
                                                    onPress={() => toggleDialogOpen(indexP)}
                                                />

                                                <Dialog
                                                    isVisible={visibleModal}
                                                    onBackdropPress={toggleDialog}
                                                >
                                                    <Dialog.Title title="Modal de afectaciones" />
                                                    <DropDownPicker
                                                        open={open2}
                                                        value={selectedAfectacion}
                                                        items={afectacion}
                                                        setOpen={setOpen2}
                                                        setValue={(callback) => {
                                                            const newValue = typeof callback === 'function' ? callback(selectedAfectacion) : callback;
                                                            setSelectedAfectacion(newValue);
                                                            handleChangeF('productor_id', newValue);
                                                        }}
                                                        setItems={setAfectacion}
                                                        placeholder="Selecciona la afectacion"
                                                        placeholderStyle={{ color: "#86939E" }}
                                                        style={styleCosecha.StyleDropDownPicker}
                                                        textStyle={{ fontSize: 18 }}

                                                    />

                                                    {showInput && (
                                                        <Input
                                                            placeholder='Cantidad de mazorcas'
                                                            keyboardType='numeric'
                                                            value={cantidaMazorcas}
                                                            onChangeText={value => setCantidadMazorcas(value)}
                                                        />
                                                    )}
                                                    <Dialog.Actions>
                                                        <Button
                                                            type="clear"
                                                            titleStyle={{ color: '#4CAF50' }}
                                                            onPress={() => toggleDialogSave()}
                                                        >
                                                            Agregar
                                                        </Button>
                                                    </Dialog.Actions>
                                                </Dialog>
                                            </View>



                                        </View>
                                    ))
                                }

                            </ListItem.Content>


                        </View>
                        <View style={styleCosecha.containerFAB}>

                            <FAB
                                visible={visibleFAB}
                                icon={{ name: 'add', color: 'white' }}
                                color="green"
                                placement="right"
                                onPress={handleAddPlant}

                            />
                        </View>
                        <View style={styleCosecha.ViewContentObject}>


                            <Modal
                                title="Estimar cosecha"
                                onPress={saveForm}
                                buttonStyle={styleCosecha.ButtonStyle}
                            />

                            <Dialog
                                isVisible={visibleModal1}
                                onBackdropPress={closeModal}

                            >
                                <Dialog.Title title="Resultados" />
                                <Text>Aun no tenemos Resultados</Text>
                                <Dialog.Actions>
                                    <Button title="Aceptar" type="clear"
                                        onPress={() => ShowNewBitacora()}
                                    />
                                </Dialog.Actions>
                            </Dialog>

                        </View>

                    </ListItem.Accordion>
                    <View style={styleCosecha.textContainerView}>
                        <Text style={styleCosecha.textDivider}>
                            Lista de Bitácoras
                        </Text>
                        <View style={styleCosecha.divider} />
                    </View>

                </View>


            }
            data={bitacoras}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />




    );
}

export default Cosecha;