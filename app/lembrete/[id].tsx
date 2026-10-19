import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { getAllLembretes } from "../../service/lembrete"; 

export default function EditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [titulo, setTitulo] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [status, setStatus] = useState(false);

  const [isTituloFocused, setIsTituloFocused] = useState(false);
  const [isDetalhesFocused, setIsDetalhesFocused] = useState(false);

  useEffect(() => {
    if (id) {
      const todosOsLembretes = getAllLembretes();
      
      const lembreteEncontrado = todosOsLembretes.find(
        (item) => item.lembreteId.toString() === id.toString()
      );

      if (lembreteEncontrado) {
        setTitulo(lembreteEncontrado.tituloLembrete);
        setDetalhes(lembreteEncontrado.corpoLembrete);
        setStatus(lembreteEncontrado.statusLembrete);
      } else {
        Alert.alert("Erro", "Lembrete não encontrado!", [
          { text: "Voltar", onPress: () => router.back() }
        ]);
      }
    }
  }, [id]);

  const handleSalvarEdicao = () => {
    if (!titulo.trim()) {
      Alert.alert("Campo Obrigatório", "Por favor, digite um título para o lembrete!");
      return;
    }

    const lembreteAtualizado = {
      lembreteId: Number(id), 
      tituloLembrete: titulo.trim(),
      corpoLembrete: detalhes.trim(),
      statusLembrete: status
    };

    Alert.alert(
      "Sucesso", 
      `Lembrete atualizado com sucesso!`,
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <Stack.Screen 
        options={{ 
          title: titulo ? `Editar: ${titulo}` : "Editar Lembrete",
          headerTintColor: "#4F46E5",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ paddingRight: 16 }}>
              <Text style={{ color: "#4F46E5", fontSize: 16, fontWeight: "600" }}>❮ Voltar</Text>
            </TouchableOpacity>
          ),
        }} 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Editar Lembrete</Text>

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

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Status do Lembrete:</Text>
            <View style={styles.switchGroup}>
              <Text style={styles.switchText}>{status ? "Concluído" : "Pendente"}</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                value={status}
                onValueChange={setStatus}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSalvarEdicao}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
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
    marginBottom: 24,
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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
  },
  switchGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  switchText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
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
  cancelButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
  },
  cancelButtonText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "600",
  },
});
