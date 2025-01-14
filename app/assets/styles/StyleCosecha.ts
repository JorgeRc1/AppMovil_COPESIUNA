import { Button } from "@rneui/base";
import { StyleSheet } from "react-native";


const styleCosecha = StyleSheet.create({
    StyleItem: {
        marginTop: 10,

    },
    textRegistro: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginRight: 12
      },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        paddingBottom: 0,
      },
    textContador: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#4CAF50',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10
      },

    ViewContent: {
        flex: 1,
        padding: 10,
        marginBottom: 0,
        backgroundColor: "white"
    },

    ViewRegistro: {
    
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
    StyleList: {
        padding: 0,
        marginTop: 0,

    },
    StyleInput: {
       textAlign: 'center'
    },
    textStyle: {
        color: '#86939E',
        fontSize: 18,
        marginLeft: 10,


    },
    containerFAB: {
        paddingTop: 25,
        backgroundColor: 'white'
    },
    buttonAfectacion:{
        marginTop: 12,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingHorizontal: 20,
        //width: "80%"
    },
    textAfectaciones: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#86939E',
        textAlign: 'center',
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
    tetxAfec:{
        marginLeft: 10
    },




});

export default styleCosecha;