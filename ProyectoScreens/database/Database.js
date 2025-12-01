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

      const newUser = { id: Date.now(), email, password, preguntaSeguridad: pregunta, respuestaSeguridad: respuesta };
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
        tipo,
        monto: montoFloat,
        cuentaDestino,
        concepto: concepto || '',
        fecha
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
        id: result.lastInsertRowId,
        tipo,
        monto: montoFloat,
        concepto: concepto || '',
        cuentaDestino,
        fecha
      };
    }
  }
      async updateTransaccion(id, monto, concepto) {
    if (Platform.OS === 'web') {
      let transacciones = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      const index = transacciones.findIndex(t => t.id === id);

      if (index !== -1) {
        transacciones[index].monto = parseFloat(monto);
        transacciones[index].concepto = concepto;
        localStorage.setItem(this.storageKey, JSON.stringify(transacciones));
      }
      return true;

    } else {
      await this.db.runAsync(
        `UPDATE transacciones 
         SET monto = ?, concepto = ?
         WHERE id = ?`,
        [parseFloat(monto), concepto, id]
      );
      return true;
    }
  }

async deleteTransaccion(id) {
  if (Platform.OS === 'web') {
    let transacciones = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    transacciones = transacciones.filter(t => t.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(transacciones));
    return true;

  } else {
    await this.db.runAsync(
      'DELETE FROM transacciones WHERE id = ?',
      [id]
    );
    return true;
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

  // Nuevo: ingresos y gastos por periodo (Mes, Semana, Año)
  async getStats(periodo = 'Mes') {
    if (Platform.OS === 'web') {
      const transacciones = await this.getAll();
      const ahora = new Date();

      let inicio;
      if (periodo === 'Mes') {
        inicio = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
      } else if (periodo === 'Semana') {
        const diaSemana = ahora.getDay(); // 0 domingo
        inicio = new Date(ahora);
        inicio.setDate(ahora.getDate() - diaSemana);
      } else if (periodo === 'Año') {
        inicio = new Date(ahora.getFullYear(), 0, 1);
      }

      const filtradas = transacciones.filter(t => new Date(t.fecha) >= inicio);

      const ingresos = filtradas
        .filter(t => t.tipo === 'ingreso')
        .reduce((sum, t) => sum + t.monto, 0);

      const gastos = filtradas
        .filter(t => t.tipo === 'gasto')
        .reduce((sum, t) => sum + t.monto, 0);

      return { ingresos, gastos };
    } else {
      let query = '';
      if (periodo === 'Mes') {
        query = `
          SELECT 
            SUM(CASE WHEN tipo='ingreso' THEN monto ELSE 0 END) as ingresos,
            SUM(CASE WHEN tipo='gasto' THEN monto ELSE 0 END) as gastos
          FROM transacciones
          WHERE strftime('%Y-%m', fecha) = strftime('%Y-%m', 'now')
        `;
      } else if (periodo === 'Semana') {
        query = `
          SELECT 
            SUM(CASE WHEN tipo='ingreso' THEN monto ELSE 0 END) as ingresos,
            SUM(CASE WHEN tipo='gasto' THEN monto ELSE 0 END) as gastos
          FROM transacciones
          WHERE strftime('%W', fecha) = strftime('%W', 'now')
          AND strftime('%Y', fecha) = strftime('%Y', 'now')
        `;
      } else if (periodo === 'Año') {
        query = `
          SELECT 
            SUM(CASE WHEN tipo='ingreso' THEN monto ELSE 0 END) as ingresos,
            SUM(CASE WHEN tipo='gasto' THEN monto ELSE 0 END) as gastos
          FROM transacciones
          WHERE strftime('%Y', fecha) = strftime('%Y', 'now')
        `;
      }

    const result = await this.db.getFirstAsync(query);
    return { ingresos: result?.ingresos || 0, gastos: result?.gastos || 0 };
    }
  }
}

const databaseService = new Database();

// Exportaciones
export const initDatabase = () => databaseService.initialize();
export const insertTransaccion = (m, c, con, t) => databaseService.insertTransaccion(m, c, con, t);
export const getAllTransacciones = () => databaseService.getAll();
export const actualizarTransaccion = (id, monto, concepto) => databaseService.updateTransaccion(id, monto, concepto);
export const deleteTransaccion = (id) => databaseService.deleteTransaccion(id);
export const getBalance = () => databaseService.getBalance();
export const registerUser = (email, pass, preg, resp) => databaseService.registerUser(email, pass, preg, resp);
export const loginUser = (email, pass) => databaseService.loginUser(email, pass);
export const getSecurityQuestion = (email) => databaseService.getSecurityQuestion(email);
export const resetPassword = (email, resp, newPass) => databaseService.resetPassword(email, resp, newPass);
export const getStats = (periodo) => databaseService.getStats(periodo);

export default databaseService;