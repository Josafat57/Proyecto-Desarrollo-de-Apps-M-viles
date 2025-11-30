import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PaginaInicioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.App}>
        <Text style={styles.AppTexto}>App+</Text>
      </View>

      <View style={styles.contenido}>
        <View style={styles.recuadro}>
          <Text style={styles.titulo}>¡Hola, Mario! </Text>
          <Text style={styles.subtitulo}>
            Gracias por elegir nuestra aplicación, es hora de administrar tu dinero
          </Text>

          <Text style={styles.SaldoTexto}>Saldo actual:</Text>
          <Text style={styles.saldo}>$2,000</Text>
        </View>

        <View style={styles.recuadro}>
          <Text style={styles.pregunta}>¿Qué acción quieres hacer hoy?</Text>

          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('Ingresar')}
          >
            <Text style={styles.textoBoton}>INGRESAR DINERO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('Retirar')}
          >
            <Text style={styles.textoBoton}>RETIRAR DINERO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('Historial')}
          >
            <Text style={styles.textoBoton}>HISTORIAL DE TRANSACCIONES</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  App: { paddingTop: 45, paddingBottom: 15, backgroundColor: '#000', alignItems: 'center' },
  AppTexto: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  contenido: { padding: 15 },
  recuadro: { backgroundColor: '#fff', padding: 30, borderRadius: 12, marginBottom: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  subtitulo: { color: '#555', marginBottom: 15 },
  SaldoTexto: { fontSize: 14, color: '#000', fontWeight: '600' },
  saldo: { fontSize: 26, fontWeight: 'bold', color: '#000', marginTop: 2 },
  pregunta: { fontSize: 16, fontWeight: '600', marginBottom: 15, color: '#000' },
  boton: { backgroundColor: 'green', padding: 14, borderRadius: 22, marginBottom: 10 },
  textoBoton: { color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
});