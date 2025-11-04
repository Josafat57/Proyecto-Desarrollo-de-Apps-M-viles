import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const GraficaScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>Mario Castañeda</Text>
        <View style={styles.profileWrapper}>
          <Image source={{ uri: 'https://i.postimg.cc/YqjVYCJ9/logo.jpg' }} style={styles.profileCircle} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Mi presupuesto mensual</Text>

      <View style={styles.budgetBox}>
        <View style={styles.budgetItem}>
          <Text style={styles.budgetLabel}>Restaurantes y bares</Text>
          <Text style={styles.budgetAmount}>$91.00 / $2,000</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '4.5%' }]} />
          </View>
        </View>

        <View style={styles.budgetItem}>
          <Text style={styles.budgetLabel}>Supermercado</Text>
          <Text style={styles.budgetAmount}>$58.35 / $3,000</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '1.9%' }]} />
          </View>
        </View>

        <View style={styles.budgetItem}>
          <Text style={styles.budgetLabel}>Salud y deporte</Text>
          <Text style={styles.budgetAmount}>$54.00 / $1,500</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '3.6%' }]} />
          </View>
        </View>

        <View style={styles.budgetItem}>
          <Text style={styles.budgetLabel}>Servicios</Text>
          <Text style={styles.budgetAmount}>$50.00 / $1,000</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '5%' }]} />
          </View>
        </View>
      </View>

      <View style={styles.navBar}>
        <View style={styles.navIcon}>
          <Image source={{ uri: 'https://i.postimg.cc/wT7wGbqr/minimal-house-icon-website-symbol-site-sign-ui-home-icon-home-creative-icon-minimalist-vector.jpg' }} style={styles.navLogo} />
        </View>
        <View style={styles.navIcon}>
          <Image source={{ uri: 'https://i.postimg.cc/L5H8s1XP/images.jpg' }} style={styles.navLogo} />
        </View>
        <View style={styles.navIcon}>
          <Image source={{ uri: 'https://i.postimg.cc/8cnT4np5/logo.png' }} style={styles.navLogo1} />
        </View>
        <View style={styles.navIcon}>
          <Image source={{ uri: 'https://i.postimg.cc/7h6rcMb8/descarga.png' }} style={styles.navLogo} />
        </View>
        <View style={styles.navIcon}>
          <Image source={{ uri: 'https://i.postimg.cc/N0YVS7P0/descarga-1.png' }} style={styles.navLogo} />
        </View>
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
  userName: {
    marginTop: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  profileCircle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  budgetBox: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  budgetItem: {
    marginBottom: 20,
  },
  budgetLabel: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  budgetAmount: {
    color: '#555',
    fontSize: 12,
    marginBottom: 6,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6F61',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginTop: 250,
  },
  navIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginLeft: -10,
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