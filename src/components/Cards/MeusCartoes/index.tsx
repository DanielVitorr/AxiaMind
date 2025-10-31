import { TouchableOpacity } from "react-native";

import { Card, CardText, Container, Header, Text, Title } from "./style";
import { useAppTheme } from "@/src/contexts/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function MeusCartoes() {
  const { theme } = useAppTheme();

  return (
    <Container>
      <Header>
        <Title>
          <MaterialIcons
            name="credit-card"
            size={30}
            color={theme.colors.accent}
          />
          <Text>Meus Cartões</Text>
        </Title>
        <TouchableOpacity>
          <MaterialIcons name="add" size={30} color={theme.colors.success} />
        </TouchableOpacity>
      </Header>
      <Card>
        <CardText>você não tem nem um cartão cadastrado</CardText>
      </Card>
    </Container>
  );
}
