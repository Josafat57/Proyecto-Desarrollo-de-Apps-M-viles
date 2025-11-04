import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const logo = require('./assets/logo.png');

export default function RegistroScreen() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [password, setPassword] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.title}>App+</Text>
                    <Text style={styles.subtitle}>FINANZAS PERSONALES</Text>
                </View>

                
                <View style={styles.formContainer}>
                    <Text style={styles.header}>Rellena los siguientes campos</Text>
                    <Text style={styles.instructions}>Ingresa tus datos para comenzar</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre(s):"
                        placeholderTextColor="#8E8E93"
                        value={nombre}
                        onChangeText={setNombre}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Apellido(s):"
                        placeholderTextColor="#8E8E93"
                        value={apellido}
                        onChangeText={setApellido}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña:"
                        placeholderTextColor="#8E8E93"
                        value={password}
                        onChangeText={setPassword}
                        // Se quitó secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Edad:"
                        placeholderTextColor="#8E8E93"
                        value={edad}
                        onChangeText={setEdad}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Teléfono:"
                        placeholderTextColor="#8E8E93"
                        value={telefono}
                        onChangeText={setTelefono}
                        keyboardType="phone-pad"
                    />

                    <TouchableOpacity 
                        style={styles.buttonPrimary}
                        onPress={() => {}}
                    >
                        <Text style={styles.buttonPrimaryText}>Continuar</Text>
                    </TouchableOpacity>
                </View>

                
                <Text style={styles.termsText}>
                    Al dar click en continuar, aceptas nuestros 
                    <Text style={styles.termsLink}> Términos de Servicio</Text> y nuestra 
                    <Text style={styles.termsLink}> Política de Privacidad</Text>
                </Text>

            </ScrollView>
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
        marginBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    title: {
        color: '#4CD964',
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#4CD964',
        fontSize: 12,
        fontWeight: '300',
        letterSpacing: 1,
    },
    formContainer: {
        width: '100%',
        marginBottom: 20,
    },
    header: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    instructions: {
        color: '#BDBDBD',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFF',
        color: '#000',
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 12,
    },
    buttonPrimary: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonPrimaryText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    termsText: {
        color: '#8E8E93',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 15,
    },
    termsLink: {
        color: '#007AFF',
    },
});