import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'

const GraficaScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://i.postimg.cc/YqjVYCJ9/logo.jpg' }} style={styles.perfil} />
        <View style={styles.profileCircle} />
      </View>

      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButtonActive}>
          <Text style={styles.filterTextActive}>Mes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Semana</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Año</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.graphBox}>
        <View style={styles.pieChartContainer}>
          <Image
            source={{
              uri: 'https://i.postimg.cc/3Rdp9z7X/Captura-de-pantalla-2025-11-04-014604.png',
            }}
            style={styles.pieChartImage}
          />
        </View>

        <Text style={styles.chartTitle}>Ingresos vs Gastos</Text>

        <View style={styles.barChart}>
          <View style={styles.barContainer}>
            <View style={styles.barIngresos} />
            <Text style={styles.barLabel}>1260</Text>
            <Text style={styles.barText}>Ingresos</Text>
          </View>
          <View style={styles.barContainer}>
            <View style={styles.barGastos} />
            <Text style={styles.barLabel}>203.15</Text>
            <Text style={styles.barText}>Gastos</Text>
          </View>
        </View>
      </View>

      <View style={styles.navBar}>
        <View style={styles.navIcon}> <Image source={{ uri: 'https://i.postimg.cc/wT7wGbqr/minimal-house-icon-website-symbol-site-sign-ui-home-icon-home-creative-icon-minimalist-vector.jpg' }} style={styles.navLogo} /></View>
        <View style={styles.navIcon}> <Image source={{ uri: 'https://i.postimg.cc/L5H8s1XP/images.jpg' }} style={styles.navLogo} /></View>
        <View style={styles.navIcon}> <Image source={{ uri: 'https://i.postimg.cc/8cnT4np5/logo.png' }} style={styles.navLogo1} /></View>
        <View style={styles.navIcon}> <Image source={{ uri: 'https://i.postimg.cc/7h6rcMb8/descarga.png' }} style={styles.navLogo} /></View>
        <View style={styles.navIcon}> <Image source={{ uri: 'https://i.postimg.cc/N0YVS7P0/descarga-1.png' }} style={styles.navLogo} /></View>
      </View>

      <Text style={styles.footerText}>App+ FINANZAS PERSONALES</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  perfil: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 280,
  },
  profileCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ccc',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
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
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterText: {
    color: '#333',
    fontWeight: 'bold',
  },
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
  pieChartImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  chartTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  barContainer: {
    alignItems: 'center',
  },
  barIngresos: {
    width: 60,
    height: 180,
    backgroundColor: '#3498db',
    borderRadius: 8,
  },
  barGastos: {
    width: 60,
    height: 60,
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    marginTop: 120,
  },
  barLabel: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
  },
  barText: {
    color: '#000',
    fontSize: 12,
    marginTop: 2,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  navIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#ccc',
    borderRadius: 12,
  },
  navLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  navLogo1: {
    width: 80,
    height: 90,
    marginTop: -50,
    marginLeft: -30,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default GraficaScreen;