import { Text, StyleSheet, View, Button } from 'react-native'
import React, { useState } from 'react'

import InicioSesion from './InicioSesion';
import RegistroScreen from './RegistroScreen';
import PaginaInicioScreen from './PaginaInicioScreen';
import HistorialScreen from './HistorialScreen';
import GraficaScreen from './GraficaScreen';
import PerfilScreen from './PerfilScreen';
import RetirarDineroScreen from './RetirarDineroScreen';
import IngresarDineroScreen from './IngresarDineroScreen';

export default function MenuScreen() {
    const [screen, setScreen]= useState('menu');

    switch(screen){
        case 'InicioSesion':
            return <InicioSesion></InicioSesion>;

        case 'RegistroScreen':
            return <RegistroScreen></RegistroScreen>
        
        case 'PaginaInicio':
            return <PaginaInicioScreen></PaginaInicioScreen>;
        
        case 'historial':
            return <HistorialScreen></HistorialScreen>;
        
        case 'grafica':
            return <GraficaScreen></GraficaScreen>;

        case 'Perfil':
            return <PerfilScreen></PerfilScreen>;
        
        case 'retirar':
            return <RetirarDineroScreen></RetirarDineroScreen>;
        
        case 'ingresar':
            return <IngresarDineroScreen></IngresarDineroScreen>;

        case 'menu':
            default:
            return (
                <View style={styles.container}>
                    <Text style={styles.menu1}>Menú de Screens Proyecto</Text>
                    <View style={styles.botonesContainer1}>
                        <Button onPress={()=>setScreen('InicioSesion')} title='Inicio de Sesión'></Button>
                        <Button onPress={()=>setScreen('RegistroScreen')} title='Registro de sesión'></Button>
                        <Button onPress={()=>setScreen('PaginaInicio')} title='Pagina de Inicio'></Button>
                        <Button onPress={()=>setScreen('historial')} title='Historial de transaccciones'></Button>
                        <Button onPress={()=>setScreen('grafica')} title='Gráfica de Gastos'></Button>
                        <Button onPress={()=>setScreen('Perfil')} title='Perfil de Usuario'></Button>
                        <Button onPress={()=>setScreen('retirar')} title='Retirar Dinero'></Button>
                        <Button onPress={()=>setScreen('ingresar')} title='Ingresar Dinero'></Button>
                    </View>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu1:{
        color: '#ffffffff',
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