import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { style } from "./style";

import MesCarrossel from "@/src/components/MesCarrossel";
import ResumoFinanceiro from "@/src/components/ResumoFinanceiro";
import MeusCartoes from "@/src/components/MeusCartoes";
import MinhaMetas from "@/src/components/MinhasMetas";
import MeusLimites from "@/src/components/MeusLimites";
import BarraDeNavegacao from "../components/BarraDeNavegacao";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

import { getResumoPorMes } from "../database/mmkvFinancas";

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

  async function carregarResumo(date: Date) {
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    const mesAnoAtual = `${mes}-${ano}`;

    const data = getResumoPorMes(mesAnoAtual);
    setResumo(data);
  }

  useEffect(() => {
    carregarResumo(currentDate);
  }, [currentDate]);
  // console.log(resumo)

  return (
    <View style={style.main}>
      <View style={style.header}>
        <View style={style.containerTopBar}>
          <TouchableOpacity style={style.botao}>
            <FontAwesome name="bell" size={26} color="#1F2937" />
          </TouchableOpacity>
          <View>
            <MesCarrossel
              currentDate={currentDate}
              onChangeMonth={setCurrentDate}
              textColorPrimary="#1C1C1C"
              textColorSecundary="#6E6E7A"
            />
          </View>
          <TouchableOpacity style={style.botao}>
            <Feather name="menu" size={26} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </View>

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

      <BarraDeNavegacao />
    </View>
  );
}
