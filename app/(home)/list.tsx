import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import LembreteItem from "../../lembreteItem/lembreteItem";
import { getAllLembretes } from "../../service/lembrete";

export default function ListScreen() {

  const meusLembretes = getAllLembretes();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Lembretes</Text>

      
      <FlatList
        data={meusLembretes}
        keyExtractor={(item) => item.lembreteId.toString()}
        renderItem={({ item }) => (
          
          <LembreteItem lembrete={item} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20, 
  },
});


/*
import { StyleSheet, FlatList, View } from 'react-native';

import { LembreteItem } from '../../components/lembreteItem/lembreteItem'; 

import { getAllLembretes } from '../../data/lembretes'; 

export default function List() { 
  const lembretes = getAllLembretes(); // 1. Definição correta da constante

  return ( 
    <View style={styles.container}> 
      <FlatList 
        data={lembretes} // CORRIGIDO: Passando a variável correta
        renderItem={({ item }) => <LembreteItem lembrete={item} />} // CORRIGIDO: Usando o componente importado
        keyExtractor={item => item.lembreteId.toString()} 
        style={styles.list} 
      />
    </View> 
  ); 
} 

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    paddingTop: 40, 
  }, 
  list: { 
    width: "100%", 
    padding: 16, 
    // 3. CORRIGIDO: fontSize removido daqui por ser inválido para FlatList
  } 
});
*/
