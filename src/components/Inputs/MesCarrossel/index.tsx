import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Container, Content, CurrentMonth, SideMonth } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@/src/contexts/ThemeContext";

type MesCarrosselProps = {
  currentDate: Date;
  onChangeMonth: (date: Date) => void;
};

const formatDate = (date: Date) => {
  const mes = date.toLocaleDateString("pt-BR", { month: "long" });
  const mesMaiusculo = mes.charAt(0).toUpperCase() + mes.slice(1);
  return `${mesMaiusculo} \n ${date.getFullYear()}`;
};

const addMonths = (date: Date, num: number) => {
  const newDate = new Date(date);

  newDate.setMonth(date.getMonth() + num);
  return newDate;
};

export default function MesCarrossel({
  currentDate,
  onChangeMonth,
}: MesCarrosselProps) {
  const prevDate = addMonths(currentDate, -1);
  const nextDate = addMonths(currentDate, 1);

  const { theme } = useAppTheme();

  return (
    <Container>
      <Content>
        <TouchableOpacity onPress={() => onChangeMonth(prevDate)}>
          <MaterialIcons
            name="arrow-circle-left"
            size={28}
            color={theme.colors.accent}
          />
        </TouchableOpacity>
        <SideMonth>{formatDate(prevDate)}</SideMonth>

        <CurrentMonth>{formatDate(currentDate)}</CurrentMonth>

        <SideMonth>{formatDate(nextDate)}</SideMonth>
        <TouchableOpacity onPress={() => onChangeMonth(nextDate)}>
          <MaterialIcons
            name="arrow-circle-right"
            size={28}
            color={theme.colors.accent}
          />
        </TouchableOpacity>
      </Content>
    </Container>
  );
}
