import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

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
          paddingTop: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let source;
          if (route.name === 'Inicio')
            source = { uri: 'https://i.postimg.cc/wT7wGbqr/minimal_house_icon_website_symbol_site_sign_ui_home_icon_home_creative_icon_minimalist_vector.jpg' };
          else if (route.name === 'Ingresar')
            source = { uri: 'https://i.postimg.cc/gJXrQ5Fn/ingresar.jpg' };
          else if (route.name === 'Retirar')
            source = { uri: 'https://i.postimg.cc/nV3w0PVg/retirar.png' };
          else if (route.name === 'Historial')
            source = { uri: 'https://i.postimg.cc/j2D68vvM/historial.webp' };
          else if (route.name === 'Gráfica')
            source = { uri: 'https://i.postimg.cc/sXQ9mwT6/grafica.png' };
          else if (route.name === 'Perfil')
            source = { uri: 'https://i.postimg.cc/8zZRVq3B/perfil.jpg' };

          return (
            <Image
              source={source}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          );
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
    console.log('Base de datos inicializada desde App.js');
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