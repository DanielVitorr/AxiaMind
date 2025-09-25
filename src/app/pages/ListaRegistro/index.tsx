import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { useEffect, useState } from "react";

import useFinancasDataBase from "@/src/database/useFinancasDataBase";

import Feather from '@expo/vector-icons/Feather';
import BarraDeNavegacao from "@/src/components/BarraDeNavegacao";
import MesCarrossel from "@/src/components/MesCarrossel";

interface Entradas {
  nome: string
  categoria: string
  valor: number
  dataRecebimento: string
}

interface Saidas {
  nome: string
  categoria: string
  valor: number
  dataVencimento: string
  dataPagamento: string
  statusPago: boolean
  tipoPagamento: string
}

export default function ListaRegistro() {
  const financasDatabase = useFinancasDataBase()
  const [currentDate, setCurrentData] = useState(new Date())
  const [resumoEntradas, setResumoEntradas] = useState<Entradas[]>([])
  const [resumoSaidas, setResumoSaidas] = useState<Saidas[]>([])

  async function carregarResumo(date: Date) {
    const mes = String(date.getMonth() + 1).padStart(2, '0')
    const ano = date.getFullYear()
    const mesAnoAtual = `${mes}-${ano}`

    const dataEntradas = await financasDatabase.getEntradasPorMes(mesAnoAtual)
    const dataSaidas = await financasDatabase.getSaidasPorMes(mesAnoAtual)

    setResumoEntradas(dataEntradas)
    setResumoSaidas(dataSaidas)
  }

  useEffect(() => {
    carregarResumo(currentDate)
  }, [currentDate])

  return (
    <View style={style.main}>
      <View style={style.header}>
        <View style={style.headerTitulo}>
          <Text style={style.headerTexto}>Fluxo de caixa</Text>
          <TouchableOpacity>
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
      <View style={style.content}>
        {/* Entradas */}
        {resumoEntradas
          .filter((entrada) => {
            const data = new Date(entrada.dataRecebimento)
            return (
              data.getMonth() === currentDate.getMonth() &&
              data.getFullYear() === currentDate.getFullYear()
            )
          })
          .map((entrada, index) => (
            <Text key={`entrada-${index}`}>
              {entrada.nome} - R$ {entrada.valor.toFixed(2)}
            </Text>
          ))}

        {/* Saídas */}
        {resumoSaidas
          .filter((saida) => {
            // pega a data de pagamento se existir, senão usa vencimento
            const data = new Date(saida.dataPagamento || saida.dataVencimento)
            return (
              data.getMonth() === currentDate.getMonth() &&
              data.getFullYear() === currentDate.getFullYear()
            )
          })
          .map((saida, index) => (
            <Text key={`saida-${index}`}>
              {saida.nome} - R$ {saida.valor.toFixed(2)} - {saida.statusPago ? "Pago" : "Em aberto"}
            </Text>
          ))}
      </View>

      <BarraDeNavegacao />
    </View>
  )
}