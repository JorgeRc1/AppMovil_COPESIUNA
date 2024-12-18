import { StyleSheet } from "react-native";

const StyleSuelo = StyleSheet.create({
    StyleItem: {
        marginTop: 10,

    },
    StyleList: {
        padding: 0,
        marginTop: 0,

    },
    ViewContent: {
        backgroundColor: "white"
    },
    TextBox: {
        borderColor: '#cccccc',
        borderBottomWidth: 1.5,
        borderRadius: 8,
        padding: 14,
        backgroundColor: 'white',
        fontSize: 16,
        color: '#333333',
        minWidth: '100%',
        textAlign: 'left',
        marginBottom: 15,
    },
    textStyle: {
        color: '#86939E',
        fontSize: 18,
        marginLeft: 10,


    },
    ButtonStyle: {
        backgroundColor: "#009933",
        minWidth: '50%',
        borderRadius: 10,

    },
    centerObject: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardContainer: {
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    detailText: {
        fontSize: 14,
        color: '#333',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    enviarButton: {
        backgroundColor: '#009933',
    },
    editarButton: {
        borderColor: '#28A745',
    },
    editButtonContainer: {
        marginLeft: 10,
    },
    textContainerView: {
        alignItems: 'center', 
        marginVertical: 20 
    },
    divider:{
        height: 3, 
        width: '60%', 
        backgroundColor: '#28A745', 
        borderRadius: 5 
    },
    textDivider: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#28A745', 
        marginBottom: 5
    },
    StyleDropDownPicker:{
        marginBottom: 15,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#cccccc',
        borderWidth: 0,
        borderBottomWidth: 1.5,
        padding: 14,
        color: 'white',
        
    },
    ButtonAdd: {
        backgroundColor: '#00A850', 
        width: 45, 
        height: 45, 
        borderRadius: 30, 
        marginLeft: 5,
    },
    rowContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: 10, 
        gap: 10, 
        width: '80%',
     
    },

});

export default StyleSuelo;