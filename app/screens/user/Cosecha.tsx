import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import styleCosecha from "../../assets/styles/StyleCosecha";
import { Input, ListItem, Button, Card, Icon } from '@rneui/base';
import { Dialog } from '@rneui/themed';
import { FAB } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import { getDbConnection, getParcelas, getProductoresCosecha, getAfectaciones } from "@/app/utils/database/db";
import BitacoraCosecha from "@/app/utils/models/BitacoraCosecha";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Cosecha = () => {
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [visibleFAB, setVisibleFAB] = React.useState(true);
    const [visibleModal, setVisibleModal] = React.useState(false);

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
        numeroPlanta: number;
        cantidadSanas: number;
        afectacion: { ID_afectacion: number }[];
        mazorcas: { ID_afectacion: number; cantidad: number }[];
    }[]>([]);


    const [bitacora, setBitacora] = React.useState(BitacoraCosecha);
    const [contador, setContador] = React.useState<number>(0);
    const [indexPlant, setIndexPlant] = React.useState<number>(0);
    const [cantidaMazorcas, setCantidadMazorcas] = React.useState<string>("");


    useEffect(() => {
        async function loadData() {
            const db = await getDbConnection();
            await loadProductores();
            await loadAfectaciones();

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
                let nuevaAfectacion = { ID_afectacion: selectedAfectacion, cantidad: cantidad };
                updatePlantas[indexPlant].mazorcas.push(nuevaAfectacion);
            
                
            }
        } else {
            const updatePlantas = { ...plants };
            if (selectedAfectacion !== null) {
                let nuevaAfectacion = { ID_afectacion: selectedAfectacion };
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
        setPlants([...plants, { numeroPlanta: contador + 1, cantidadSanas: 0, afectacion: [], mazorcas: [], }]);
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




    return (
        <FlatList
            ListHeaderComponent={
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
                        setExpanded(!expanded);
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

                                                        <FontAwesome name="minus-circle" size={28} color="red" onPress={ () => handleRemoveAfectacion(indexP, afect.ID_afectacion)} />

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

                                                        <FontAwesome name="minus-circle" size={28} color="red" onPress={ () => handleRemoveMazorca(indexP, mazorca.ID_afectacion)} />

                                                        <Text style={styleCosecha.tetxAfec}>{afectacion.find(item => item.value === mazorca.ID_afectacion)?.label || ''} cantidad: {mazorca.cantidad}</Text>
                                                    </View>
                                                </View>
                                            ))
                                        }
                                        <View style={{ alignItems: 'center', }}>
                                            <Button
                                                title="Agregar afectacion"
                                                type="solid"
                                                buttonStyle={styleCosecha.buttonAfectacion}
                                                titleStyle={{
                                                    color: '#FFFFFF',
                                                }}
                                                onPress={ ()=> toggleDialogOpen(indexP)}
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
                    <View style={styleCosecha.ViewContent}>
                        <Text>Hola</Text>
                    </View>




                </ListItem.Accordion>
            }
        />




    );
}

export default Cosecha;