import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type MesCarrosselProps = {
  currentDate: Date;
  onChangeMonth: (date: Date) => void;
  textColorSecundary?: string;
  textColorPrimary?: string;
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
  textColorPrimary,
  textColorSecundary,
}: MesCarrosselProps) {
  const prevDate = addMonths(currentDate, -1);
  const nextDate = addMonths(currentDate, 1);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onChangeMonth(prevDate)}>
        <Text style={[styles.sideMonth, { color: textColorSecundary }]}>
          {formatDate(prevDate)}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.currentMonth, { color: textColorPrimary }]}>
        {formatDate(currentDate)}
      </Text>

      <TouchableOpacity onPress={() => onChangeMonth(nextDate)}>
        <Text style={[styles.sideMonth, { color: textColorSecundary }]}>
          {formatDate(nextDate)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sideMonth: {
    fontSize: 16,
    textAlign: "center",
  },
  currentMonth: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
