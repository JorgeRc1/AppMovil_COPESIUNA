

// Modelo para el manejo de las bitacoras
const BitacoraCosecha = {
    estadoClima : "",
    fecha_created : "",
    ID_parcela: 0,
    edad: "",
    ID_productor: 0,
    plantas: [{
        numeroPlanta: 1,
        cantidadSanas: 0,
        afectacion: [{
            ID_afectacion: 7
        }],
        mazorcas: [
            {
              ID_afectacion: 1,
              cantidad: 10
            },
          ]
    }]

  };

  export default BitacoraCosecha;