import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PaginaInicioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¡Bienvenido!</Text>
    
      <Text style={styles.saldo}>Saldo actual: $2,000</Text>

      <Text style={styles.pregunta}>¿Qué acción quieres hacer hoy?</Text>

      <TouchableOpacity style={styles.boton}>
        <Text style={styles.textoBoton}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boton}>
        <Text style={styles.textoBoton}>Retirar</Text>
      </TouchableOpacity>
       
      <TouchableOpacity style={styles.boton}>
        <Text style={styles.textoBoton}>Historial de transacciones</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  saldo: {
    color: '#4caf50',
    fontSize: 20,
    marginBottom: 30,
  },
  pregunta: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});