import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function MeusCartoes() {
  return (
    <View style={style.container}>
      <View style={style.containerTitulo}>
        <View style={style.titulo}>
          <AntDesign name="credit-card" size={24} color="black" />
          <Text style={style.tituloTexto}>Meus Cartões</Text>
        </View>
        <View>
          <TouchableOpacity>
            <AntDesign name="plus" size={25} color="#3ACD7D" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.containerCartoes}>
        <Text style={style.textoSecundario}>
          você não tem nem um cartão cadastrado
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  containerTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  titulo: {
    flexDirection: "row",
    gap: 10,
  },
  tituloTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  containerCartoes: {
    flexDirection: "row",
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textoSecundario: {
    color: "#6B7280",
  },
});
