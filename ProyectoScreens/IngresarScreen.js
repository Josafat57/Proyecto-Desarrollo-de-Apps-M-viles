import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Ingresar({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{`<`}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App+</Text>
        <View style={styles.avatar}/>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ingresa dinero mediante transferencia</Text>
        <Text style={styles.cardSubtitle}>Transferencia bancaria hasta $50,000</Text>
        <Text style={styles.amount}>$ 0.00</Text>
      </View>

      {/* Barra inferior con App+ */}
      <View style={styles.bottomBar}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.bottomImage}
          resizeMode="contain"
        />
        <Text style={styles.bottomText}>App+</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#000',
    paddingHorizontal:16,
    paddingTop:20
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:24
  },
  backArrow:{
    color:'#fff',
    fontSize:24,
    fontWeight:'600'
  },
  headerTitle:{
    color:'#fff',
    fontSize:18,
    fontWeight:'600'
  },
  avatar:{
    width:28,
    height:28,
    borderRadius:14,
    backgroundColor:'#666' 
  },
  card:{
    backgroundColor:'#fff',
    borderRadius:12,
    padding:20,
    marginBottom:16
  },
  cardTitle:{
    fontSize:18,
    fontWeight:'600',
    marginBottom:4
  },
  cardSubtitle:{
    fontSize:13,
    color:'#444',
    marginBottom:20
  },
  amount:{
    fontSize:36,
    fontWeight:'700'
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333'
  },
  bottomImage: {
    width: 40,
    height: 40,
    marginBottom: 5
  },
  bottomText: {
    color: 'green',
    fontSize: 16,
    fontWeight: '600'
  }
});
