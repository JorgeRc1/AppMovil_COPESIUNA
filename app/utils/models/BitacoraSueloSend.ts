import productor from "./ProductorModel";
import BitacoraModel from "./BitacoraSuelo";
// Modelo para el envio de las bitacoras de analicis de suelos
class BitacoraModelSend {
    id: Number;
    tectura: String;
    color: String;
    ph: String;
    nitrogen: String;
    potassium: String;
    aluminum: String;
    calcium: String;
    ferric_iron: String;
    humus: String;
    magnecium: String;
    nitrite_nitrogeno: String;
    sulfate: String;
    fecha_levantamiento: String;
    fecha_laboratorio: String;
    productor: any;


    constructor( bitacora: typeof BitacoraModel, productorN: any) {
        this.id = bitacora.id;
        this.tectura = bitacora.tectura;
        this.color = bitacora.color;
        this.ph = bitacora.ph;
        this.nitrogen = bitacora.nitrogen;
        this.potassium = bitacora.potassium;
        this.aluminum = bitacora.aluminum;
        this.calcium = bitacora.calcium;
        this.ferric_iron =bitacora.ferric_iron;
        this.humus = bitacora.humus;
        this.magnecium = bitacora.magnecium;
        this.nitrite_nitrogeno = bitacora.nitrite_nitrogeno;
        this.sulfate = bitacora.sulfate;
        this.fecha_levantamiento = bitacora.fecha_levantamiento;
        this.fecha_laboratorio = bitacora.fecha_laboratorio;
        this.productor = productorN;
        
    }
};

export default BitacoraModelSend;