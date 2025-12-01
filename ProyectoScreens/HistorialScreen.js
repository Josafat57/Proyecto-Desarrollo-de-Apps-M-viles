import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { getAllTransacciones, insertTransaccion, actualizarTransaccion, deleteTransaccion } from './database/Database';

export default function HistorialScreen() {

  const [movimientos, setMovimientos] = useState([]);
  const [movimientosFiltrados, setMovimientosFiltrados] = useState([]);

  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [filtroFecha, setFiltroFecha] = useState('Todos');

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalActualizar, setModalActualizar] = useState(false);
  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");
  const [movSeleccionado, setMovSeleccionado] = useState(null);

  const cargarHistorial = async () => {
    const data = await getAllTransacciones();
    setMovimientos(data);
    aplicarFiltros(data, filtroTipo, filtroFecha);
  };

  useEffect(() => {
    cargarHistorial();
  }, []);

  useEffect(() => {
    aplicarFiltros(movimientos, filtroTipo, filtroFecha);
  }, [filtroTipo, filtroFecha]);

  const aplicarFiltros = (data, tipo, fecha) => {
    let filtrados = data;

    if (tipo !== 'Todos') {
      filtrados = filtrados.filter(item => item.tipo.toLowerCase() === tipo.toLowerCase());
    }

    const hoy = new Date();
    if (fecha === 'Hoy') {
      filtrados = filtrados.filter(item => {
        const fechaItem = new Date(item.fecha);
        return fechaItem.getDate() === hoy.getDate() &&
          fechaItem.getMonth() === hoy.getMonth() &&
          fechaItem.getFullYear() === hoy.getFullYear();
      });
    } else if (fecha === 'Mes') {
      filtrados = filtrados.filter(item => {
        const fechaItem = new Date(item.fecha);
        return fechaItem.getMonth() === hoy.getMonth() &&
          fechaItem.getFullYear() === hoy.getFullYear();
      });
    }

    setMovimientosFiltrados(filtrados);
  };

  const agregar = async () => {
    if (!monto) return alert("Ingresa un monto");
    await insertTransaccion(monto, "Manual", concepto, "ingreso");
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

  const confirmarEliminar = (id) => {
    Alert.alert(
      "Eliminar Transacción",
      "¿Estás seguro de que quieres borrar este movimiento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await deleteTransaccion(id);
            cargarHistorial();
          }
        }
      ]
    );
  };

  const FilterBadge = ({ label, active, onPress }) => (
    <TouchableOpacity
      style={[styles.filterBadge, active && styles.filterBadgeActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Historial</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Tipo:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollFilters}>
          <FilterBadge label="Todos" active={filtroTipo === 'Todos'} onPress={() => setFiltroTipo('Todos')} />
          <FilterBadge label="Ingresos" active={filtroTipo === 'ingreso'} onPress={() => setFiltroTipo('ingreso')} />
          <FilterBadge label="Gastos" active={filtroTipo === 'gasto'} onPress={() => setFiltroTipo('gasto')} />
        </ScrollView>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Fecha:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollFilters}>
          <FilterBadge label="Todo" active={filtroFecha === 'Todos'} onPress={() => setFiltroFecha('Todos')} />
          <FilterBadge label="Este Mes" active={filtroFecha === 'Mes'} onPress={() => setFiltroFecha('Mes')} />
          <FilterBadge label="Hoy" active={filtroFecha === 'Hoy'} onPress={() => setFiltroFecha('Hoy')} />
        </ScrollView>
      </View>

      <View style={styles.separator} />

      <ScrollView style={styles.caja}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Text style={styles.titulo}>Movimientos</Text>
          <TouchableOpacity onPress={cargarHistorial}>
            <Text style={{ color: '#007AFF' }}>↻ Recargar</Text>
          </TouchableOpacity>
        </View>

        {movimientosFiltrados.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
            No hay movimientos con estos filtros.
          </Text>
        ) : (
          movimientosFiltrados.map((item) => (
            <View key={item.id} style={styles.itemBox}>
              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.conceptoText}>{item.concepto || "Sin concepto"}</Text>
                  <Text style={styles.fechaText}>
                    {new Date(item.fecha).toLocaleDateString()} - {item.cuentaDestino || 'General'}
                  </Text>
                </View>
                <Text style={[styles.montoText, { color: item.tipo === 'ingreso' ? 'green' : 'red' }]}>
                  {item.tipo === "ingreso" ? "+" : "-"} ${item.monto.toFixed(2)}
                </Text>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.editarBtn}
                  onPress={() => {
                    setMovSeleccionado(item);
                    setMonto(item.monto.toString());
                    setConcepto(item.concepto);
                    setModalActualizar(true);
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 12 }}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.eliminarBtn}
                  onPress={() => confirmarEliminar(item.id)}
                >
                  <Text style={{ color: 'white', fontSize: 12 }}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={() => setModalAgregar(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      <Modal visible={modalAgregar} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Agregar Manual</Text>

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

            <TouchableOpacity style={styles.cancelarBtn} onPress={() => setModalAgregar(false)}>
              <Text style={styles.btnModalText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalActualizar} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Editar</Text>

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

            <TouchableOpacity style={styles.cancelarBtn} onPress={() => setModalActualizar(false)}>
              <Text style={styles.btnModalText}>Cancelar</Text>
            </TouchableOpacity>
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
    padding: 20
  },
  header: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  filterLabel: {
    color: '#888',
    marginRight: 10,
    width: 50
  },
  scrollFilters: {
    flexGrow: 0
  },
  filterBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#333',
    marginRight: 8
  },
  filterBadgeActive: {
    backgroundColor: '#007AFF'
  },
  filterText: {
    color: '#ccc',
    fontSize: 12
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold'
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 10
  },
  caja: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    flex: 1
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000'
  },
  itemBox: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  conceptoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  fechaText: {
    fontSize: 12,
    color: '#888'
  },
  montoText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10
  },
  editarBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5
  },
  eliminarBtn: {
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CD964',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 32
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    fontSize: 16
  },
  guardarBtn: {
    backgroundColor: '#28A745',
    padding: 12,
    borderRadius: 10,
    marginTop: 15
  },
  cancelarBtn: {
    backgroundColor: 'gray',
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  },
  btnModalText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }
});