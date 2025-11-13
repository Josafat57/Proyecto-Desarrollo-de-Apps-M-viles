import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, ScrollView } from 'react-native';

const RetirarDineroScreen = ({ volver }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [monto, setMonto] = useState('');
  const [cuentaDestino, setCuentaDestino] = useState('');
  const [concepto, setConcepto] = useState('');

  const handleRetirar = () => {
    // Aquí iría la lógica para procesar el retiro
    console.log('Retirando:', { monto, cuentaDestino, concepto });
    // Cerrar modal después de procesar
    setModalVisible(false);
    // Limpiar formulario
    setMonto('');
    setCuentaDestino('');
    setConcepto('');
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
        <Text style={styles.cardTitle}>Retira tu dinero solo con efectivo en dónde sea</Text>
        <Text style={styles.cardSubtitle}>Puedes retirar hasta $5,000 en efectivo</Text>
        <Text style={styles.amount}>$ 0.00</Text>
        
        {/* Botón para abrir el modal */}
        <TouchableOpacity 
          style={styles.retirarButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.retirarButtonText}>Retirar Dinero</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para retirar dinero */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Retirar Dinero</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <Text style={styles.label}>Monto a retirar</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa el monto"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={monto}
                onChangeText={setMonto}
              />

              <Text style={styles.label}>Cuenta destino</Text>
              <TextInput
                style={styles.input}
                placeholder="Selecciona la cuenta destino"
                placeholderTextColor="#999"
                value={cuentaDestino}
                onChangeText={setCuentaDestino}
              />

              <Text style={styles.label}>Concepto (opcional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe el motivo del retiro"
                placeholderTextColor="#999"
                multiline={true}
                numberOfLines={3}
                value={concepto}
                onChangeText={setConcepto}
              />

              <TouchableOpacity 
                style={[
                  styles.confirmButton,
                  (!monto || !cuentaDestino) && styles.confirmButtonDisabled
                ]}
                onPress={handleRetirar}
                disabled={!monto || !cuentaDestino}
              >
                <Text style={styles.confirmButtonText}>Confirmar Retiro</Text>
              </TouchableOpacity>
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
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#000',
    paddingHorizontal:16,
    paddingTop:20
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:24
  },
  backArrow:{
    color:'#fff',
    fontSize:24,
    fontWeight:'600'
  },
  headerTitle:{
    color:'#fff',
    fontSize:18,
    fontWeight:'600'
  },
  avatar:{
    width:28,
    height:28,
    borderRadius:14,
    backgroundColor:'#666' 
  },
  card:{
    backgroundColor:'#fff',
    borderRadius:12,
    padding:20,
    marginBottom:16
  },
  cardTitle:{
    fontSize:18,
    fontWeight:'600',
    marginBottom:4
  },
  cardSubtitle:{
    fontSize:13,
    color:'#444',
    marginBottom:20
  },
  amount:{
    fontSize:36,
    fontWeight:'700',
    marginBottom:20
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
  // Estilos del modal
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600'
  },
  closeButton: {
    padding: 5
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666'
  },
  formContainer: {
    padding: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9'
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top'
  },
  confirmButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
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

export default RetirarDineroScreen;