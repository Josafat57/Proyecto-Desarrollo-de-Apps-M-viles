import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { insertTransaccion, getBalance } from './database/Database';
import { useFocusEffect } from '@react-navigation/native';

const IngresarDineroScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [saldoActual, setSaldoActual] = useState(0);
  const [monto, setMonto] = useState('');
  const [concepto, setConcepto] = useState('');
  const [metodoPago, setMetodoPago] = useState('transferencia');

  useFocusEffect(
    useCallback(() => {
      const fetchSaldo = async () => {
        const total = await getBalance();
        setSaldoActual(total);
      };
      fetchSaldo();
    }, [])
  );

  const handleIngresarDinero = async () => {
    if (!monto || parseFloat(monto) <= 0) {
      Alert.alert('Error', 'Por favor ingresa un monto válido');
      return;
    }
    try {
      await insertTransaccion(monto, metodoPago, concepto, 'ingreso');
      
      setSaldoActual(prev => prev + parseFloat(monto));

      Alert.alert('Éxito', `Se ha ingresado $${monto} a tu cuenta`, [
        {
          text: 'OK',
          onPress: () => {
            setModalVisible(false);
            setMonto('');
            setConcepto('');
            setMetodoPago('transferencia');
            navigation.goBack(); 
          }
        }
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la transacción');
    }
  };

  const formatMonto = (text) => {
    const cleaned = text.replace(/[^\d.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      setMonto(parts[0] + '.' + parts.slice(1).join(''));
    } else {
      setMonto(cleaned);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{`<`}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ingresar Dinero</Text>
        <View style={{width: 24}} /> 
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Saldo Disponible</Text>
        <Text style={styles.cardSubtitle}>Tu dinero actual en cuenta</Text>
        <Text style={styles.amount}>$ {saldoActual.toFixed(2)}</Text>
        
        <TouchableOpacity 
          style={styles.ingresarButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.ingresarButtonText}>+ Nuevo Ingreso</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalles del Ingreso</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Monto</Text>
                <View style={styles.amountInputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.amountInput}
                    placeholder="0.00"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                    value={monto}
                    onChangeText={formatMonto}
                    autoFocus={true}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Concepto</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ej: Nómina, Venta, Regalo..."
                  placeholderTextColor="#999"
                  value={concepto}
                  onChangeText={setConcepto}
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.confirmButton, !monto && styles.confirmButtonDisabled]}
                  onPress={handleIngresarDinero}
                  disabled={!monto}
                >
                  <Text style={styles.confirmButtonText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
  cardSubtitle: { 
    fontSize: 13, 
    color: '#444', 
    marginBottom: 20 
  },
  amount: { 
    fontSize: 36, 
    fontWeight: '700', 
    marginBottom: 20, 
    color: '#000' 
  },
  ingresarButton: { 
    backgroundColor: '#007AFF', 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  ingresarButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  modalOverlay: { 
    flex: 1, 
    justifyContent: 'flex-end', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)' 
  },
  modalContent: { 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    paddingBottom: 30 
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 20, 
    borderBottomWidth: 1, 
    borderColor: '#eee' 
  },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  closeButtonText: { 
    fontSize: 24, 
    color: '#666' 
  },
  formContainer: { 
    padding: 20 
  },
  inputGroup: { 
    marginBottom: 20 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 8, 
    color: '#333' 
  },
  amountInputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    paddingHorizontal: 12 
  },
  currencySymbol: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginRight: 8 
  },
  amountInput: { 
    flex: 1, 
    fontSize: 18, 
    paddingVertical: 12, 
    color: '#000' 
  },
  textInput: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    padding: 12, 
    fontSize: 16, 
    color: '#000' 
  },
  modalButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 10 
  },
  cancelButton: { 
    flex: 1, 
    padding: 15, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    alignItems: 'center', 
    marginRight: 10 
  },
  cancelButtonText: { 
    color: '#666', 
    fontWeight: '600' 
  },
  confirmButton: { 
    flex: 2, 
    padding: 15, 
    backgroundColor: '#000', 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  confirmButtonDisabled: { 
    backgroundColor: '#ccc' 
  },
  confirmButtonText: { 
    color: '#fff', 
    fontWeight: '600' 
  },
});

export default IngresarDineroScreen;