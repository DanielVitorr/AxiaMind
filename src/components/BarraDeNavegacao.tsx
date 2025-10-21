import { useRouter } from "expo-router";
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRef } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function BarraDeNavegacao() {
  const router = useRouter();
  const translateY = useRef(new Animated.Value(300)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          fechar();
        } else {
          abrir();
        }
      },
    })
  ).current;

  function abrir() {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }

  function fechar() {
    Animated.spring(translateY, {
      toValue: 300, // altura do fechamento
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={style.container}>
      <View>
        <TouchableOpacity style={style.botao} onPress={() => router.push("/")}>
          <FontAwesome name="home" size={25} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={style.botao}
          onPress={() => router.push("/pages/ListaRegistro")}
        >
          <FontAwesome name="list" size={25} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={style.botao}>
          <FontAwesome name="bar-chart" size={25} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={style.adicionar} onPress={abrir}>
          <FontAwesome name="plus" size={25} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[style.bottomSheet, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={style.handle} />
        <TouchableOpacity
          style={style.botaoEntrada}
          onPress={() => router.push("/pages/RegistroEntrada")}
        >
          <Text style={style.buttonText}>Registrar Entrada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.botaoSaida}
          onPress={() => router.push("/pages/RegistroSaida")}
        >
          <Text style={style.buttonText}>Registrar Saída</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    padding: 10,
    paddingBottom: 20,
  },
  adicionar: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    borderRadius: 10,
  },
  botao: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  sheetContent: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 15,
  },
  sheetButton: {
    padding: 15,
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    alignItems: "center",
  },
  sheetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    marginBottom: 15,
  },
  botaoEntrada: {
    padding: 15,
    backgroundColor: "#10B981",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  botaoSaida: {
    padding: 15,
    backgroundColor: "#F87171",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
