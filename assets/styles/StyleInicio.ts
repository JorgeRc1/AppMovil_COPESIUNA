import { StyleSheet } from 'react-native';

const StyleInicio = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 10,
    },


    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: '#005F3B',
        fontWeight: 'bold',
        fontSize: 18,
    },
    subtitle: {
        color: '#00A850',
        fontSize: 16,
        textAlign: 'center',
    },
    



    card: {
        borderRadius: 10,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        marginLeft: 10,
        fontSize: 18,
        color: '#2E2E2E',
    },
    cardText: {
        marginVertical: 5,
        fontSize: 16,
        color: '#4D4D4D',
    },
    highlight: {
        fontWeight: 'bold',
        color: '#00A850',
    },
    button: {
        backgroundColor: '#00A850',
        borderRadius: 5,
        marginTop: 10,
    },
});

export default StyleInicio;