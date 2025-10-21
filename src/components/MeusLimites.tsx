import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MeusLimites() {
  return (
    <View style={style.container}>
      <View style={style.containerTitulo}>
        <View style={style.titulo}>
          <Ionicons name="trophy-outline" size={24} color="black" />
          <Text style={style.tituloTexto}>Meus Limites</Text>
        </View>
        <TouchableOpacity>
          <AntDesign name="plus" size={25} color="#3ACD7D" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={style.textoSecundario}>Você não tem limite cadastradas</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    gap: 10
  },
  containerTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)'
  },
  titulo: {
    flexDirection: 'row',
    gap: 10
  },
  tituloTexto: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1F2937'
  },
  textoSecundario: {
    color: '#6B7280'
  }
})