import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabaseAsync('appplus.db');

export const initDatabase = () => {
    return new Promise((resolve, reject)) => {
        db.transaction(tx => {
            tx.executeSql(
               `CREATE TABLE IF NOT EXISTS transacciones(
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               monto REAL NOT NULL,
               concepto TEXT,
               metodo_pago TEXT NOT NULL,
               fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
               tipo TEXT DEFAULT 'ingreso');`,[],
               () => resolve(),
               (_, error) => {
                console.log ('Error creando tabla:', error);
                reject(error);
                return false;
               }
            );
        });
    };

    export const insertTransaccion = (monto, concepto, metodoPago, tipo = 'ingreso' ) =>{
        return new Promise ((resolve, reject) => {
            db.transaction(tx =>{
                tx.executeSql(
                     `INSERT INTO transacciones (monto, concepto, metodo_pago, tipo) VALUES (?,?,?,?); `,
                     [parseFloat(monto), concepto, metodoPago, tipo],
                     (_, result) => resolve(result),
                     (_,error) => {
                        reject(error);
                        return false;
                        
                     }
                );
            });
        });
    };

}