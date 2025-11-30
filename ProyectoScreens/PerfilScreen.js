import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function PerfilScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>Mario Castañeda</Text>
        <View style={styles.profileWrapper}>
          <Image
            source={{ uri: 'https://i.postimg.cc/YqjVYCJ9/logo.jpg' }}
            style={styles.profileCircle}
          />
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

      <Text style={styles.footerText}>App+ FINANZAS PERSONALES</Text>
    </ScrollView>
  );
}

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
  footerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});