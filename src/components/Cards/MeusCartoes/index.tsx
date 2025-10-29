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
