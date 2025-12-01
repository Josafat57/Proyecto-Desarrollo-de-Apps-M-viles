import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { insertTransaccion, getBalance } from './database/Database';
import { useFocusEffect } from '@react-navigation/native';

export default function RetirarDineroScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [saldoActual, setSaldoActual] = useState(0);
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [conceptoExtra, setConceptoExtra] = useState('');

  useFocusEffect(
    useCallback(() => {
      const fetchSaldo = async () => {
        const total = await getBalance();
        setSaldoActual(total);
      };
      fetchSaldo();
    }, [])
  );

  const handleRetirar = async () => {
    if (!monto || !categoria) {
      Alert.alert("Faltan datos", "Debes ingresar monto y seleccionar una categoría.");
      return;
    }

    if (parseFloat(monto) > saldoActual) {
      Alert.alert("Saldo insuficiente", "No tienes suficiente dinero.");
      return;
    }

    try {
      const conceptoFinal = conceptoExtra ? `${categoria} - ${conceptoExtra}` : categoria;
      await insertTransaccion(monto, categoria, conceptoFinal, 'gasto');

      setSaldoActual(prev => prev - parseFloat(monto));

      setModalVisible(false);
      setMonto('');
      setCategoria('');
      setConceptoExtra('');
      Alert.alert("Retiro Exitoso");

    } catch (error) {
      console.error('Error al registrar retiro:', error);
    }
  };

  const CategoryBtn = ({ title, value }) => (
    <TouchableOpacity
      style={[styles.catBtn, categoria === value && styles.catBtnActive]}
      onPress={() => setCategoria(value)}
    >
      <Text style={[styles.catText, categoria === value && styles.catTextActive]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{`<`}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Retirar Dinero</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Saldo Disponible</Text>
        <Text style={styles.amount}>$ {saldoActual.toFixed(2)}</Text>

        <TouchableOpacity
          style={styles.retirarButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.retirarButtonText}>- Registrar Gasto</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nuevo Gasto</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <Text style={styles.label}>Monto</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={monto}
                onChangeText={setMonto}
              />

              <Text style={styles.label}>Categoría (Obligatorio para Presupuesto)</Text>
              <View style={styles.categoriesContainer}>
                <CategoryBtn title="🍔 Restaurante" value="restaurantes" />
                <CategoryBtn title="🛒 Super" value="supermercado" />
                <CategoryBtn title="💊 Salud" value="salud" />
                <CategoryBtn title="💡 Servicios" value="servicios" />
                <CategoryBtn title="👀 Otros" value="otros" />
              </View>

              <Text style={styles.label}>Nota (Opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Detalle extra..."
                placeholderTextColor="#999"
                value={conceptoExtra}
                onChangeText={setConceptoExtra}
              />

              <TouchableOpacity
                style={[styles.confirmButton, (!monto || !categoria) && styles.confirmButtonDisabled]}
                onPress={handleRetirar}
                disabled={!monto || !categoria}
              >
                <Text style={styles.confirmButtonText}>Confirmar Retiro</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  backArrow: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4
  },
  amount: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 20
  },
  retirarButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  retirarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600'
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666'
  },
  formContainer: {
    padding: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9'
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  catBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 5
  },
  catBtnActive: {
    backgroundColor: '#007AFF'
  },
  catText: {
    color: '#333'
  },
  catTextActive: {
    color: '#fff',
    fontWeight: 'bold'
  },
  confirmButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc'
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
});