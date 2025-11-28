import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { initDatabase, insertTransaccion } from '../database/Database';

const IngresarDineroScreen = ({ volver }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [monto, setMonto] = useState('');
  const [concepto, setConcepto] = useState('');
  const [metodoPago, setMetodoPago] = useState('transferencia');

  
  useEffect(() => {
    const initializeDB = async () => {
      try {
        await initDatabase();
        console.log('Base de datos inicializada');
      } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        Alert.alert('Error', 'No se pudo inicializar la base de datos.');
      }
    };
    initializeDB();
  }, []);

  const handleIngresarDinero = async () => {
    if (!monto || parseFloat(monto) <= 0) {
      Alert.alert('Error', 'Por favor ingresa un monto valido');
      return;
    }
    try {
      await insertTransaccion(monto, concepto, metodoPago);
      Alert.alert('Exito', `se ha ingresado $${monto} a tu cuenta `,
        [
          {
            text: 'ok',
            onPress: () => {
              setModalVisible(false);
              setMonto('');
              setConcepto('');
              setMetodoPago('transferencia');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la transacción');
    }
  };

  const formatMonto = (text) => {
    const cleaned = text.replace(/[^\d.]/g, '');
    
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    
    setMonto(cleaned);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={volver}>
          <Text style={styles.backArrow}>{`<`}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App+</Text>
        <View style={styles.avatar}/>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ingresa dinero mediante transferencia</Text>
        <Text style={styles.cardSubtitle}>Transferencia bancaria hasta $50,000</Text>
        <Text style={styles.amount}>$ {monto || '0.00'}</Text>
        
        <TouchableOpacity 
          style={styles.ingresarButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.ingresarButtonText}>Ingresar Dinero</Text>
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
              <Text style={styles.modalTitle}>Ingresar Dinero</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}
            contentContainerStyle={styles.scrollcontent}
            showsVerticalScrollIndicator={false}>
             
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Monto a ingresar</Text>
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
                <Text style={styles.label}>Concepto (opcional)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ej: Pago de servicios, Transferencia, etc."
                  placeholderTextColor="#999"
                  value={concepto}
                  onChangeText={setConcepto}
                  multiline={true}
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Método de pago</Text>
                <View style={styles.paymentMethods}>
                  <TouchableOpacity 
                    style={[
                      styles.paymentMethod,
                      metodoPago === 'transferencia' && styles.paymentMethodSelected
                    ]}
                    onPress={() => setMetodoPago('transferencia')}
                  >
                    <Text style={[
                      styles.paymentMethodText,
                      metodoPago === 'transferencia' && styles.paymentMethodTextSelected
                    ]}>
                      Transferencia
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.paymentMethod,
                      metodoPago === 'tarjeta' && styles.paymentMethodSelected
                    ]}
                    onPress={() => setMetodoPago('tarjeta')}
                  >
                    <Text style={[
                      styles.paymentMethodText,
                      metodoPago === 'tarjeta' && styles.paymentMethodTextSelected
                    ]}>
                      Tarjeta
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.paymentMethod,
                      metodoPago === 'efectivo' && styles.paymentMethodSelected
                    ]}
                    onPress={() => setMetodoPago('efectivo')}
                  >
                    <Text style={[
                      styles.paymentMethodText,
                      metodoPago === 'efectivo' && styles.paymentMethodTextSelected
                    ]}>
                      Efectivo
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

             
              {metodoPago === 'transferencia' && (
                <View style={styles.infoBox}>
                  <Text style={styles.infoTitle}>Transferencia Bancaria</Text>
                  <Text style={styles.infoText}>
                    • Límite: $50,000 MXN{'\n'}
                    • Tiempo de procesamiento: 1-2 horas{'\n'}
                    • Sin comisiones
                  </Text>
                </View>
              )}

              {metodoPago === 'tarjeta' && (
                <View style={styles.infoBox}>
                  <Text style={styles.infoTitle}>Tarjeta de Crédito/Débito</Text>
                  <Text style={styles.infoText}>
                    • Comisión: 2.5%{'\n'}
                    • Límite: $20,000 MXN{'\n'}
                    • Procesamiento inmediato
                  </Text>
                </View>
              )}

              {metodoPago === 'efectivo' && (
                <View style={styles.infoBox}>
                  <Text style={styles.infoTitle}>Depósito en Efectivo</Text>
                  <Text style={styles.infoText}>
                    • Sin comisiones{'\n'}
                    • Límite: $15,000 MXN{'\n'}
                    • Disponible en tiendas asociadas
                  </Text>
                </View>
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.confirmButton,
                    !monto && styles.confirmButtonDisabled
                  ]}
                  onPress={handleIngresarDinero}
                  disabled={!monto}
                >
                  <Text style={styles.confirmButtonText}>
                    Confirmar Ingreso
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomBar}>
        <Image 
          source={{ uri: 'https://i.postimg.cc/8cnT4np5/logo.png' }} 
          style={styles.bottomImage}
          resizeMode="contain"
        />
        <Text style={styles.bottomText}>App+</Text>
      </View>
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
  backArrow: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#666' 
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
    marginBottom: 20
  },
  ingresarButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
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
  maxHeight: '90%',
  width: '100%', 
  marginHorizontal: 0,  
},

scrollContent: {
  padding: 20,
  paddingBottom: 30
},
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000'
  },
  closeButton: {
    padding: 5
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
    fontWeight: '300'
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
    color: '#333',
    marginBottom: 8
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
    color: '#333',
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
    color: '#000',
    textAlignVertical: 'top'
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  paymentMethod: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4
  },
  paymentMethodSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF10'
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#666'
  },
  paymentMethodTextSelected: {
    color: '#007AFF',
    fontWeight: '600'
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18
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
    fontSize: 16,
    fontWeight: '600'
  },
  confirmButton: {
    flex: 2,
    padding: 15,
    backgroundColor: '#000000ff',
    borderRadius: 8,
    alignItems: 'center'
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc'
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333'
  },
  bottomImage: {
    width: 40,
    height: 40,
    marginBottom: 5
  },
  bottomText: {
    color: 'green',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default IngresarDineroScreen;