import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';

import { loginUser } from './database/Database';

const logo = require('./assets/logo.png');

export default function InicioSesion({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert("Campos vacíos", "Por favor llena todos los campos.");
      return;
    }

    try {
      const user = await loginUser(email, password);
      console.log("Usuario detectado:", user);
      navigation.replace('PaginaInicioScreen', { userEmail: user.email });

    } catch (error) {
      Alert.alert("Error de acceso", "Correo o contraseña incorrectos.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>App+</Text>
            <Text style={styles.subtitle}>FINANZAS PERSONALES</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.header}>Iniciar Sesión</Text>
            <Text style={styles.instructions}>Introduce tus datos para ingresar</Text>

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
              style={styles.input2}
              placeholder="Contraseña"
              placeholderTextColor="#8E8E93"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => navigation.navigate('OlvidarContrasena')}
            >
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={handleLogin}
            >
              <Text style={styles.buttonPrimaryText}>Entrar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerContainer}>
            <Text style={styles.termsText}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegistroScreen')}>
              <Text style={{ ...styles.termsLink, fontSize: 16, fontWeight: 'bold' }}>Regístrate aquí</Text>
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
    backgroundColor: '#000',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    color: '#4CD964',
    fontSize: 34,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#4CD964',
    fontSize: 13,
    fontWeight: '300',
    letterSpacing: 1,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  header: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructions: {
    color: '#BDBDBD',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#FFF',
    color: '#000',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 15,
  },
  input2: {
    backgroundColor: '#FFF',
    color: '#000',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
  },
  forgotPasswordButton: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  termsText: {
    color: '#8E8E93',
    fontSize: 14,
  },
  termsLink: {
    color: '#4CD964',
  },
});