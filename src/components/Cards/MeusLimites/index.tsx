import { TouchableOpacity, View } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Card, CardText, Container, Header, Text, Title } from "./style";
import { useAppTheme } from "@/src/contexts/ThemeContext";

export default function MeusLimites() {
  const { theme } = useAppTheme();

  return (
    <Container>
      <Header>
        <Title>
          <Ionicons
            name="trophy-outline"
            size={24}
            color={theme.colors.accent}
          />
          <Text>Meus Limites</Text>
        </Title>
        <TouchableOpacity>
          <AntDesign name="plus" size={25} color={theme.colors.success} />
        </TouchableOpacity>
      </Header>
      <Card>
        <CardText>Você não tem limite cadastradas</CardText>
      </Card>
    </Container>
  );
}
