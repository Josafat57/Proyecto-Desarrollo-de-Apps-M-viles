import React, { useState, useCallback } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { getStats } from './database/Database';
import { useFocusEffect } from '@react-navigation/native'; 

const GraficaScreen = () => {
  const [filtroActivo, setFiltroActivo] = useState('Mes');
  const [datos, setDatos] = useState({ ingresos: 0, gastos: 0 });

  const screenWidth = Dimensions.get('window').width;

  useFocusEffect(
    useCallback(() => {
      const cargarDatos = async () => {
        const stats = await getStats(filtroActivo);
        setDatos(stats);
      };
      cargarDatos();
    }, [filtroActivo]) 
  );

  const dataBar = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [{ data: [datos.ingresos, datos.gastos] }],
  };

  const dataPie = [
    {
      name: 'Ingresos',
      population: datos.ingresos,
      color: '#3498db',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
    {
      name: 'Gastos',
      population: datos.gastos,
      color: '#2ecc71',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
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
        <Text style={styles.chartTitle}>Ingresos vs Gastos ({filtroActivo})</Text>

        <BarChart
          data={dataBar}
          width={screenWidth - 40}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{ marginVertical: 10, borderRadius: 12 }}
        />

        <PieChart
          data={dataPie}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 100,
  },
  graphBox: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  filterButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: '#FF6F61',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  filterText: {
    color: '#333',
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chartTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default GraficaScreen;