import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function HistorialScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.header}>App+</Text>

      <View style={styles.botones}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Actualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>

     
      <ScrollView style={styles.caja}>
        <Text style={styles.titulo}>Aquí está tu historial</Text>
        <Text style={styles.subtitulo}>Ingresos y gastos</Text>

        <Text style={styles.item}>+ $200 en tiendas Oxxo {"\n"}25/09 a las 09:53 hrs</Text>
        <Text style={styles.item}>+ $1,000 en tiendas Asturiano {"\n"}20/09 a las 19:38 hrs</Text>
        <Text style={styles.item}>- $58.35 en Oxxo UPQ {"\n"}Categoría: Supermercado {"\n"}22/09 a las 15:16 hrs</Text>
        <Text style={styles.item}>- $91.00 en La Mattina 2 {"\n"}Categoría: Restaurantes y bares {"\n"}25/09 a las 10:19 hrs</Text>
        <Text style={styles.item}>- $54.00 en FarmaPronto {"\n"}Categoría: Salud y deporte {"\n"}28/09 a las 17:58 hrs</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  btn: {
    backgroundColor: '#333',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
  },
  caja: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  item: {
    marginBottom: 12,
    fontSize: 14,
    color: '#000',
  },
});