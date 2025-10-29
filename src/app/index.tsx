import { useEffect, useState } from "react";
import { Alert, Switch, Text, TouchableOpacity, View } from "react-native";
import Main, { style } from "./style";

import MesCarrossel from "@/src/components/MesCarrossel";
import ResumoFinanceiro from "@/src/components/ResumoFinanceiro";
import MeusCartoes from "@/src/components/MeusCartoes";
import MinhaMetas from "@/src/components/MinhasMetas";
import MeusLimites from "@/src/components/MeusLimites";
import BarraDeNavegacao from "../components/BarraDeNavegacao";

import Feather from "@expo/vector-icons/Feather";

import { getResumoPorMes, storage } from "../database/mmkvFinancas";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "../contexts/ThemeContext";

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

  const { theme, toggleTheme } = useAppTheme();

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
      <Main.Header>
        <Main.Header.Button>
          <MaterialIcons name="notifications" size={26} color="#1F2937" />
        </Main.Header.Button>
        <View>
          <MesCarrossel
            currentDate={currentDate}
            onChangeMonth={setCurrentDate}
            textColorPrimary="#1C1C1C"
            textColorSecundary="#6E6E7A"
          />
        </View>
        <Main.Header.Button>
          <Feather name="menu" size={26} color="#1F2937" />
        </Main.Header.Button>
        <Main.Header.Button>
          <Switch
            value={theme === "light"}
            onValueChange={toggleTheme}
            thumbColor={theme === "dark" ? "#f1f1f1" : "#121212"}
          />
        </Main.Header.Button>
      </Main.Header>

      <View style={style.content}>
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
      </View>

      <TouchableOpacity
        onPress={() => {
          storage.clearAll();
          alert("Todos os registros foram apagados!");
          console.log(storage.getAllKeys());
        }}
      >
        <Text>Limpar Registros MMKV</Text>
      </TouchableOpacity>

      <BarraDeNavegacao />
    </Main>
  );
}
