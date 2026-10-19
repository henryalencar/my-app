import { Lembrete } from "../types/lembrete"; // Caminho correto para o arquivo de tipos
import { Text, View, Switch, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";

type Props = {
  lembrete: Lembrete; 
};

export default function LembreteItem({ lembrete }: Props) {
  return (
    // pathname alterado para apontar para a pasta /lembrete/[id] que criamos
    <Link 
      href={{ 
        pathname: "/lembrete/[id]", 
        params: { id: lembrete.lembreteId } 
      }} 
      asChild
    >
      <Pressable style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{lembrete.tituloLembrete}</Text>
          <Text style={styles.description}>{lembrete.corpoLembrete}</Text>
          
          <Switch 
            trackColor={{ false: "#767577", true: "#81b0ff" }} 
            value={lembrete.statusLembrete}
            disabled={true} 
          />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
});
