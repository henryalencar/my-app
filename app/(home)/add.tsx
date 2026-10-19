import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";

export default function AddScreen() {
  const [titulo, setTitulo] = useState("");
  const [detalhes, setDetalhes] = useState("");

  
  const [isTituloFocused, setIsTituloFocused] = useState(false);
  const [isDetalhesFocused, setIsDetalhesFocused] = useState(false);

  const handleSalvar = () => {
    if (!titulo.trim()) {
      Alert.alert("Campo Obrigatório", "Por favor, digite um título para o lembrete!");
      return;
    }

    const novoLembrete = {
      lembreteId: Date.now(), 
      titulo: titulo.trim(),
      detalhes: detalhes.trim(),
    };

    Alert.alert("Sucesso", `Lembrete "${titulo}" salvo com sucesso!`);

    setTitulo("");
    setDetalhes("");
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.card}>
          <Text style={styles.title}>Criar Lembrete</Text>

          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Título do Lembrete</Text>
            <TextInput
              style={[styles.input, isTituloFocused && styles.inputFocused]}
              placeholder="Ex: Beber água, Estudar React..."
              placeholderTextColor="#A3A3A3"
              value={titulo}
              onChangeText={setTitulo}
              onFocus={() => setIsTituloFocused(true)}
              onBlur={() => setIsTituloFocused(false)}
            />
          </View>

          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição / Detalhes</Text>
            <TextInput
              style={[styles.input, styles.textArea, isDetalhesFocused && styles.inputFocused]}
              placeholder="Adicione mais informações aqui..."
              placeholderTextColor="#A3A3A3"
              value={detalhes}
              onChangeText={setDetalhes}
              multiline={true}
              numberOfLines={4}
              onFocus={() => setIsDetalhesFocused(true)}
              onBlur={() => setIsDetalhesFocused(false)}
            />
          </View>

          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSalvar}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Salvar Lembrete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", 
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: "800", 
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 28,
    letterSpacing: -0.5,
  },
  inputGroup: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    color: "#1E293B",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
  },
  inputFocused: {
    borderColor: "#4F46E5", 
    backgroundColor: "#F8FAFC",
  },
  textArea: {
    height: 110,
    textAlignVertical: "top", 
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#4F46E5", 
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2, 
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});


// import React, { useState } from 'react';
// import { View, Text, TextInput, Switch, StyleSheet, Button } from 'react-native';
// import { Stack } from 'expo-router';

// export default function Add() { 
//   const [titulo, setTitulo] = useState<string>(''); 
//   const [corpo, setCorpo] = useState<string>(''); 
//   const [status, setStatus] = useState<boolean>(false); 

//   return ( 
//     <View style={styles.container}> 
//       
//       <Stack.Screen options={{ title: "Adicionar Lembrete" }} /> 
//       
//       <View style={styles.lembreteArea}> 
//         <View style={styles.detailsArea}> 
//           
//           <Text style={styles.title}>Título</Text> 
//           <TextInput 
//             style={styles.input} 
//             onChangeText={setTitulo} 
//             textAlign='center' 
//             value={titulo} 
//           /> 
//           
//           <Text style={styles.description}>Descrição</Text> 
//           <TextInput 
//             editable={true} 
//             multiline={true} 
//             numberOfLines={6} 
//             maxLength={60} 
//             onChangeText={setCorpo} 
//             style={styles.input} 
//             value={corpo} 
//           /> 
//           
//           <View style={styles.switchArea}> 
//             <Text>Não Concluída</Text> 
//             <Switch 
//               trackColor={{ false: '#767577', true: '#81b0ff' }} 
//               onValueChange={setStatus} 
//               value={status} 
//             /> 
//             <Text>Concluída</Text> 
//           </View> 
//           
//         </View> 
//       </View> 
//       
//       <View style={styles.buttonArea}> 
//         <Button title="Adicionar" function={alert} /> 
//       </View> 
//       
//     </View> 
//   ) 
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: "#d2e0f9" 
//   },
//   lembreteArea: { 
//     flex: 1, 
//     padding: 20, 
//     marginTop: 64 
//   },
//   buttonArea: { 
//     padding: 20, 
//     flexDirection: "row", 
//     gap: 32, 
//     justifyContent: "center", 
//     alignItems: "center", 
//     paddingBottom: 64 
//   },
//   switchArea: { 
//     flexDirection: "row", 
//     justifyContent: "center", 
//     alignItems: "center", 
//     gap: 32 
//   },
//   detailsArea: { 
//     width: "100%", 
//     justifyContent: 'center', 
//     alignItems: "center", 
//     color: "#E67A31", 
//     borderStyle: 'solid', 
//     borderWidth: 1, 
//     borderColor: "#4294E7", 
//     borderRadius: 10, 
//     padding: 20, 
//     gap: 16, 
//     backgroundColor: "#fff" 
//   },
//   title: { 
//     fontSize: 28, 
//     fontWeight: 'bold', 
//     color: "#4294E7" 
//   },
//   description: { 
//     fontSize: 20 
//   },
//   input: { 
//     width: "100%", 
//     margin: 12, 
//     borderWidth: 1, 
//     padding: 6 
//   }
// })

