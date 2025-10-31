import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Container, Card, CardText, Header, Title, Text } from "./style";
import { useAppTheme } from "@/src/contexts/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function MinhaMetas() {
  const { theme } = useAppTheme();

  return (
    <Container>
      <Header>
        <Title>
          <MaterialIcons name="flag" size={30} color={theme.colors.accent} />
          <Text>Minhas metas</Text>
        </Title>
        <TouchableOpacity>
          <MaterialIcons name="add" size={30} color={theme.colors.success} />
        </TouchableOpacity>
      </Header>
      <Card>
        <CardText>Você não tem metas cadastradas</CardText>
      </Card>
    </Container>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    gap: 10,
  },
  containerTitulo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  titulo: {
    flexDirection: "row",
    gap: 10,
  },
  tituloTexto: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1F2937",
  },
  textoSecundario: {
    color: "#6B7280",
  },
});
