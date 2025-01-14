import * as SQLite from 'expo-sqlite'
import BitacoraModel from '../models/BitacoraSuelo';
import productor from '../models/ProductorModel';


// Creando base de datos
const db = SQLite.openDatabaseAsync('copesiuna', {});

// Activa el soporte de claves externas
export async function enableForeignKeys(db: SQLite.SQLiteDatabase) {
  await db.runAsync("PRAGMA foreign_keys = ON");
}

export async function getDbConnection() {
  return db;
}

export async function createTables(db: SQLite.SQLiteDatabase) {
  // Crea la tabla eliminar la tabla bitacora
  const queryD = `DROP TABLE IF EXISTS suelo`;
  // Crea la tabla productor
  const queryProductor = `CREATE TABLE IF NOT EXISTS productor (
    id INTEGER PRIMARY KEY,
    nombre TEXT,
    apellido TEXT,
    direccion TEXT,
    cedula TEXT,
    tipo TEXT)`;


  // crea tabla parcela con clave externa productor_id
  const queryParcela = `CREATE TABLE IF NOT EXISTS parcela (
    id INTEGER PRIMARY KEY,
    nombre TEXT,
    tamaño TEXT,
    cultivo TEXT,
    tipo Text,
    id_productor INTEGER
    )`;

  // Crea la tabla `bitacora` con clave externa productor_id
  const queryBitacora = `CREATE TABLE IF NOT EXISTS suelo (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        tectura TEXT, 
        color TEXT, 
        ph TEXT, 
        nitrogen TEXT, 
        potassium TEXT, 
        aluminum TEXT, 
        calcium TEXT, 
        ferric_iron TEXT, 
        humus TEXT, 
        magnecium TEXT, 
        nitrite_nitrogeno TEXT, 
        sulfate TEXT, 
        fecha_levantamiento TEXT, 
        fecha_laboratorio TEXT,
        productor_id INTEGER)` ;

  const queryAfectaciones = `CREATE TABLE IF NOT EXISTS afectaciones (
        id INTEGER PRIMARY KEY,
        nombre TEXT,
        descripcion TEXT,
        fecha_create TEXT,
        fecha_update TEXT
  )`;


  await db.runAsync(queryProductor);
  await db.runAsync(queryParcela);
  await db.runAsync(queryBitacora);
  await db.runAsync(queryAfectaciones);
}

export async function insertAfectacion(afectacion: any, db: SQLite.SQLiteDatabase) {
  const query = `INSERT INTO afectaciones (id, nombre, descripcion, fecha_create, fecha_update) VALUES (${afectacion.id}, '${afectacion.nombre}', '${afectacion.descripcion}', '${afectacion.fecha_create}', '${afectacion.fecha_update}')`;
  return await db.runAsync(query);
  
}

export async function deleteAfectaciones(db: SQLite.SQLiteDatabase) {
  const query = 'DELETE FROM afectaciones';
  return await db.runAsync(query);
}

export async function getAfectaciones(db: SQLite.SQLiteDatabase) {
  const query = 'SELECT * FROM afectaciones';
  return await db.getAllAsync(query);
}



export async function insertSueloBitacora(db: SQLite.SQLiteDatabase, Bitacora: typeof BitacoraModel) {
  const query = `INSERT INTO suelo (tectura, color, ph, nitrogen, 
    potassium, aluminum, calcium, ferric_iron, humus, magnecium, nitrite_nitrogeno, sulfate, fecha_levantamiento, fecha_laboratorio, productor_id) 
    VALUES ('${Bitacora.tectura}', '${Bitacora.color}', '${Bitacora.ph}', '${Bitacora.nitrogen}', '${Bitacora.potassium}', '${Bitacora.aluminum}', '${Bitacora.calcium}', '${Bitacora.ferric_iron}', '${Bitacora.humus}', '${Bitacora.magnecium}', '${Bitacora.nitrite_nitrogeno}', '${Bitacora.sulfate}', '${Bitacora.fecha_levantamiento}', '${Bitacora.fecha_laboratorio}','${Bitacora.productor_id}' )`;
  return await db.runAsync(query);
}

