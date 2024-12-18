import * as SQLite from 'expo-sqlite'
import BitacoraModel from './models/BitacoraSuelo';
import productor from './models/ProductorModel';


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
    direccion TEXT,
    cedula TEXT,
    fecha_create TEXT,
    fecha_update TEXT
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
        productor_id INTEGER,
        FOREIGN KEY (productor_id) REFERENCES productor(id))` ;

  await enableForeignKeys(db);
  await db.runAsync(queryProductor);
  await db.runAsync(queryBitacora);
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

export async function getProductores(db: SQLite.SQLiteDatabase){
  const query = 'SELECT * FROM productor';
  return await db.getAllAsync(query);
}

export async function loadProductores(db: SQLite.SQLiteDatabase){
 const query = 'DELETE FROM productor';
 await db.runAsync(query);

 console.log('aqing product');

 // Cargar los productores desde la API
 const queryIns = `INSERT INTO productor (id, nombre, direccion, cedula, fecha_create,  fecha_update) VALUES (1, 'Elton Cruz','ZAPOTE KUN', '610-110303-1002A', '20/11/2024', '20/11/2024')`;
 await db.runAsync(queryIns);

 const queryIns1 = `INSERT INTO productor (id, nombre, direccion, cedula, fecha_create,  fecha_update) VALUES (2, 'Maynor Padilla','El Guineno', '610-140702-1000B', '20/11/2024', '20/11/2024')`;
 await db.runAsync(queryIns1);

 const queryIns2 = `INSERT INTO productor (id, nombre, direccion, cedula, fecha_create,  fecha_update) VALUES (3, 'Jhon Z','El Perol', '610-150588-2002Z', '20/11/2024', '20/11/2024')`;
 await db.runAsync(queryIns2);

}

export async function insertProductor(db: SQLite.SQLiteDatabase, Productor: typeof productor){
  const date = new Date();
  const randomId = Math.floor(Math.random() * -10000) - 1;


  const query = `INSERT INTO productor (id, nombre, direccion, cedula, fecha_create,  fecha_update) VALUES ('1', '${Productor.nombre}','${Productor.direccion}', '${Productor.cedula}', '${date.toLocaleDateString()}', '${date.toLocaleDateString()}')`;

  const R = await db.runAsync(query);
  console.log("productor creado:"+ R);
}

export async function FindByIdProductor(db: SQLite.SQLiteDatabase, id: number){
  const query = `SELECT * FROM productor WHERE id = '${id}'`;
  return await db.runAsync(query);
}