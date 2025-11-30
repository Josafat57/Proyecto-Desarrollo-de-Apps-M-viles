import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getBalance } from './database/Database'; 

export default function PaginaInicioScreen({ navigation, route }) {
  const [saldo, setSaldo] = useState(0);
  
  const isFocused = useIsFocused();

  const userEmail = route.params?.userEmail || 'Usuario';
  const nombreMostrar = userEmail.includes('@') ? userEmail.split('@')[0] : userEmail;

  const cargarSaldo = async () => {
    try {
      const total = await getBalance();
      setSaldo(total);
    } catch (error) {
      console.error("Error al cargar saldo:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      cargarSaldo();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.App}>
        <Text style={styles.AppTexto}>App+</Text>
      </View>

      <View style={styles.contenido}>
        <View style={styles.recuadro}>
          <Text style={styles.titulo}>¡Hola, {nombreMostrar}! </Text>
          <Text style={styles.subtitulo}>
            Gracias por elegir nuestra aplicación, es hora de administrar tu dinero
          </Text>

          <Text style={styles.SaldoTexto}>Saldo actual:</Text>
          <Text style={styles.saldo}>${saldo.toFixed(2)}</Text>
        </View>

        <View style={styles.recuadro}>
          <Text style={styles.pregunta}>¿Qué acción quieres hacer hoy?</Text>

          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('Ingresar')}
          >
            <Text style={styles.textoBoton}>INGRESAR DINERO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('Retirar')}
          >
            <Text style={styles.textoBoton}>RETIRAR DINERO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('Historial')}
          >
            <Text style={styles.textoBoton}>HISTORIAL DE TRANSACCIONES</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  App: {
    paddingTop: 45,
    paddingBottom: 15,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  contenido: {
    padding: 15,
  },
  recuadro: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    marginBottom: 20,
  },
  AppTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  subtitulo: {
    color: '#555',
    marginBottom: 15,
  },
  SaldoTexto: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  saldo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 2,
  },
  pregunta: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#000',
  },
  boton: {
    backgroundColor: 'green',
    padding: 14,
    borderRadius: 22,
    marginBottom: 10,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});