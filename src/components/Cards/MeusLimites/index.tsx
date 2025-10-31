import { TouchableOpacity } from "react-native";

import { Card, CardText, Container, Header, Text, Title } from "./style";
import { useAppTheme } from "@/src/contexts/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function MeusLimites() {
  const { theme } = useAppTheme();

  return (
    <Container>
      <Header>
        <Title>
          <MaterialIcons name="block" size={30} color={theme.colors.accent} />
          <Text>Meus Limites</Text>
        </Title>
        <TouchableOpacity>
          <MaterialIcons name="add" size={30} color={theme.colors.success} />
        </TouchableOpacity>
      </Header>
      <Card>
        <CardText>Você não tem limite cadastradas</CardText>
      </Card>
    </Container>
  );
}
