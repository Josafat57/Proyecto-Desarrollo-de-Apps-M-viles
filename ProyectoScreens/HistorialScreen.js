import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function HistorialScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Historial de transacciones</Text>
      <ScrollView style={styles.lista}>
        <Text style={styles.item}>+ $200 en tiendas Oxxo — 25/09 a las 09:53 hrs</Text>
        <Text style={styles.item}>+ $1,000 en tiendas Asturiano — 20/09 a las 19:38 hrs</Text>
        <Text style={styles.item}>- $58.35 en Oxxo UPQ — Categoría: Supermercado</Text>
        <Text style={styles.item}>- $91.00 en La Mattina 2 — Categoría: Restaurante y bar</Text>
        <Text style={styles.item}>- $54.00 en FarmaPronto — Categoría: Salud y deporte</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 50,
  },
  volver: {
    color: '#4caf50',
    marginBottom: 10,
    fontSize: 16,
  },
  titulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lista: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 15,
  },
  item: {
    color: '#fff',
    marginBottom: 10,
  },
});