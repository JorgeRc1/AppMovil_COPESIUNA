import { StyleSheet } from "react-native";

const StyleLogin = StyleSheet.create({
    button: {
        borderWidth: 4,
        borderRadius: 30,
    },
    logoContainer: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200,
    },
    tarjeta: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }

});

export default StyleLogin;