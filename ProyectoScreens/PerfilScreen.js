import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { getAllTransacciones, getPresupuestos, updatePresupuesto, deletePresupuesto } from './database/Database';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function PerfilScreen({ navigation }) {
  const [gastos, setGastos] = useState({});
  const [mesActual, setMesActual] = useState("");
  const [listaPresupuestos, setListaPresupuestos] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [presupuestoEditando, setPresupuestoEditando] = useState(null);
  const [nuevoMonto, setNuevoMonto] = useState("");

  useFocusEffect(
    useCallback(() => {
      cargarDatosCompletos();
    }, [])
  );

  const cargarDatosCompletos = async () => {
    try {
      const budgetsDB = await getPresupuestos();
      setListaPresupuestos(budgetsDB);

      const transacciones = await getAllTransacciones();
      const hoy = new Date();
      const nombreMes = hoy.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
      setMesActual(nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1));

      const conteoGastos = {};

      transacciones
        .filter(t => t.tipo === 'gasto')
        .filter(t => {
          const fechaT = new Date(t.fecha);
          return fechaT.getMonth() === hoy.getMonth() &&
            fechaT.getFullYear() === hoy.getFullYear();
        })
        .forEach(t => {
          const texto = (t.cuentaDestino + " " + t.concepto).toLowerCase();

          budgetsDB.forEach(budget => {
            if (texto.includes(budget.categoria.toLowerCase())) {
              if (!conteoGastos[budget.categoria]) conteoGastos[budget.categoria] = 0;
              conteoGastos[budget.categoria] += t.monto;
            }
          });
        });

      setGastos(conteoGastos);

      let alerta = "";
      budgetsDB.forEach(b => {
        const gastado = conteoGastos[b.categoria] || 0;
        if (gastado > b.montoLimite) {
          alerta += `- ${b.categoria.toUpperCase()}\n`;
        }
      });

      if (alerta !== "") {
        setTimeout(() => {
          Alert.alert("⚠️ Presupuesto Excedido", "Has superado el límite en:\n" + alerta);
        }, 500);
      }

    } catch (error) {
      console.error('Error cargando perfil:', error);
    }
  };

  const handleEditar = (item) => {
    setPresupuestoEditando(item);
    setNuevoMonto(item.montoLimite.toString());
    setModalVisible(true);
  };

  const guardarEdicion = async () => {
    if (!nuevoMonto) return;
    await updatePresupuesto(presupuestoEditando.id, nuevoMonto);
    setModalVisible(false);
    cargarDatosCompletos();
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar Presupuesto",
      "¿Seguro que quieres borrar este presupuesto? Dejarás de recibir alertas para esta categoría.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await deletePresupuesto(id);
            cargarDatosCompletos();
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión", "¿Salir?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salir", style: "destructive",
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Auth' }] })
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>Mi Perfil</Text>
        <View style={styles.profileWrapper}>
          <Image
            source={{ uri: 'https://i.postimg.cc/YqjVYCJ9/logo.jpg' }}
            style={styles.profileCircle}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Presupuesto Mensual</Text>
      <Text style={styles.dateLabel}>Periodo: {mesActual}</Text>

      <View style={styles.budgetBox}>
        {listaPresupuestos.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#888' }}>No hay presupuestos definidos.</Text>
        ) : (
          listaPresupuestos.map((item) => {
            const gastado = gastos[item.categoria] || 0;
            const max = item.montoLimite;
            const porcentaje = Math.min((gastado / max) * 100, 100);
            const excedido = gastado > max;

            return (
              <View key={item.id} style={styles.budgetItem}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.budgetLabel}>
                    {item.categoria.charAt(0).toUpperCase() + item.categoria.slice(1)}
                  </Text>

                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity onPress={() => handleEditar(item)}>
                      <Ionicons name="pencil" size={18} color="#007AFF" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleEliminar(item.id)}>
                      <Ionicons name="trash" size={18} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={[styles.budgetAmount, excedido && { color: 'red', fontWeight: 'bold' }]}>
                  ${gastado.toFixed(2)} / ${max}
                </Text>

                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${porcentaje}%`,
                        backgroundColor: excedido ? '#FF3B30' : '#4CD964'
                      }
                    ]}
                  />
                </View>
              </View>
            );
          })
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>App+ FINANZAS PERSONALES</Text>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Límite</Text>
            <Text style={styles.modalSubtitle}>{presupuestoEditando?.categoria.toUpperCase()}</Text>

            <TextInput
              style={styles.input}
              value={nuevoMonto}
              onChangeText={setNuevoMonto}
              keyboardType="numeric"
              placeholder="Nuevo monto límite"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.btnCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSave} onPress={guardarEdicion}>
                <Text style={[styles.btnText, { color: 'white' }]}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    paddingTop: 40
  },
  budgetBox: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
    fontSize: 24,
    fontWeight: 'bold'
  },
  profileWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    borderWidth: 2,
    borderColor: '#4CD964'
  },
  profileCircle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  sectionTitle: {
    color: '#4CD964',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  dateLabel: {
    color: '#888',
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 15,
    fontStyle: 'italic'
  },
  budgetItem: {
    marginBottom: 20
  },
  budgetLabel: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  budgetAmount: {
    color: '#555',
    fontSize: 12,
    marginBottom: 6,
    marginTop: 2
  },
  progressBar: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%'
  },
  logoutButton: {
    backgroundColor: '#333',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF3B30'
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold'
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  btnCancel: {
    flex: 1,
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center'
  },
  btnSave: {
    flex: 1,
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center'
  },
  btnText: {
    fontWeight: 'bold'
  }
});