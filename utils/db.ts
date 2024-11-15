import * as SQLite from 'expo-sqlite'

// Creando base de datos
const db = SQLite.openDatabaseAsync('copesiuna', {});

export async function getDbConnection() {
  return db;
}

export async function crearTablas(db: SQLite.SQLiteDatabase) {
  const queryD = `DROP TABLE IF EXISTS suelo`;
  const query = `CREATE TABLE IF NOT EXISTS suelo (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nombre VARCHAR(50), 
        tectura VARCHAR(15), 
        color VARCHAR(15), 
        ph INTEGER, 
        nitrogen INTEGER, 
        potassium INTEGER, 
        aluminum VARCHAR(25), 
        calcium INTEGER, 
        ferric_iron INTEGER, 
        humus INTEGER, 
        magnecium INTEGER, 
        nitrite_nitrogeno VARCHAR(15), 
        sulfate INTEGER, 
        fecha_levantamiento TEXT, 
        fecha_laboratorio TEXT)` ;
 await db.runAsync(query);
}


export async function insertSueloBitacora(db: SQLite.SQLiteDatabase,nombre: String, tectura: String, color: String, ph: number, nitrogen: number, potassium: number, aluminum: String, calcium: number, ferric_iron: number, humus: number, magnecium:number, nitrite_nitrogeno: number, sulfate:number, fecha_levantamiento: String, fecha_laboratorio: String) {
    const query = `INSERT INTO suelo (nombre, tectura, color, ph, nitrogen, 
    potassium, aluminum, calcium, ferric_iron, humus, magnecium, nitrite_nitrogeno, sulfate, fecha_levantamiento, fecha_laboratorio) 
    VALUES ('${nombre}', '${tectura}', '${color}', '${ph}', '${nitrogen}', '${potassium}', '${aluminum}', '${calcium}', '${ferric_iron}', '${humus}', '${magnecium}', '${nitrite_nitrogeno}', '${sulfate}', '${fecha_levantamiento}', '${fecha_laboratorio}')`;
 const r =  await db.runAsync(query);
}

export async function getSuelosBitacora(db: SQLite.SQLiteDatabase) {
    const query = 'SELECT * FROM suelo';
   return await db.getAllAsync(query);
} 

export async function borrarBitacora(db: SQLite.SQLiteDatabase, id:number){
  const query = 'DELETE FROM suelo where id = ' + id;
  await db.runAsync(query);
}