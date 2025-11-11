import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';

const logo = require('./assets/logo.png');

export default function OlvidarContrasena() {
    const [email, setEmail] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}/>
                    <Text style={styles.title}>App+</Text>
                    <Text style={styles.subtitle}>FINANZAS PERSONALES</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.header}>¿Olvidaste tu contraseña?</Text>
                    <Text style={styles.instructions}>Introduce tu correo por dónde te enviaremos los pasos a seguir para cambiar tu contraseña</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="email@dominio.com"
                        placeholderTextColor="#8E8E93"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TouchableOpacity 
                        style={styles.buttonPrimary} 
                        onPress={() => {}}
                    >
                    <Text style={styles.buttonPrimaryText}>Da clic aquí para que se le envíe un correo</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
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
    formContainer: {
        width: '100%',
        marginBottom: 20,
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
});