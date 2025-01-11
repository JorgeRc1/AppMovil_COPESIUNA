import React from "react";
import { View, Text, ScrollView } from "react-native";
import styleCosecha from "../../assets/styles/StyleCosecha";
import { Input, ListItem, Button, Card, Icon } from '@rneui/base';
import { Dialog } from '@rneui/themed';
import { FAB } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';

const Cosecha = () => {
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [visibleFAB, setVisibleFAB] = React.useState(true);
    const [visibleModal, setVisibleModal] = React.useState(false);

    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);



    const [selectedProductor, setSelectedProductor] = React.useState<number | null>(null);
    const [productores, setProductores] = React.useState<any[]>([]);
    const [plants, setPlants] = React.useState<{ numeroPlanta: number; cantidadSanas: number }[]>([]);
    const [contador, setContador] = React.useState<number>(0);

    const toggleDialog = () => {
        setVisibleModal(!visibleModal);
    };

    const handleAddPlant = () => {
        setContador(prev => prev + 1);
        setPlants([...plants, { numeroPlanta: contador + 1, cantidadSanas: 0 }]);
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
        /*
        setBitacora(prevState => ({
            ...prevState,
            [key]: value,
        })); */
    };

    return (
        <ScrollView>
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
                            style={styleCosecha.StyleDropDownPicker}
                            textStyle={{ fontSize: 18 }}

                        />
                    </ListItem.Content>

                    <ListItem.Content>
                        <DropDownPicker
                            open={open1}
                            value={selectedProductor}
                            items={productores}
                            setOpen={setOpen1}
                            setValue={(callback) => {
                                const newValue = typeof callback === 'function' ? callback(selectedProductor) : callback;
                                setSelectedProductor(newValue);
                                handleChange('productor_id', newValue);
                            }}
                            setItems={setProductores}
                            placeholder="Tipo de parcela"
                            placeholderStyle={{ color: "#86939E" }}
                            style={styleCosecha.StyleDropDownPicker}
                            textStyle={{ fontSize: 18 }}


                        />
                    </ListItem.Content>
                    <ListItem.Content >


                        <Input style={styleCosecha.StyleList}
                            placeholder='Estado del clima'

                        />

                    </ListItem.Content>
                    <ListItem.Content >

                        <Input style={styleCosecha.StyleList}
                            placeholder='Edad'

                        />
                    </ListItem.Content>

                    <ListItem.Content >
                        <View style={styleCosecha.containerRow}>
                            <Text style={styleCosecha.textRegistro}>Registro de plantas</Text>
                            <Text style={styleCosecha.textContador}>{contador}</Text>
                        </View>

                    </ListItem.Content>

                    <ListItem.Content >

                        {
                            plants.map((plant, index) => (
                                <View key={plant.numeroPlanta}>

                                    <View

                                        style={styleCosecha.containerRow} >
                                        <Icon
                                            name='delete'
                                            size={25}
                                            color='red'
                                            onPress={() => handleRemovePlant(index)}
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
                                                onChangeText={value => hanldlerChangePLant(index, value)}
                                            />
                                        </View>

                                    </View>
                                    <Text style={styleCosecha.textAfectaciones} >Lista de afectaciones</Text>
                                    <View style={{ alignItems: 'center', }}>
                                        <Button
                                            title="Agregar afectacion"
                                            type="solid"
                                            buttonStyle={styleCosecha.buttonAfectacion}
                                            titleStyle={{
                                                color: '#FFFFFF',
                                            }}
                                            onPress={toggleDialog}
                                        />

                                        <Dialog
                                            isVisible={visibleModal}
                                            onBackdropPress={toggleDialog}
                                        >
                                            <Dialog.Title title="Modal de afectaciones" />
                                            <DropDownPicker
                                                open={open2}
                                                value={selectedProductor}
                                                items={productores}
                                                setOpen={setOpen2}
                                                setValue={(callback) => {
                                                    const newValue = typeof callback === 'function' ? callback(selectedProductor) : callback;
                                                    setSelectedProductor(newValue);
                                                    handleChange('productor_id', newValue);
                                                }}
                                                setItems={setProductores}
                                                placeholder="Selecciona la afectacion"
                                                placeholderStyle={{ color: "#86939E" }}
                                                style={styleCosecha.StyleDropDownPicker}
                                                textStyle={{ fontSize: 18 }}

                                            />

                                            <Input placeholder='Cantidad de mazorcas' keyboardType='numeric'></Input>
                                            <Dialog.Actions>
                                                <Button
                                                    type="clear"
                                                    titleStyle={{ color: '#4CAF50' }}
                                                    onPress={toggleDialog}
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




        </ScrollView>
    );
}

export default Cosecha;