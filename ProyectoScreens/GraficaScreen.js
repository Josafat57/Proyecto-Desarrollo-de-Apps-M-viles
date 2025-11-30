import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const GraficaScreen = () => {
  const [filtroActivo, setFiltroActivo] = useState('Mes');
  const MAX_BAR_HEIGHT = 180;

  const datos = {
    Mes: { ingresos: 1260, gastos: 203.15 },
    Semana: { ingresos: 320, gastos: 85.50 },
    Año: { ingresos: 15200, gastos: 3400.75 },
  };

  const maxValor = Math.max(datos[filtroActivo].ingresos, datos[filtroActivo].gastos);
  const alturaIngresos = (datos[filtroActivo].ingresos / maxValor) * MAX_BAR_HEIGHT;
  const alturaGastos = (datos[filtroActivo].gastos / maxValor) * MAX_BAR_HEIGHT;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://i.postimg.cc/YqjVYCJ9/logo.jpg' }} style={styles.perfil} />
          <View style={styles.profileCircle} />
        </View>

        <View style={styles.filters}>
          {['Mes', 'Semana', 'Año'].map((filtro) => (
            <TouchableOpacity
              key={filtro}
              style={filtroActivo === filtro ? styles.filterButtonActive : styles.filterButton}
              onPress={() => setFiltroActivo(filtro)}
            >
              <Text style={filtroActivo === filtro ? styles.filterTextActive : styles.filterText}>
                {filtro}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.graphBox}>
          <View style={styles.pieChartContainer}>
            <Image
              source={{ uri: 'https://i.postimg.cc/3Rdp9z7X/Captura-de-pantalla-2025-11-04-014604.png' }}
              style={styles.pieChartImage}
            />
          </View>

          <Text style={styles.chartTitle}>Ingresos vs Gastos</Text>

          <View style={styles.barChart}>
            <View style={styles.barContainer}>
              <View style={[styles.barIngresos, { height: alturaIngresos }]} />
              <Text style={styles.barLabel}>{datos[filtroActivo].ingresos}</Text>
              <Text style={styles.barText}>Ingresos</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={[styles.barGastos, { height: alturaGastos }]} />
              <Text style={styles.barLabel}>{datos[filtroActivo].gastos}</Text>
              <Text style={styles.barText}>Gastos</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000' },
  scrollContent: { paddingTop: 40, paddingBottom: 100 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  perfil: { width: 100, height: 40, resizeMode: 'contain', marginLeft: 280 },
  profileCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#ccc' },
  filters: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  filterButtonActive: {
    backgroundColor: '#FF6F61',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  filterButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  filterTextActive: { color: '#fff', fontWeight: 'bold' },
  filterText: { color: '#333', fontWeight: 'bold' },
  graphBox: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  pieChartContainer: {
    height: 220,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieChartImage: { width: '90%', height: '90%', resizeMode: 'contain' },
  chartTitle: { color: '#000', fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 20 },
  barChart: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  barContainer: { alignItems: 'center' },
  barIngresos: { width: 60, backgroundColor: '#3498db', borderRadius: 8 },
  barGastos: { width: 60, backgroundColor: '#2ecc71', borderRadius: 8 },
  barLabel: { color: '#000', fontSize: 14, fontWeight: 'bold', marginTop: 6 },
  barText: { color: '#000', fontSize: 12, marginTop: 2 },
});

export default GraficaScreen;