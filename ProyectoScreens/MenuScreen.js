import { Text, StyleSheet, View, Button } from 'react-native'
import React, { useState } from 'react'

import InicioSesion from './InicioSesion';

export default function MenuScreen() {
    const [screen, setScreen]= useState('menu');

    switch(screen){
        case 'InicioSesion':
            return <InicioSesion></InicioSesion>;
        case 'menu':
            default:
            return (
                <View style={styles.container}>
                    <Text style={styles.menu1}>Menú de Screens Proyecto</Text>
                    <View style={styles.botonesContainer1}>
                        <Button onPress={()=>setScreen('InicioSesion')} title='Inicio de Sesión'></Button>
                    </View>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#448b7aff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu1:{
        color: '#ff9900ff',
        fontSize:40,
        fontFamily:'Roboto',
        fontWeight:'bold',
        fontStyle:'italic',
        textDecorationLine:'underline',
    },
    botonesContainer1:{
        marginTop:20,
        flexDirection:'column',
        gap:20,
    },
});