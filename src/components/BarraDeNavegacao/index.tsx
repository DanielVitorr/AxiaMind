import { useRouter } from "expo-router";
import { Animated, PanResponder, View } from "react-native";
import { useRef } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  style,
  Container,
  Button,
  Content,
  Entry,
  Text,
  Exit,
  Add,
} from "./style";
import { useAppTheme } from "@/src/contexts/ThemeContext";

export default function BarraDeNavegacao() {
  const router = useRouter();
  const translateY = useRef(new Animated.Value(300)).current;

  const { theme } = useAppTheme();

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
    <Container>
      <View>
        <Button onPress={() => router.push("/")}>
          <FontAwesome name="home" size={25} color={theme.colors.accent} />
        </Button>
      </View>

      <View>
        <Button onPress={() => router.push("/pages/ListaRegistro")}>
          <FontAwesome name="list" size={25} color={theme.colors.accent} />
        </Button>
      </View>
      <View>
        <Button>
          <FontAwesome name="bar-chart" size={25} color={theme.colors.accent} />
        </Button>
      </View>
      <View>
        <Add onPress={abrir}>
          <FontAwesome name="plus" size={25} color={theme.colors.white} />
        </Add>
      </View>

      <Animated.View
        style={[style.bottomSheet, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={style.handle} />
        <Content>
          <Entry onPress={() => router.push("/pages/RegistroEntrada")}>
            <Text>Registrar Entrada</Text>
          </Entry>
          <Exit onPress={() => router.push("/pages/RegistroSaida")}>
            <Text>Registrar Saída</Text>
          </Exit>
        </Content>
      </Animated.View>
    </Container>
  );
}
