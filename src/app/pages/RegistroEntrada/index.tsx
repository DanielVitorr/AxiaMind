import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import dayjs from "dayjs";

import { createEntredas } from "@/src/database/mmkvFinancas";
import { getCategoria } from "@/src/database/mmkvCategorias";

import { ptBR } from "@/src/utils/localeCalenderConfig";
import { style } from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";
import PickerCostumizado from "@/src/components/PickerCostumizado";
import { MaterialIcons } from "@expo/vector-icons";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export default function RegistroEntrada() {
  const router = useRouter();

  const categorias = getCategoria();

  const [day, setDay] = useState<DateData>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [dataRegistro, setDataRegistro] = useState("");
  const [valorReal, setValorReal] = useState("");
  const [dataRecebimento, setDataRecebimento] = useState<string | null>(null);
  const [calendarDate, setCalendarDate] = useState<string | null>(null);
  const [selectCategoria, setSelectCategoria] = useState();

  const handleSelect = (option: "hoje" | "ontem") => {
    const hoje = dayjs().format("YYYY-MM-DD");
    const ontem = dayjs().subtract(1, "day").format("YYYY-MM-DD");

    if (option === "hoje") {
      setDataRecebimento(hoje);
    } else if (option === "ontem") {
      setDataRecebimento(ontem);
    }
    // console.log(option)
  };

  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  const handleDayPress = (selectedDay: DateData) => {
    setDay(selectedDay);
    setDataRecebimento(selectedDay.dateString);
    setCalendarDate(selectedDay.dateString);
    setShowCalendar(false);
  };

  const formatarReal = (input: string) => {
    // Remove tudo que não for número
    let numero = input.replace(/\D/g, "");

    // Converte para centavos
    numero = (Number(numero) / 100).toFixed(2);

    // Formata para R$
    return Number(numero).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleChange = (text: string) => {
    setValorReal(formatarReal(text));
  };

  const registrarEntreda = () => {
    if (!valorReal || !selectCategoria || !dataRecebimento) {
      alert("Preencher todos os campos!");
      return;
    }

    try {
      const valorNumero = Number(
        valorReal.replace(/[^0-9,-]+/g, "").replace(",", ".")
      );

      createEntredas({
        titulo: titulo,
        valor: valorNumero,
        categoria: selectCategoria,
        dataRecebimento: dataRecebimento,
        dataRegistro: dayjs().format("YYYY-MM-DD"),
      });

      alert("Entrada registrada com sucesso!");
      router.push("/");
    } catch (error) {
      throw error;
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar backgroundColor="#10B981" />
        <View style={style.container}>
          <View style={style.header}>
            <Text style={style.headerTexto}>Adicionar Entrada</Text>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Ionicons
                name="arrow-back-circle-outline"
                size={35}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View style={style.content}>
            <View style={style.inputs}>
              <Text style={style.inputsTexto}>Valor</Text>
              <TextInput
                style={style.inputTexto}
                placeholder="R$ 0,00"
                keyboardType="numeric"
                value={valorReal}
                onChangeText={handleChange}
              />
            </View>
            <View style={style.inputs}>
              <Text style={style.inputsTexto}>Titulo</Text>
              <TextInput
                style={style.inputTexto}
                placeholder="Titulo"
                value={titulo}
                onChangeText={setTitulo}
              />
            </View>
            <View style={style.inputs}>
              <Text style={style.inputsTexto}>Categoria</Text>
              <PickerCostumizado />
            </View>

            <View style={style.containerDataRecebimento}>
              <Text style={style.dataRecebimentoTitulo}>Data Recebimento</Text>
              <View style={style.selectDataRecebimento}>
                <TouchableOpacity
                  style={[
                    style.selectButton,
                    dataRecebimento === dayjs().format("YYYY-MM-DD") &&
                      style.selectButtonAtivo,
                  ]}
                  onPress={() => handleSelect("hoje")}
                >
                  <Text
                    style={[
                      style.selectButtonText,
                      dataRecebimento === dayjs().format("YYYY-MM-DD") &&
                        style.selectButtonTextAtivo,
                    ]}
                  >
                    Hoje
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    style.selectButton,
                    dataRecebimento ===
                      dayjs().subtract(1, "day").format("YYYY-MM-DD") &&
                      style.selectButtonAtivo,
                  ]}
                  onPress={() => handleSelect("ontem")}
                >
                  <Text
                    style={[
                      style.selectButtonText,
                      dataRecebimento ===
                        dayjs().subtract(1, "day").format("YYYY-MM-DD") &&
                        style.selectButtonTextAtivo,
                    ]}
                  >
                    Ontem
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.selectButton}
                  onPress={handleShowCalendar}
                >
                  <Text style={style.selectButtonText}>
                    {calendarDate
                      ? dayjs(calendarDate).format("DD/MM/YYYY")
                      : "Selecione uma data"}
                  </Text>
                </TouchableOpacity>
              </View>
              {showCalendar && (
                <Calendar
                  headerStyle={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#2e2e2e",
                  }}
                  theme={{
                    todayTextColor: "#10B981",
                    selectedDayBackgroundColor: "#10B981",
                    selectedDayTextColor: "#ffffff",
                    calendarBackground: "transparent",
                  }}
                  onDayPress={handleDayPress}
                  markedDates={
                    day && {
                      [day.dateString]: { selected: true },
                    }
                  }
                />
              )}
            </View>
          </View>
          <TouchableOpacity
            style={style.botaoAdicionar}
            onPress={registrarEntreda}
          >
            <Text style={style.botaoTexto}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
