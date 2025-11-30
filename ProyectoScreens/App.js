import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InicioSesion">
          {(props) => <InicioSesion {...props} onLoginSuccess={() => setIsLoggedIn(true)} />}
        </Stack.Screen>
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="OlvidarContraseña" component={OlvidarContrasena} />
      </Stack.Navigator>
    );
  }

  function AppStack() {
    return (
      <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#555',
          tabBarStyle: { backgroundColor: '#FFF', height: 60 },
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
        <Tab.Screen name="Inicio" component={PaginaInicioScreen} />
        <Tab.Screen name="Ingresar" component={IngresarDineroScreen} />
        <Tab.Screen name="Retirar" component={RetirarDineroScreen} />
        <Tab.Screen name="Historial" component={HistorialScreen} />
        <Tab.Screen name="Gráfica" component={GraficaScreen} />
        <Tab.Screen name="Perfil" component={PerfilScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}