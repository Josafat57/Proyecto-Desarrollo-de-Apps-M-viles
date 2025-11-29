import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class Database {
   constructor(){
        this.db = null;
        this.storageKey = 'transacciones';
   }
   async initialize(){
     try{
        if (Platform.OS === 'web'){
            console.log('Usando LocalStorage para web');
            this.initializeWebStorage();
        } else {
            console.log('Usando SQLite para movil');
            this.db = await SQLite.openDatabaseAsync('miapp.db');
            await this.db.execAsync(`CREATE TABLE IF NOT EXISTS transacciones (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tipo TEXT,
                monto REAL,
                cuentaDestino TEXT,
                concepto TEXT,
                fecha TEXT
            );
          `);
        }
        console.log('Base de datos inicializada');
     } catch (error){
        console.error ('Error inicializando la base de datos:', error);
        throw error;
     }
   }
   initializeWebStorage(){
       if(!localStorage.getItem(this.storageKey)){
            localStorage.setItem(this.storageKey, JSON.stringify([]));
       }
    }
    async insertarTransaccion(monto,cuetaDestino,concepto,tipo = 'ingreso'){
        if (Platform.OS === 'web'){
            const transacciones = JSON.parse(localStorage.getItem('this.storageKey')||'[]')
            const nuevaTransaccion = {
                id: Date.now(),
                monto: parseFloat(monto),
                concepto: concepto || '',
                metodo_pago: metodoPago,
                fecha: new Date().toISOString()
            };
            transacciones.unshift(nuevaTransaccion);
            localStorage.setItem('this.storageKey', JSON.stringify(transacciones));
            return nuevaTransaccion;
        } else {
            const result = await this.db.runAsync(
                'INSERT INTO transacciones (monto, descripcion) VALUES (?,?,?,?,?)', SOString()
               
            );
            return {
                 id: result.lastInsertRowId,
                tipo: tipo,
                monto: parseFloat(monto),
                concepto: concepto || '',
                cuentaDestino: metodoPago,
                fecha: new Date().toISOString()
            };
        }
    }
  async getAll() {
        if (Platform.OS === 'web') {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } else {
            return await this.db.getAllAsync(
                'SELECT * FROM transacciones ORDER BY fecha DESC'
            );
        }
    }
    async getBalance() {
        if (Platform.OS === 'web') {
            const transacciones = await this.getAll();
            return transacciones.reduce((total, trans) => {
                return trans.tipo === 'ingreso' ? total + trans.monto : total - trans.monto;
            }, 0);
        } else {
            const result = await this.db.getFirstAsync(`
                SELECT 
                    SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE -monto END) as balance
                FROM transacciones
            `);
            return result?.balance || 0;
        }
    }
}


const databaseService = new DatabaseService();

export const initDatabase = () => databaseService.initialize();
export const insertTransaccion = (monto, concepto, metodoPago, tipo) => 
    databaseService.insertTransaccion(monto, concepto, metodoPago, tipo);
export const getAllTransacciones = () => databaseService.getAll();
export const getBalance = () => databaseService.getBalance();

export default databaseService;


     