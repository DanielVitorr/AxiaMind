import { useRouter } from "expo-router";
import {
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
import "dayjs/locale/pt-br";

import { createSaidasParceladas } from "@/src/database/mmkvFinancas";

import { ptBR } from "@/src/utils/localeCalenderConfig";
import { style } from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";
dayjs.locale("pt-br");

const categorias = [
  "Alimentação",
  "Assinaturas",
  "Compras e lazer",
  "Educação e desenvolvimento",
  "Emergências",
  "Entretedimento digital",
  "Hobbies e atividades de lazer",
  "Impostos e taxas",
  "Investimentos",
  "Manutenção e reparos",
  "Moradia",
  "Outros",
  "Poupança",
  "Renda",
  "Saúde e bem-estar",
  "Seguros",
  "Serviços financeiros e bancarios",
  "Streaming",
  "Transferencias e pagamentos",
  "Transportes",
  "Viagens",
];

export default function RegistroSaida() {
  const router = useRouter();

  const [dayVencimento, setDayVencimento] = useState<DateData>();
  const [dayPagamento, setDayPagamento] = useState<DateData>();
  const [showCalendarVencimento, setShowCalendarVencimento] = useState(false);
  const [showCalendarPagamento, setShowCalendarPagamento] = useState(false);
  const [calendarDateVencimento, setCalendarDateVencimento] = useState<
    string | null
  >(null);
  const [calendarDatePagamento, setCalendarDatePagamento] = useState<
    string | null
  >(null);

  const [valorReal, setValorReal] = useState("");
  const [titulo, setTitulo] = useState("");
  const [selectCategoria, setSelectCategoria] = useState<string>("");
  const [selectDateVencimento, setSelectDateVencimento] = useState<
    string | null
  >(null);
  const [selectDatePagamento, setSelectDatePagamento] = useState<string | null>(
    null
  );
  const [selectStatusPago, setSelectStatusPago] = useState<number | null>(null);
  const [selectTipoPagamento, setSelectTipoPagamento] = useState<string | null>(
    null
  );
  const [selectTipoPagamentoQuant, setSelectTipoPagamentoQuant] = useState<
    number | null
  >(null);
  const [selectTipoParcelamento, setSelectTipoParcelamento] = useState<
    string | null
  >(null);
  const [dataRegistro, setDataRegistro] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const handleSelectDayVencimento = (option: "hoje" | "ontem") => {
    const hoje = dayjs().format("YYYY-MM-DD");
    const ontem = dayjs().subtract(1, "day").format("YYYY-MM-DD");

    if (option === "hoje") {
      setSelectDateVencimento(hoje);
    } else if (option === "ontem") {
      setSelectDateVencimento(ontem);
    }
  };

  const handleSelectDayPagamento = (option: "hoje" | "ontem") => {
    const hoje = dayjs().format("YYYY-MM-DD");
    const ontem = dayjs().subtract(1, "day").format("YYYY-MM-DD");

    if (option === "hoje") {
      setSelectDatePagamento(hoje);
    } else if (option === "ontem") {
      setSelectDatePagamento(ontem);
    }
  };

  const handleSelectStatusPago = (option: "pago" | "naoPago") => {
    const pago = 1;
    const naoPago = 0;

    if (option === "pago") {
      setSelectStatusPago(pago);
    } else if (option === "naoPago") {
      setSelectStatusPago(naoPago);
    }
  };

  const handleSelectTipoPagamento = (option: "Unico" | "Parcelado") => {
    const Unico = "Unico";
    const Parcelado = "Parcelado";

    if (option === "Unico") {
      setSelectTipoPagamento(Unico);
    } else if (option === "Parcelado") {
      setSelectTipoPagamento(Parcelado);
    }
  };

  const handleShowCalendarVencimento = () => {
    setShowCalendarVencimento(true);
  };

  const handleShowCalendarPagamento = () => {
    setShowCalendarPagamento(true);
  };

  const handleDayPressVencimento = (selectedDayVencimento: DateData) => {
    setDayVencimento(selectedDayVencimento);
    setSelectDateVencimento(selectedDayVencimento.dateString);
    setCalendarDateVencimento(selectedDayVencimento.dateString);
    setShowCalendarVencimento(false);
  };

  const handleDayPressPagamento = (selectedDayPagamento: DateData) => {
    setDayPagamento(selectedDayPagamento);
    setSelectDatePagamento(selectedDayPagamento.dateString);
    setCalendarDatePagamento(selectedDayPagamento.dateString);
    setShowCalendarPagamento(false);
  };

  const formatarReal = (input: string) => {
    let numero = input.replace(/\D/g, "");
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

  const registrarSaida = () => {
    if (
      !valorReal ||
      selectCategoria === "" ||
      !selectDateVencimento ||
      selectStatusPago === null ||
      !selectTipoPagamento ||
      (selectStatusPago === 1 && !selectDatePagamento)
    ) {
      alert("Preencher todos os campos!");
      return;
    }

    try {
      const valorNumero = Number(
        valorReal.replace(/[^0-9,-]+/g, "").replace(",", ".")
      );

      createSaidasParceladas({
        titulo: titulo,
        valor: valorNumero,
        categoria: selectCategoria,
        dataVencimento: selectDateVencimento,
        dataPagamento: selectStatusPago === 1 ? selectDatePagamento : null,
        tipoPagamento: selectTipoPagamento,
        statusPago: selectStatusPago,
        tipoPagamentoQuant: selectTipoPagamentoQuant,
        tipoParcelamento: selectTipoParcelamento,
        quantidadeParcelas: selectTipoPagamentoQuant
          ? `1/${selectTipoPagamentoQuant}`
          : null,
        dataRegistro,
      });

      alert("Entrada registrada com sucesso!");
      router.push("/");

      console.log(dataRegistro);
    } catch (error) {
      throw error;
    }
  };

  const gerarNumeros = () => {
    return Array.from({ length: 1000 }, (_, i) => i + 1);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StatusBar backgroundColor="#F87171" />
      <View style={style.container}>
        <View style={style.header}>
          <Text style={style.headerTexto}>Adicionar Saida</Text>
          <TouchableOpacity onPress={() => router.push("/")}>
            <Ionicons
              name="arrow-back-circle-outline"
              size={35}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View style={style.content}>
          {/* -------------------- Valor -------------------- */}
          <View style={style.contentInputs}>
            <Text style={style.contentTitulo}>Valor</Text>
            <TextInput
              style={style.inputTexto}
              placeholder="R$ 0,00"
              keyboardType="numeric"
              value={valorReal}
              onChangeText={handleChange}
            />
          </View>

          {/* -------------------- Titulo -------------------- */}
          <View style={style.contentInputs}>
            <Text style={style.contentTitulo}>Titulo</Text>
            <TextInput
              style={style.inputTexto}
              placeholder="Titulo"
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          {/* -------------------- Categoria -------------------- */}
          <View style={style.contentInputs}>
            <Text style={style.contentTitulo}>Categoria</Text>
            <View style={style.selectList}>
              <Picker
                selectedValue={selectCategoria}
                onValueChange={(itemValue) => setSelectCategoria(itemValue)}
              >
                <Picker.Item
                  label="Selecinar"
                  value=""
                  style={style.selectCategoriaTexto}
                />
                {categorias.map((categorias, index) => (
                  <Picker.Item
                    key={index}
                    label={categorias}
                    value={categorias}
                    style={style.selectCategoriaTexto}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* -------------------- Data Vencimento -------------------- */}
          <View style={style.contentInputs}>
            <Text style={style.contentTitulo}>Data Vencimento</Text>
            <View style={style.selectDataRecebimento}>
              <TouchableOpacity
                style={[
                  style.selectButton,
                  selectDateVencimento === dayjs().format("YYYY-MM-DD") &&
                    style.selectButtonAtivo,
                ]}
                onPress={() => handleSelectDayVencimento("hoje")}
              >
                <Text
                  style={[
                    style.selectButtonText,
                    selectDateVencimento === dayjs().format("YYYY-MM-DD") &&
                      style.selectButtonTextAtivo,
                  ]}
                >
                  Hoje
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.selectButton,
                  selectDateVencimento ===
                    dayjs().subtract(1, "day").format("YYYY-MM-DD") &&
                    style.selectButtonAtivo,
                ]}
                onPress={() => handleSelectDayVencimento("ontem")}
              >
                <Text
                  style={[
                    style.selectButtonText,
                    selectDateVencimento ===
                      dayjs().subtract(1, "day").format("YYYY-MM-DD") &&
                      style.selectButtonTextAtivo,
                  ]}
                >
                  Ontem
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.selectButton}
                onPress={handleShowCalendarVencimento}
              >
                <Text style={style.selectButtonText}>
                  {calendarDateVencimento
                    ? dayjs(calendarDateVencimento).format("DD/MMMM/YYYY")
                    : "Selecione uma data"}
                </Text>
              </TouchableOpacity>
            </View>
            {showCalendarVencimento && (
              <Calendar
                headerStyle={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#2e2e2e",
                }}
                theme={{
                  todayTextColor: "#F87171",
                  selectedDayBackgroundColor: "#F87171",
                  selectedDayTextColor: "#ffffff",
                  calendarBackground: "transparent",
                }}
                onDayPress={handleDayPressVencimento}
                markedDates={
                  dayVencimento && {
                    [dayVencimento.dateString]: { selected: true },
                  }
                }
              />
            )}
          </View>

          {/* -------------------- Data Pagamento -------------------- */}
          <View style={style.contentInputs}>
            <Text style={style.contentTitulo}>Data Pagamento</Text>
            <View style={style.selectDataRecebimento}>
              <TouchableOpacity
                style={[
                  style.selectButton,
                  selectDatePagamento === dayjs().format("YYYY-MM-DD") &&
                    style.selectButtonAtivo,
                ]}
                onPress={() => handleSelectDayPagamento("hoje")}
              >
                <Text
                  style={[
                    style.selectButtonText,
                    selectDatePagamento === dayjs().format("YYYY-MM-DD") &&
                      style.selectButtonTextAtivo,
                  ]}
                >
                  Hoje
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.selectButton,
                  selectDatePagamento ===
                    dayjs().subtract(1, "day").format("YYYY-MM-DD") &&
                    style.selectButtonAtivo,
                ]}
                onPress={() => handleSelectDayPagamento("ontem")}
              >
                <Text
                  style={[
                    style.selectButtonText,
                    selectDatePagamento ===
                      dayjs().subtract(1, "day").format("YYYY-MM-DD") &&
                      style.selectButtonTextAtivo,
                  ]}
                >
                  Ontem
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.selectButton}
                onPress={handleShowCalendarPagamento}
              >
                <Text style={style.selectButtonText}>
                  {calendarDatePagamento
                    ? dayjs(calendarDatePagamento).format("DD/MMMM/YYYY")
                    : "Selecione uma data"}
                </Text>
              </TouchableOpacity>
            </View>
            {showCalendarPagamento && (
              <Calendar
                headerStyle={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#2e2e2e",
                }}
                theme={{
                  todayTextColor: "#F87171",
                  selectedDayBackgroundColor: "#F87171",
                  selectedDayTextColor: "#ffffff",
                  calendarBackground: "transparent",
                }}
                onDayPress={handleDayPressPagamento}
                markedDates={
                  dayPagamento && {
                    [dayPagamento.dateString]: { selected: true },
                  }
                }
              />
            )}
          </View>

          {/* -------------------- Status Pago -------------------- */}
          <View style={style.contentInputs}>
            <Text style={style.contentTitulo}>Status Pago</Text>
            <View style={style.statusPago}>
              <TouchableOpacity
                style={[
                  selectStatusPago === 1
                    ? style.selectButtonStatusPagoActive
                    : style.selectButtonStatusPago,
                ]}
                onPress={() => handleSelectStatusPago("pago")}
              >
                <Text
                  style={[
                    selectStatusPago === 1
                      ? style.selectButtonStatusTextoActive
                      : style.selectButtonStatusTexto,
                  ]}
                >
                  Pago
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  selectStatusPago === 0
                    ? style.selectButtonStatusNaoPagoActive
                    : style.selectButtonStatusNaoPago,
                ]}
                onPress={() => handleSelectStatusPago("naoPago")}
              >
                <Text
                  style={[
                    selectStatusPago === 0
                      ? style.selectButtonStatusTextoActive
                      : style.selectButtonStatusTexto,
                  ]}
                >
                  Não Pago
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* -------------------- Tipo Lançamento -------------------- */}
          <View style={style.contentInputs}>
            <Text style={style.contentTitulo}>Tipo de Lançamento</Text>
            <View style={style.contentTipoLancamento}>
              <TouchableOpacity
                style={[
                  style.selectButtonTipLancUni,
                  selectTipoPagamento === "Unico" &&
                    style.selectButtonTipLancUniAtivo,
                ]}
                onPress={() => handleSelectTipoPagamento("Unico")}
              >
                <Text
                  style={[
                    style.selectButtonTipoLancUniText,
                    selectTipoPagamento === "Unico" &&
                      style.selectButtonTipLancUniTextAtivo,
                  ]}
                >
                  Único
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.selectButtonTipLancParc,
                  selectTipoPagamento === "Parcelado" &&
                    style.selectButtonTipLancParcAtivo,
                ]}
                onPress={() => handleSelectTipoPagamento("Parcelado")}
              >
                <Text
                  style={[
                    style.selectButtonTipLancParcText,
                    selectTipoPagamento === "Parcelado" &&
                      style.selectButtonTipLancParcTextAtivo,
                  ]}
                >
                  Parcelado
                </Text>
              </TouchableOpacity>
            </View>
            {selectTipoPagamento === "Parcelado" && (
              <>
                <View style={style.contentInputs}>
                  <Text style={style.contentTitulo}>
                    Quantidade de Parcelas
                  </Text>
                  <View style={style.selectList}>
                    <Picker
                      selectedValue={selectTipoPagamentoQuant}
                      onValueChange={(itemValue) =>
                        setSelectTipoPagamentoQuant(itemValue)
                      }
                    >
                      <Picker.Item
                        label="Selecione"
                        value={null}
                        style={style.selectCategoriaTexto}
                      />
                      {gerarNumeros().map((num) => (
                        <Picker.Item
                          key={num}
                          label={String(num)}
                          value={num}
                          style={style.selectCategoriaTexto}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={style.contentInputs}>
                  <Text style={style.contentTitulo}>Tipo de Parcelamento</Text>
                  <View style={style.selectList}>
                    <Picker
                      selectedValue={selectTipoParcelamento}
                      onValueChange={(itemValue) =>
                        setSelectTipoParcelamento(itemValue)
                      }
                    >
                      <Picker.Item
                        label="Selecionar"
                        value={null}
                        style={style.selectCategoriaTexto}
                      />
                      <Picker.Item
                        label="Mensal"
                        value="Mensal"
                        style={style.selectCategoriaTexto}
                      />
                      <Picker.Item
                        label="Quinzenal"
                        value="Quinzenal"
                        style={style.selectCategoriaTexto}
                      />
                      <Picker.Item
                        label="Semanal"
                        value="Semanal"
                        style={style.selectCategoriaTexto}
                      />
                    </Picker>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>

        {/* -------------------- Adicionar -------------------- */}
        <TouchableOpacity style={style.botaoAdicionar} onPress={registrarSaida}>
          <Text style={style.botaoTexto}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
