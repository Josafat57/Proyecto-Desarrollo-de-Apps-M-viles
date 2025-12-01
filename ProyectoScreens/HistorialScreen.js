import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, TextInput } from 'react-native';
import { getAllTransacciones,insertTransaccion,actualizarTransaccion,deleteTransaccion} from './database/Database';

export default function HistorialScreen() {

  const [movimientos, setMovimientos] = useState([]);

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalActualizar, setModalActualizar] = useState(false);

  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");

  const [movSeleccionado, setMovSeleccionado] = useState(null);

  const cargarHistorial = async () => {
    const data = await getAllTransacciones();
    setMovimientos(data);
  };

  useEffect(() => {
    cargarHistorial();
  }, []);

  const agregar = async () => {
    await insertTransaccion(monto, "", concepto, "ingreso");
    setMonto("");
    setConcepto("");
    setModalAgregar(false);
    cargarHistorial();
  };

  const actualizar = async () => {
    await actualizarTransaccion(movSeleccionado.id, monto, concepto);
    setModalActualizar(false);
    setMovSeleccionado(null);
    setMonto("");
    setConcepto("");
    cargarHistorial();
  };

  const eliminar = async (id) => {
    await deleteTransaccion(id);
    cargarHistorial();
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>App+</Text>

 
      <View style={styles.botones}>
        <TouchableOpacity 
          style={styles.btn}
          onPress={() => setModalAgregar(true)}
        >
          <Text style={styles.btnText}>Agregar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btn}
          onPress={cargarHistorial}
        >
          <Text style={styles.btnText}>Actualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btn}
          onPress={() => alert("Selecciona un item para eliminar")}
        >
          <Text style={styles.btnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>

     
      <ScrollView style={styles.caja}>
        <Text style={styles.titulo}>Movimientos</Text>

        {movimientos.map((item) => (
          <View key={item.id} style={styles.itemBox}>

            <Text style={styles.item}>
              {item.tipo === "ingreso" ? "+" : "-"} ${item.monto}
              {"\n"}{item.concepto}
              {"\n"}{item.fecha}
            </Text>

            {/* BOTÓN EDITAR */}
            <TouchableOpacity
              style={styles.editarBtn}
              onPress={() => {
                setMovSeleccionado(item);
                setMonto(item.monto.toString());
                setConcepto(item.concepto);
                setModalActualizar(true);
              }}
            >
              <Text style={{ color: 'white' }}>Editar</Text>
            </TouchableOpacity>

            {/* BOTÓN ELIMINAR */}
            <TouchableOpacity
              style={styles.eliminarBtn}
              onPress={() => eliminar(item.id)}
            >
              <Text style={{ color: 'white' }}>Eliminar</Text>
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>

      {/* MODAL AGREGAR */}
      <Modal visible={modalAgregar} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>

            <Text style={styles.titulo}>Agregar Movimiento</Text>

            <TextInput 
              placeholder="Monto"
              style={styles.input}
              value={monto}
              onChangeText={setMonto}
              keyboardType="numeric"
            />

            <TextInput 
              placeholder="Concepto"
              style={styles.input}
              value={concepto}
              onChangeText={setConcepto}
            />

            <TouchableOpacity style={styles.guardarBtn} onPress={agregar}>
              <Text style={styles.btnModalText}>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelarBtn} 
              onPress={() => setModalAgregar(false)}
            >
              <Text style={styles.btnModalText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* MODAL ACTUALIZAR */}
      <Modal visible={modalActualizar} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>

            <Text style={styles.titulo}>Editar Movimiento</Text>

            <TextInput 
              placeholder="Monto"
              style={styles.input}
              value={monto}
              onChangeText={setMonto}
              keyboardType="numeric"
            />

            <TextInput 
              placeholder="Concepto"
              style={styles.input}
              value={concepto}
              onChangeText={setConcepto}
            />

            <TouchableOpacity style={styles.guardarBtn} onPress={actualizar}>
              <Text style={styles.btnModalText}>Actualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelarBtn} 
              onPress={() => setModalActualizar(false)}
            >
              <Text style={styles.btnModalText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#000', padding:20 },
  header: { color:'#fff', fontSize:24, textAlign:'center', marginBottom:20 },

  botones:{ flexDirection:'row', justifyContent:'space-around', marginBottom:15 },
  btn:{ backgroundColor:'#333', paddingVertical:8, paddingHorizontal:20, borderRadius:20 },
  btnText:{ color:'#fff' },

  caja:{ backgroundColor:'#fff', borderRadius:15, padding:15 },
  titulo:{ fontSize:18, fontWeight:'bold', marginBottom:10 },

  itemBox:{ marginBottom:12 },
  item:{ color:'#000', fontSize:14 },

  editarBtn:{
    backgroundColor:'#007AFF',
    padding:5,
    borderRadius:5,
    marginTop:5
  },

  eliminarBtn:{
    backgroundColor:'#FF3B30',
    padding:5,
    borderRadius:5,
    marginTop:5
  },

  modal:{ flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', padding:20 },
  modalContent:{ backgroundColor:'white', padding:20, borderRadius:10 },

  input:{ borderWidth:1, padding:10, borderRadius:8, marginTop:10 },

  guardarBtn:{ backgroundColor:'#28A745', padding:12, borderRadius:10, marginTop:15 },
  cancelarBtn:{ backgroundColor:'gray', padding:12, borderRadius:10, marginTop:10 },

  btnModalText:{ color:'white', textAlign:'center', fontSize:16 }
});
