import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, Alert, Platform, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { getSecurityQuestion, resetPassword } from './database/Database';

const logo = require('./assets/logo.png');

export default function OlvidarContrasena({ navigation }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleCheckEmail = async () => {
        try {
            const question = await getSecurityQuestion(email);
            setSecurityQuestion(question);
            setStep(2);
        } catch (error) {
            Alert.alert("Error", "Correo no encontrado en la base de datos.");
        }
    };

    const handleChangePassword = async () => {
        if (!securityAnswer || !newPassword) {
            Alert.alert("Error", "Llena todos los campos");
            return;
        }
        try {
            await resetPassword(email, securityAnswer, newPassword);
            Alert.alert("¡Éxito!", "Contraseña actualizada. Inicia sesión con tu nueva clave.", [
                { text: "Ir a Login", onPress: () => navigation.navigate('InicioSesion') }
            ]);
        } catch (error) {
            Alert.alert("Error", "La respuesta de seguridad es incorrecta");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
                    <Ionicons name="arrow-back" size={28} color="#4CD964" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.title}>App+</Text>
                    <Text style={styles.subtitle}>RECUPERAR CUENTA</Text>
                </View>

                <View style={styles.formContainer}>
                    {step === 1 ? (
                        <>
                            <Text style={styles.header}>Recuperación</Text>
                            <Text style={styles.instructions}>
                                Ingresa tu correo para validar tu identidad.
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="email@dominio.com"
                                placeholderTextColor="#8E8E93"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity style={styles.buttonPrimary} onPress={handleCheckEmail}>
                                <Text style={styles.buttonPrimaryText}>Buscar Usuario</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={styles.header}>Seguridad</Text>
                            <Text style={styles.instructions}>Responde la pregunta secreta para crear una nueva clave.</Text>

                            <Text style={styles.questionLabel}>{securityQuestion}</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Tu respuesta"
                                placeholderTextColor="#8E8E93"
                                value={securityAnswer}
                                onChangeText={setSecurityAnswer}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nueva contraseña"
                                placeholderTextColor="#8E8E93"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry
                            />
                            <TouchableOpacity style={styles.buttonPrimary} onPress={handleChangePassword}>
                                <Text style={styles.buttonPrimaryText}>Actualizar Contraseña</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000'
    },
    headerBar: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
        width: '100%',
        alignItems: 'flex-start',
    },
    backIcon: {
        padding: 5,
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 25,
        paddingBottom: 20,
        paddingTop: 10
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
    header: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8
    },
    instructions: {
        color: '#BDBDBD',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 20
    },
    questionLabel: {
        color: '#4CD964',
        fontSize: 18,
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#4CD964',
        padding: 10,
        borderRadius: 8,
        width: '100%'
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
        marginBottom: 15
    },
    formContainer: {
        width: '100%',
        marginBottom: 20
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
});