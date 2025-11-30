import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';

import { registerUser } from './database/Database';

const logo = require('./assets/logo.png');

export default function RegistroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const handleRegister = async () => {
    if(!email || !password || !pregunta || !respuesta) {
        Alert.alert("Error", "Todos los campos son obligatorios");
        return;
    }

    try {
        await registerUser(email, password, pregunta, respuesta);
        Alert.alert("Éxito", "Usuario creado correctamente", [
            { text: "Iniciar Sesión", onPress: () => navigation.navigate('InicioSesion') }
        ]);
    } catch (error) {
        Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>App+</Text>
          <Text style={styles.subtitle}>CREAR CUENTA</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.header}>Registro de Usuario</Text>
          <Text style={styles.instructions}>Datos para iniciar sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            placeholderTextColor="#8E8E93"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#8E8E93"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Text style={styles.sectionHeader}>Seguridad (Para recuperar contraseña)</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Pregunta secreta (Ej. Nombre de mascota)"
            placeholderTextColor="#8E8E93"
            value={pregunta}
            onChangeText={setPregunta}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Respuesta secreta"
            placeholderTextColor="#8E8E93"
            value={respuesta}
            onChangeText={setRespuesta}
          />

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleRegister}>
            <Text style={styles.buttonPrimaryText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('InicioSesion')}
          >
            <Text style={styles.backButtonText}>Volver al inicio de sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  container: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    paddingHorizontal: 25, 
    paddingBottom: 20 
  },
  logoContainer: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  logo: { 
    width: 80, 
    height: 80, 
    resizeMode: 'contain', 
    marginBottom: 10 
  },
  title: { 
    color: '#4CD964', 
    fontSize: 30, 
    fontWeight: 'bold' 
  },
  subtitle: { 
    color: '#4CD964', 
    fontSize: 12, 
    fontWeight: '300', 
    letterSpacing: 1 
  },
  formContainer: { 
    width: '100%', 
    marginBottom: 20 
  },
  header: { 
    color: '#FFF', 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 8 
  },
  instructions: { 
    color: '#BDBDBD', 
    fontSize: 16, 
    textAlign: 'center', 
    marginBottom: 10 
  },
  sectionHeader: { 
    color: '#4CD964', 
    fontSize: 14, 
    marginBottom: 10, 
    marginTop: 10, 
    fontWeight: 'bold' 
  },
  input: {
    backgroundColor: '#FFF', 
    color: '#000', 
    borderRadius: 8,
    paddingVertical: 14, 
    paddingHorizontal: 16, 
    fontSize: 16, 
    marginBottom: 12
  },
  buttonPrimary: {
    backgroundColor: '#007AFF', 
    padding: 15, 
    borderRadius: 8,
    alignItems: 'center', 
    marginTop: 10
  },
  buttonPrimaryText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  backButton: {
    backgroundColor: '#333', 
    padding: 12, 
    borderRadius: 8,
    alignItems: 'center', 
    marginTop: 15
  },
  backButtonText: { 
    color: '#FFF', 
    fontSize: 14, 
    fontWeight: '600' 
  }
});