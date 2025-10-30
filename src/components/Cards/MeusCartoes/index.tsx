import { TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Card, CardText, Container, Header, Text, Title } from "./style";
import { useAppTheme } from "@/src/contexts/ThemeContext";

export default function MeusCartoes() {
  const { theme } = useAppTheme();

  return (
    <Container>
      <Header>
        <Title>
          <AntDesign name="credit-card" size={24} color={theme.colors.accent} />
          <Text>Meus Cartões</Text>
        </Title>
        <View>
          <TouchableOpacity>
            <AntDesign name="plus" size={25} color={theme.colors.success} />
          </TouchableOpacity>
        </View>
      </Header>
      <Card>
        <CardText>você não tem nem um cartão cadastrado</CardText>
      </Card>
    </Container>
  );
}