export async function getSuelosBitacora(db: SQLite.SQLiteDatabase) {
  const query = 'SELECT * FROM suelo';
  return await db.getAllAsync(query);
}

export async function deleteBitacora(db: SQLite.SQLiteDatabase, id: number) {
  const query = 'DELETE FROM suelo where id = ' + id;
  await db.runAsync(query);
}

export async function editBitacora(db: SQLite.SQLiteDatabase, updatedBitacora: typeof BitacoraModel) {
  const query = `
      UPDATE suelo SET  
          tectura = '${updatedBitacora.tectura}', 
          color = '${updatedBitacora.color}', 
          ph = '${updatedBitacora.ph}', 
          nitrogen = '${updatedBitacora.nitrogen}', 
          potassium = '${updatedBitacora.potassium}', 
          aluminum = '${updatedBitacora.aluminum}', 
          calcium = '${updatedBitacora.calcium}', 
          ferric_iron = '${updatedBitacora.ferric_iron}', 
          humus = '${updatedBitacora.humus}', 
          magnecium = '${updatedBitacora.magnecium}', 
          nitrite_nitrogeno = '${updatedBitacora.nitrite_nitrogeno}', 
          sulfate = '${updatedBitacora.sulfate}', 
          fecha_levantamiento = '${updatedBitacora.fecha_levantamiento}', 
          fecha_laboratorio = '${updatedBitacora.fecha_laboratorio}',
          productor_id = '${updatedBitacora.productor_id}'
      WHERE id = ${updatedBitacora.id}`;
  await db.runAsync(query);

}

export async function getProductoresSuelos(db: SQLite.SQLiteDatabase){
  const query = 'SELECT * FROM productor WHERE tipo = "Analisis Fisico-Clinico de Suelo"';
  return await db.getAllAsync(query);
}

export async function getProductoresCosecha(db: SQLite.SQLiteDatabase){
  const query = 'SELECT * FROM productor WHERE tipo = "Estimacion de Cosecha"';
  return await db.getAllAsync(query);
}

export async function deleteProductores(db: SQLite.SQLiteDatabase){
  const query = `DELETE FROM productor`;
  await db.runAsync(query);
}

export async function deleteParcelas(db: SQLite.SQLiteDatabase){
  const query = `DELETE FROM parcela`;
  await db.runAsync(query);
}

export async function getParcelas(db: SQLite.SQLiteDatabase, idProductor:number){
  const query = `SELECT * FROM parcela WHERE id_productor = '${idProductor}'`;
  return await db.getAllAsync(query);

}

export async function insertProductor(db: SQLite.SQLiteDatabase, Productor:any, tipo: string){
  let id = Productor.id;

  const query = `INSERT INTO productor (id, nombre, apellido, direccion, cedula, tipo) VALUES ('${id}', '${Productor.nombre}', '${Productor.apellido}', '${Productor.direccion}', '${Productor.cedula}', '${tipo}')`;
  await db.runAsync(query);

  for (let i = 0; i < Productor.parcelas.length; i++) {
    
    const queryParcela = `INSERT INTO parcela (id, nombre, tamaño, cultivo, tipo, id_productor) VALUES ('${Productor.parcelas[i].id}', '${Productor.parcelas[i].nombre}', '${Productor.parcelas[i].tamaño}', '${Productor.parcelas[i].cultivo}', '${Productor.parcelas[i].tipo.descripcion}', '${id}')`;
    await db.runAsync(queryParcela);
  }

}

export async function FindByIdProductor(db: SQLite.SQLiteDatabase, id: number){
  const query = `SELECT * FROM productor WHERE id = '${id}'`;
  return await db.runAsync(query);
}