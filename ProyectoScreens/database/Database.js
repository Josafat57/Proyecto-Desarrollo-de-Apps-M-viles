import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class Database {
    constructor() {
        this.db = null;
        this.storageKey = 'transacciones';
        this.userKey = 'usuarios_local'; 
    }

    async initialize() {
        try {
            if (Platform.OS === 'web') {
                console.log('Usando LocalStorage para web');
                this.initializeWebStorage();
            } else {
                console.log('Usando SQLite para movil');
                this.db = await SQLite.openDatabaseAsync('miapp.db');
                
                await this.db.execAsync(`
                    CREATE TABLE IF NOT EXISTS transacciones (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        tipo TEXT,
                        monto REAL,
                        cuentaDestino TEXT,
                        concepto TEXT,
                        fecha TEXT
                    );
                `);

                await this.db.execAsync(`
                    CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        email TEXT UNIQUE,
                        password TEXT,
                        preguntaSeguridad TEXT,
                        respuestaSeguridad TEXT
                    );
                `);
            }
            console.log('Base de datos inicializada');
        } catch (error) {
            console.error('Error inicializando la base de datos:', error);
            throw error;
        }
    }

    initializeWebStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.userKey)) {
            localStorage.setItem(this.userKey, JSON.stringify([]));
        }
    }

    async registerUser(email, password, pregunta, respuesta) {
        if (Platform.OS === 'web') {
            const users = JSON.parse(localStorage.getItem(this.userKey) || '[]');
            if (users.find(u => u.email === email)) throw new Error('El usuario ya existe');
            
            const newUser = { id: Date.now(), email, password, pregunta, respuesta };
            users.push(newUser);
            localStorage.setItem(this.userKey, JSON.stringify(users));
            return newUser;
        } else {
            try {
                const result = await this.db.runAsync(
                    'INSERT INTO users (email, password, preguntaSeguridad, respuestaSeguridad) VALUES (?, ?, ?, ?)',
                    [email, password, pregunta, respuesta]
                );
                return { id: result.lastInsertRowId, email };
            } catch (error) {
                throw new Error('El correo ya está registrado');
            }
        }
    }

    async loginUser(email, password) {
        if (Platform.OS === 'web') {
            const users = JSON.parse(localStorage.getItem(this.userKey) || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            if (!user) throw new Error('Credenciales inválidas');
            return user;
        } else {
            const user = await this.db.getFirstAsync(
                'SELECT * FROM users WHERE email = ? AND password = ?',
                [email, password]
            );
            if (!user) throw new Error('Credenciales inválidas');
            return user;
        }
    }

    async getSecurityQuestion(email) {
        if (Platform.OS === 'web') {
            const users = JSON.parse(localStorage.getItem(this.userKey) || '[]');
            const user = users.find(u => u.email === email);
            if (!user) throw new Error('Usuario no encontrado');
            return user.preguntaSeguridad;
        } else {
            const user = await this.db.getFirstAsync(
                'SELECT preguntaSeguridad FROM users WHERE email = ?',
                [email]
            );
            if (!user) throw new Error('Usuario no encontrado');
            return user.preguntaSeguridad;
        }
    }

    async resetPassword(email, respuesta, newPassword) {
        if (Platform.OS === 'web') {
            let users = JSON.parse(localStorage.getItem(this.userKey) || '[]');
            const userIndex = users.findIndex(u => u.email === email);
            
            if (userIndex === -1) throw new Error('Usuario no encontrado');
            if (users[userIndex].respuestaSeguridad !== respuesta) throw new Error('Respuesta incorrecta');

            users[userIndex].password = newPassword;
            localStorage.setItem(this.userKey, JSON.stringify(users));
            return true;
        } else {
            const user = await this.db.getFirstAsync(
                'SELECT id FROM users WHERE email = ? AND respuestaSeguridad = ?',
                [email, respuesta]
            );
            
            if (!user) throw new Error('Respuesta incorrecta');

            await this.db.runAsync(
                'UPDATE users SET password = ? WHERE id = ?',
                [newPassword, user.id]
            );
            return true;
        }
    }

    async insertTransaccion(monto, cuentaDestino, concepto, tipo = 'ingreso') {
        const fecha = new Date().toISOString();
        const montoFloat = parseFloat(monto);

        if (Platform.OS === 'web') {
            const transacciones = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
            const nuevaTransaccion = {
                id: Date.now(),
                tipo, monto: montoFloat, cuentaDestino, concepto: concepto || '', fecha
            };
            transacciones.unshift(nuevaTransaccion);
            localStorage.setItem(this.storageKey, JSON.stringify(transacciones));
            return nuevaTransaccion;
        } else {
            const result = await this.db.runAsync(
                'INSERT INTO transacciones (tipo, monto, cuentaDestino, concepto, fecha) VALUES (?, ?, ?, ?, ?)',
                [tipo, montoFloat, cuentaDestino, concepto || '', fecha]
            );
            return {
                id: result.lastInsertRowId, tipo, monto: montoFloat, concepto: concepto || '', cuentaDestino, fecha
            };
        }
    }

    async getAll() {
        if (Platform.OS === 'web') {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } else {
            return await this.db.getAllAsync('SELECT * FROM transacciones ORDER BY fecha DESC');
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
                SELECT SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE -monto END) as balance FROM transacciones
            `);
            return result?.balance || 0;
        }
    }
}

const databaseService = new Database();
export const initDatabase = () => databaseService.initialize();
export const insertTransaccion = (m, c, con, t) => databaseService.insertTransaccion(m, c, con, t);
export const getAllTransacciones = () => databaseService.getAll();
export const getBalance = () => databaseService.getBalance();
export const registerUser = (email, pass, preg, resp) => databaseService.registerUser(email, pass, preg, resp);
export const loginUser = (email, pass) => databaseService.loginUser(email, pass);
export const getSecurityQuestion = (email) => databaseService.getSecurityQuestion(email);
export const resetPassword = (email, resp, newPass) => databaseService.resetPassword(email, resp, newPass);
export default databaseService;