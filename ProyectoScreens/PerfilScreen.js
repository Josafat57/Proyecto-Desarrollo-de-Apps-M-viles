import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { getAllTransacciones } from './database/Database';
import { useFocusEffect } from '@react-navigation/native';

export default function PerfilScreen() {
  const [gastos, setGastos] = useState({});
  
  const presupuestos = {
    restaurantes: 2000,
    supermercado: 3000,
    salud: 1500,
    servicios: 1000,
  };

  useFocusEffect(
    useCallback(() => {
      const cargarDatos = async () => {
        try {
          const transacciones = await getAllTransacciones();

          // Agrupamos dinámicamente por concepto
          const nuevosGastos = {};
          transacciones
            .filter(t => t.tipo === 'gasto')
            .forEach(t => {
              const concepto = t.concepto?.toLowerCase() || 'otros';
              if (!nuevosGastos[concepto]) nuevosGastos[concepto] = 0;
              nuevosGastos[concepto] += t.monto;
            });

          setGastos(nuevosGastos);
        } catch (error) {
          console.error('Error cargando gastos:', error);
        }
      };

      cargarDatos();
    }, [])
  );

  const renderBudgetItem = (label, gasto, max) => {
    const porcentaje = Math.min((gasto / max) * 100, 100);
    return (
      <View style={styles.budgetItem}>
        <Text style={styles.budgetLabel}>{label}</Text>
        <Text style={styles.budgetAmount}>${gasto.toFixed(2)} / ${max}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${porcentaje}%` }]} />
        </View>
      </View>
    );
  };

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
        {renderBudgetItem('Restaurantes y bares', gastos['restaurante'] || 0, presupuestos.restaurantes)}
        {renderBudgetItem('Supermercado', gastos['supermercado'] || 0, presupuestos.supermercado)}
        {renderBudgetItem('Salud y deporte', gastos['salud'] || 0, presupuestos.salud)}
        {renderBudgetItem('Servicios', gastos['servicio'] || 0, presupuestos.servicios)}
      </View>

      <Text style={styles.footerText}>App+ FINANZAS PERSONALES</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#000', flex: 1, paddingTop: 40 },
  budgetBox: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: { marginTop: 10, color: '#fff', fontSize: 18, fontWeight: 'bold' },
  profileWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  profileCircle: { width: '100%', height: '100%', resizeMode: 'cover' },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  budgetItem: { marginBottom: 20 },
  budgetLabel: { color: '#000', fontSize: 14, fontWeight: 'bold' },
  budgetAmount: { color: '#555', fontSize: 12, marginBottom: 6 },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#FF6F61' },
  footerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});