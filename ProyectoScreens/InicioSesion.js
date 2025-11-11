import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const logo = require('./assets/logo.png');
const googleLogo = require('./assets/google.png');
const appleLogo = require('./assets/apple2.png');

export default function InicioSesion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.title}>App+</Text>
                    <Text style={styles.subtitle}>FINANZAS PERSONALES</Text>
                </View>

                
                <View style={styles.formContainer}>
                    <Text style={styles.header}>Crea una cuenta</Text>
                    <Text style={styles.instructions}>Introduce tu correo para ingresar a la app</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="email@dominio.com"
                        placeholderTextColor="#8E8E93"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input2}
                        placeholder="Contraseña:"
                        placeholderTextColor="#8E8E93"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity
                        style={styles.forgotPasswordButton}
                    >
                        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.buttonPrimary} 
                        onPress={() => {}}
                    >
                        <Text style={styles.buttonPrimaryText}>Continuar</Text>
                    </TouchableOpacity>
                </View>

                
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>o</Text>
                    <View style={styles.separatorLine} />
                </View>

                
                <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.buttonSecondary}>
                        <Image source={googleLogo} style={styles.socialLogo} />
                        <Text style={styles.buttonSecondaryText}>Continúa con Google</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.buttonSecondary}>
                        <Image source={appleLogo} style={styles.socialLogo} />
                        <Text style={styles.buttonSecondaryText}>Continúa con Apple</Text>
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
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#333',
    },
    separatorText: {
        color: '#AAA',
        marginHorizontal: 10,
    },
    socialContainer: {
        width: '100%',
    },
    buttonSecondary: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialLogo: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        position: 'absolute',
        left: 20,
    },
    buttonSecondaryText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    termsText: {
        color: '#8E8E93',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 20,
    },
    termsLink: {
        color: '#007AFF',
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
        alignItems: 'center', 
        marginBottom: 20, 
    },
    forgotPasswordText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
});