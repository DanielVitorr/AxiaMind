import {
  Animated,
  PanResponder,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import { style } from "./style";
import Feather from "@expo/vector-icons/Feather";
import BarraDeNavegacao from "@/src/components/BarraDeNavegacao";
import MesCarrossel from "@/src/components/MesCarrossel";
import {
  getEntradasPorMes,
  getSaidasPorMes,
} from "@/src/database/mmkvFinancas";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Checkbox from "@/src/components/Checkbox";
import PeriodoSelect from "@/src/components/PeriodoSelect";

dayjs.locale("pt-br");

interface Entradas {
  id: number;
  titulo: string;
  categoria: string;
  valor: number;
  dataRecebimento: string;
  dataRegistro: string;
}

interface Saidas {
  id: number;
  titulo: string;
  categoria: string;
  valor: number;
  dataVencimento: string;
  dataPagamento: string | null;
  statusPago: number | null;
  tipoPagamento: string | null;
  tipoPagamentoQuant: number | null;
  tipoParcelamento: string | null;
  quantidadeParcelas: string | null;
  dataRegistro: string;
}

export default function ListaRegistro() {
  const router = useRouter();
  const [checked, setChecked] = useState({});
  const optionsCategoria = [
    {
      id: 1,
      titulo: "renda",
    },
    {
      id: 2,
      titulo: "alimentação",
    },
    {
      id: 3,
      titulo: "transporte",
    },
  ];
  const [showCategoria, setShowCategoria] = useState(false);
  const [showPeriodo, setShowPeriodo] = useState(false);
  const [periodo, setPeriodo] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  const [currentDate, setCurrentData] = useState(new Date());
  const [resumoEntradas, setResumoEntradas] = useState<Entradas[]>([]);
  const [resumoSaidas, setResumoSaidas] = useState<Saidas[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTipoRegistro, setFilterTipoRegistro] = useState("all");

  // ---------------------- Animação Filtro ----------------------
  const translateY = useRef(new Animated.Value(900)).current;
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
      toValue: 900,
      useNativeDriver: true,
    }).start();
  }

  // ---------------------- Funções do Filtro ----------------------
  const handleFilterStatus = (option: "all" | "pago" | "naoPago") => {
    if (option === "all") {
      setFilterStatus("all");
    } else if (option === "pago") {
      setFilterStatus("pago");
    } else if (option === "naoPago") {
      setFilterStatus("naoPago");
    }
  };

  const handleFilterTipoRegistro = (
    option: "all" | "receitas" | "despesas"
  ) => {
    if (option === "all") {
      setFilterTipoRegistro("all");
    } else if (option === "receitas") {
      setFilterTipoRegistro("receitas");
    } else if (option === "despesas") {
      setFilterTipoRegistro("despesas");
    }
  };

  const handleShowCategoria = () => setShowCategoria((prev) => !prev);

  const limparFiltro = () => {
    setFilterStatus("all");
    setFilterTipoRegistro("all");
    setChecked({});
    setPeriodo({});
  };

  // console.log(periodo);

  // ---------------------- Get Resumo ----------------------
  function carregarResumo(date: Date) {
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    const mesAnoAtual = `${mes}-${ano}`;

    const dataEntradas = getEntradasPorMes(mesAnoAtual);

    const dataSaidas = getSaidasPorMes(mesAnoAtual).filter((saida) => {
      const data = new Date(saida.dataVencimento);
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      const mesAno = `${mes}-${ano}`;
      return mesAno === mesAnoAtual;
    });

    setResumoEntradas(dataEntradas);
    setResumoSaidas(dataSaidas);
  }

  function formatarValor(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatarDataPorExtenso(data: string) {
    return dayjs(data).format("D [de] MMMM [de] YYYY");
  }

  function agruparPorData<T extends { dataRegistro: string }>(itens: T[]) {
    const grupos: Record<string, T[]> = {};
    itens.forEach((item) => {
      const data = item.dataRegistro;
      if (!grupos[data]) grupos[data] = [];
      grupos[data].push(item);
    });
    return grupos;
  }

  useEffect(() => {
    carregarResumo(currentDate);
  }, [currentDate]);

  return (
    <View style={style.main}>
      <View style={style.header}>
        <View style={style.headerTitulo}>
          <Text style={style.headerTexto}>Fluxo de caixa</Text>
          <TouchableOpacity onPress={abrir}>
            <Feather name="filter" size={25} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <View style={style.headerFiltro}>
          <MesCarrossel
            currentDate={currentDate}
            onChangeMonth={setCurrentData}
            textColorPrimary="#ffffff"
            textColorSecundary="#ececec"
          />
        </View>
      </View>

      <Animated.View
        style={[style.bottomSheet, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={{ alignItems: "center" }}>
          <View style={style.handle} />
        </View>
        <View style={style.headerFilter}>
          <Text style={style.headerTitle}>Filtro de Transações</Text>
          <TouchableOpacity style={style.headerbutton} onPress={limparFiltro}>
            <Text style={{ color: "white" }}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 20 }}>
          {/* -------------------- Filtro Status -------------------- */}
          <View style={{ gap: 10 }}>
            <Text style={style.contentTitle}>Status</Text>
            <View style={style.contentButtons}>
              <TouchableOpacity
                style={[
                  filterStatus === "all"
                    ? style.contentButtonAtivo
                    : style.contentButton,
                ]}
                onPress={() => handleFilterStatus("all")}
              >
                <Text
                  style={[
                    filterStatus === "all"
                      ? style.contentButtonText
                      : style.contentButtonTextAtivo,
                  ]}
                >
                  Todos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  filterStatus === "pago"
                    ? style.contentButtonAtivo
                    : style.contentButton,
                ]}
                onPress={() => handleFilterStatus("pago")}
              >
                <Text
                  style={[
                    filterStatus === "pago"
                      ? style.contentButtonText
                      : style.contentButtonTextAtivo,
                  ]}
                >
                  Pago
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  filterStatus === "naoPago"
                    ? style.contentButtonAtivo
                    : style.contentButton,
                ]}
                onPress={() => handleFilterStatus("naoPago")}
              >
                <Text
                  style={[
                    filterStatus === "naoPago"
                      ? style.contentButtonText
                      : style.contentButtonTextAtivo,
                  ]}
                >
                  Não Pago
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* -------------------- Filtro Tipo Registro -------------------- */}
          <View style={{ gap: 10 }}>
            <Text style={style.contentTitle}>Tipo Registro</Text>
            <View style={style.contentButtons}>
              <TouchableOpacity
                style={[
                  filterTipoRegistro === "all"
                    ? style.contentButtonAtivo
                    : style.contentButton,
                ]}
                onPress={() => handleFilterTipoRegistro("all")}
              >
                <Text
                  style={[
                    filterTipoRegistro === "all"
                      ? style.contentButtonText
                      : style.contentButtonTextAtivo,
                  ]}
                >
                  Todos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  filterTipoRegistro === "receitas"
                    ? style.contentButtonAtivo
                    : style.contentButton,
                ]}
                onPress={() => handleFilterTipoRegistro("receitas")}
              >
                <Text
                  style={[
                    filterTipoRegistro === "receitas"
                      ? style.contentButtonText
                      : style.contentButtonTextAtivo,
                  ]}
                >
                  Receitas
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  filterTipoRegistro === "despesas"
                    ? style.contentButtonAtivo
                    : style.contentButton,
                ]}
                onPress={() => handleFilterTipoRegistro("despesas")}
              >
                <Text
                  style={[
                    filterTipoRegistro === "despesas"
                      ? style.contentButtonText
                      : style.contentButtonTextAtivo,
                  ]}
                >
                  Despesas
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* -------------------- Filtro Categoria -------------------- */}
          <View style={{ gap: 10 }}>
            <Text style={style.contentTitle}>Categoria</Text>
            <TouchableOpacity
              style={style.contentSelect}
              onPress={handleShowCategoria}
            >
              <Text>Selecionar</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="black" />
            </TouchableOpacity>

            {showCategoria && (
              <View
                style={{
                  backgroundColor: "#fafafa",
                  borderRadius: 8,
                  padding: 10,
                }}
              >
                <Checkbox
                  options={optionsCategoria}
                  onChange={(op) => setChecked(op)}
                />
              </View>
            )}
          </View>

          {/* -------------------- Filtro Período -------------------- */}
          <PeriodoSelect
            showPeriodo={showPeriodo}
            handleShowPeriodo={() => setShowPeriodo(!showPeriodo)}
            periodo={periodo}
            setPeriodo={setPeriodo}
          />

          <TouchableOpacity style={style.contentButtonAplicar}>
            <Text style={style.contentButtonAplicarText}>Aplicar Filtro</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* -------------------- Container de lista -------------------- */}
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 45 }}
          >
            <View style={style.content}>
              {(() => {
                const todos = [...resumoEntradas, ...resumoSaidas].sort(
                  (a, b) =>
                    new Date(b.dataRegistro).getTime() -
                    new Date(a.dataRegistro).getTime()
                );

                const agrupar = agruparPorData(todos);

                return Object.entries(agrupar).map(([data, registros]) => (
                  <View key={data} style={{ marginBottom: 20, gap: 10 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#333",
                        marginBottom: 8,
                      }}
                    >
                      {formatarDataPorExtenso(data)}
                    </Text>

                    {registros.map((item) => (
                      <TouchableOpacity key={item.id} style={style.card}>
                        <View style={style.cardTitulos}>
                          <View>
                            <Text>Icone</Text>
                          </View>
                          <View>
                            <View style={{ flexDirection: "row" }}>
                              <Text style={style.cardTituloTexto}>
                                {item.titulo}
                              </Text>

                              {/* Só mostra statusPago se for uma Saída */}
                              {"statusPago" in item && (
                                <Text
                                  style={[
                                    item.statusPago === 1
                                      ? { color: "#10B981", fontWeight: "bold" }
                                      : {
                                          color: "#F87171",
                                          fontWeight: "bold",
                                        },
                                  ]}
                                >
                                  {" - " +
                                    (item.statusPago === 1
                                      ? "Pago"
                                      : "Não Pago")}
                                </Text>
                              )}
                            </View>

                            <Text style={style.cardTituloCategoria}>
                              {item.categoria}
                            </Text>
                          </View>
                        </View>

                        <View style={{ alignItems: "flex-end" }}>
                          <Text
                            style={
                              "statusPago" in item
                                ? style.cardSaidaValor
                                : style.cardEntradaValor
                            }
                          >
                            {formatarValor(item.valor)}
                          </Text>

                          {/* Só exibe "Efetuar Pagamento" se for saída e não estiver paga */}
                          {"statusPago" in item && item.statusPago === 0 ? (
                            <TouchableOpacity>
                              <Text>Efetuar Pagamento</Text>
                            </TouchableOpacity>
                          ) : (
                            <Text>
                              {"tipoParcelamento" in item &&
                                item.tipoParcelamento}
                              {"quantidadeParcelas" in item &&
                                item.quantidadeParcelas}
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ));
              })()}
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
      <BarraDeNavegacao />
    </View>
  );
}
