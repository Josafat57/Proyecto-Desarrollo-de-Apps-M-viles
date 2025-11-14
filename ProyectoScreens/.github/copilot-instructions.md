## Propósito
Este archivo da instrucciones concisas y específicas para que asistentes de codificación (Copilot / agentes) sean inmediatamente productivos con este repositorio React Native (Expo).

## Resumen rápido del proyecto
- Tipo: aplicación móvil React Native usando Expo.
- Entrada: `index.js` -> `registerRootComponent(App)`.
- Root UI: `App.js` importa y renderiza `MenuScreen`.
- Navegación: no se usa React Navigation; `MenuScreen.js` controla el cambio de pantallas con un switch sobre un estado local (`useState('menu')`).

## Comandos importantes (ver `package.json`)
- `npm start` o `expo start` — inicia Metro/Expo.
- `npm run android` — inicia con --android (Expo).
- `npm run ios` — inicia con --ios (Expo).

Si se añaden scripts nuevos, mantén el formato existente en `package.json`.

## Dependencias clave
- `expo`, `react`, `react-native` — plataforma base.
- `react-native-chart-kit`, `react-native-pie-chart`, `react-native-svg` — librerías de gráficos usadas en `GraficaScreen.js`.

## Estructura y convenciones de archivos
- Pantallas: cada pantalla es un archivo en la raíz del proyecto (p. ej. `PaginaInicioScreen.js`, `PerfilScreen.js`).
- Export: cada pantalla exporta por defecto un componente funcional (p. ej. `export default IngresarDineroScreen`).
- Estilos: se usa `StyleSheet.create` dentro del mismo archivo de la pantalla; no hay tema global centralizado.
- Assets: hay carpeta `assets/` pero el código usa URIs remotas en algunos lugares (ver `IngresarDineroScreen.js`).

## Patrones de navegación y de componentes (importante para cambios)
- Para agregar una pantalla nueva:
  1. Crear `MiNuevaScreen.js` con un componente funcional y `export default`.
  2. Importar la pantalla en `MenuScreen.js`.
  3. Añadir un case en el switch (`case 'minueva': return <MiNuevaScreen/>;`).
  4. Añadir un `Button` que haga `setScreen('minueva')` en la vista del menú.

- No refactorices silenciosamente a React Navigation o a un router complejo sin pedir confirmación: la intención actual es simple y explícita.

## Flujo de datos y props
- No hay Redux/Context global por defecto. Las pantallas comunican datos mediante props o accediendo a módulos locales.
- Observa que algunas pantallas esperan callbacks (p. ej. `IngresarDineroScreen` recibe `{ volver }`); respeta esas firmas cuando conectes componentes.

## Estilo de código y pequeñas normas
- JavaScript (no TypeScript). Sigue la sintaxis y el estilo actual (componentes funcionales, estilos inline con StyleSheet).
- Evitar reorganizaciones grandes en una única PR. Hacer cambios locales y comprensibles: añadir pantalla, ajustar estilos o corregir bug aislado.

## Ejemplos concretos extraídos del código
- Raíz: `index.js` — usa `registerRootComponent(App)` (Expo). No tocar salvo para pasos de inicialización.
- Root render: `App.js` => `<MenuScreen/>`.
- Navegación manual: `MenuScreen.js` usa `const [screen, setScreen] = useState('menu')` y `switch(screen)`.
- Pantalla: `IngresarDineroScreen.js` — estilo oscuro (fondo negro), componente exportado por defecto, usa `StyleSheet.create`.

## Qué evitar o preguntar antes de cambiar
- No introducir librerías de navegación o estado global sin aprobación del mantenedor.
- Evitar migraciones a TypeScript o reestructuraciones de carpeta grandes sin coordinar.

## Qué revisar cuando pides PRs al repositorio
- Verificar que `npm start`/`expo start` siga funcionando localmente.
- Asegurarse de que las nuevas pantallas se integren en `MenuScreen` (caso + botón en menú).
- Mantener el formato de export por defecto de cada pantalla.

## Preguntas al autor (para clarificar si es necesario)
- ¿Se aceptaría migrar a un sistema de navegación (React Navigation) en el corto plazo?
- ¿Hay planes para añadir pruebas automatizadas o CI? (ninguna configuración detectada ahora).

---
Si quieres, puedo adaptar estas instrucciones (más corto/mas largo), o incluir ejemplos de PRs o plantillas de commit/branch para este repositorio.
