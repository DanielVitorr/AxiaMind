import { useEffect, useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { Main, Button, Header, Content } from "./style";

import MesCarrossel from "@/src/components/Inputs/MesCarrossel";
import ResumoFinanceiro from "@/src/components/Cards/ResumoFinanceiro";
import MeusCartoes from "@/src/components/Cards/MeusCartoes";
import MinhaMetas from "@/src/components/Cards/MinhasMetas";
import MeusLimites from "@/src/components/Cards/MeusLimites";
import BarraDeNavegacao from "../components/BarraDeNavegacao";

import Feather from "@expo/vector-icons/Feather";

import { getResumoPorMes, storage } from "../database/mmkvFinancas";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "../contexts/ThemeContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [resumo, setResumo] = useState<{
    totalEntradas: number;
    totalSaidas: number;
    saldo: number;
    totalAPagar: number;
    totalPagas: number;
  }>({
    totalEntradas: 0,
    totalSaidas: 0,
    saldo: 0,
    totalAPagar: 0,
    totalPagas: 0,
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  const { theme, themeName, toggleTheme } = useAppTheme();

  async function carregarResumo(date: Date) {
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    const mesAnoAtual = `${mes}-${ano}`;

    const data = getResumoPorMes(mesAnoAtual);
    setResumo(data);
  }

  useEffect(() => {
    carregarResumo(currentDate);
  }, [storage, currentDate]);

  return (
    <Main>
      <Header>
        <Button>
          <MaterialIcons
            name="notifications"
            size={30}
            color={theme.colors.accent}
          />
        </Button>

        <Button>
          <Feather name="menu" size={30} color={theme.colors.accent} />
        </Button>
      </Header>

      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
          >
            <MesCarrossel
              currentDate={currentDate}
              onChangeMonth={setCurrentDate}
            />

            <Content>
              <ResumoFinanceiro
                totalReceitas={resumo.totalEntradas}
                totalDespesas={resumo.totalSaidas}
                saldo={resumo.saldo}
                totalAPagar={resumo.totalAPagar}
                totalPago={resumo.totalPagas}
              />

              <MeusCartoes />
              <MinhaMetas />
              <MeusLimites />
            </Content>

            <TouchableOpacity
              onPress={() => {
                storage.clearAll();
                alert("Todos os registros foram apagados!");
                console.log(storage.getAllKeys());
              }}
            >
              <Text style={{ color: theme.colors.text }}>
                Limpar Registros MMKV
              </Text>
            </TouchableOpacity>

            <Button>
              <Switch
                value={themeName === "light"}
                onValueChange={toggleTheme}
                thumbColor={themeName === "dark" ? "#f1f1f1" : "#121212"}
              />
            </Button>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>

      <BarraDeNavegacao />
    </Main>
  );
}
