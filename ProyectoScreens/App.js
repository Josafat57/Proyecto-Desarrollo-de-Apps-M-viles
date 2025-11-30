import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { initDatabase } from './database/Database';
import InicioSesion from './InicioSesion';
import RegistroScreen from './RegistroScreen';
import OlvidarContrasena from './OlvidarContrasena';
import PaginaInicioScreen from './PaginaInicioScreen';
import IngresarDineroScreen from './IngresarDineroScreen';
import RetirarDineroScreen from './RetirarDineroScreen';
import HistorialScreen from './HistorialScreen';
import GraficaScreen from './GraficaScreen';
import PerfilScreen from './PerfilScreen'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ route }) {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#555',
        tabBarStyle: { 
            backgroundColor: '#FFF', 
            height: 60,
            paddingBottom: 5,
            paddingTop: 5
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'Ingresar') iconName = 'add-circle';
          else if (route.name === 'Retirar') iconName = 'remove-circle';
          else if (route.name === 'Historial') iconName = 'history';
          else if (route.name === 'Gráfica') iconName = 'bar-chart';
          else if (route.name === 'Perfil') iconName = 'person';
          
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Inicio" 
        component={PaginaInicioScreen} 
        initialParams={route.params} 
      />
      
      <Tab.Screen name="Ingresar" component={IngresarDineroScreen} />
      <Tab.Screen name="Retirar" component={RetirarDineroScreen} />
      <Tab.Screen name="Historial" component={HistorialScreen} />
      <Tab.Screen name="Gráfica" component={GraficaScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InicioSesion" component={InicioSesion} />
        <Stack.Screen name="RegistroScreen" component={RegistroScreen} />
        <Stack.Screen name="OlvidarContrasena" component={OlvidarContrasena} />
      </Stack.Navigator>
    );
}

export default function App() {

  useEffect(() => {
    initDatabase();
    console.log("Base de datos inicializada desde App.js");
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="PaginaInicioScreen" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}