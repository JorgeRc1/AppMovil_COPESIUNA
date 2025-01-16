

// Modelo para el manejo de las bitacoras con id
const BitacoraCosechaDB = {
    id: -1,
    estadoClima : "",
    fecha_created : "",
    ID_parcela: 0,
    edad: "",
    ID_productor: 0,
    plantas: [{
        id: -1,
        numeroPlanta: 1,
        cantidadSanas: 0,
        ID_bitacora: -1,
        afectacion: [{
            id: -1,
            ID_afectacion: 7,
            ID_planta: -1
        }],
        mazorcas: [
            {
              id: -1,
              ID_afectacion: 1,
              cantidad: 10,
              ID_planta: -1

            },
          ]
    }]

  };

  export default BitacoraCosechaDB;
