import { useSQLiteContext } from "expo-sqlite"

export type Entradas = {
  id: number
  titulo: string
  categoria: string
  valor: number
  dataRecebimento: string
  dataRegistro: string
}

export type Saidas = {
  id: number
  titulo: string
  categoria: string
  valor: number
  dataVencimento: string
  dataPagamento: string
  statusPago: number | null
  tipoPagamento: string | null
  tipoPagamentoQuant: number | null
  tipoParcelamento: string | null
  dataRegistro: string
}

export default function useFinancasDataBase() {
  const database = useSQLiteContext()

  function formatDateToSQLite(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // ======================= Entrada =======================
  async function createEntradas(data: Omit<Entradas, 'id'>) {
    const statement = await database.prepareAsync(
      `INSERT INTO entradas (titulo, categoria, valor, dataRecebimento, dataRegistro) 
       VALUES ($titulo, $categoria, $valor, $dataRecebimento, $dataRegistro)`
    )

    try {
      const result = await statement.executeAsync({
        $titulo: data.titulo,
        $categoria: data.categoria,
        $valor: data.valor,
        $dataRecebimento: data.dataRecebimento,
        $dataRegistro: data.dataRegistro
      })

      return result.lastInsertRowId.toLocaleString()
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function getEntradasPorMes(mesAno: string) {
    try {
      const quary = "SELECT * FROM entradas WHERE strftime('%m-%Y', dataRecebimento) = $mesAno"

      return await database.getAllAsync<Entradas>(quary, { $mesAno: mesAno })
    } catch (error) {
      throw error
    }
  }



  // ======================= Saidas =======================
  async function createSaidas(data: Omit<Saidas, 'id'>) {
    const statement = await database.prepareAsync(
      `INSERT INTO saidas (titulo, categoria, valor, dataVencimento, dataPagamento, statusPago, tipoPagamento, tipoPagamentoQuant, tipoParcelamento, dataRegistro)
       VALUES ($titulo, $categoria, $valor, $dataVencimento, $dataPagamento, $statusPago, $tipoPagamento, $tipoPagamentoQuant, $tipoParcelamento, $dataRegistro)`
    )

    try {
      const result = await statement.executeAsync({
        $titulo: data.titulo,
        $categoria: data.categoria,
        $valor: data.valor,
        $dataVencimento: data.dataVencimento,
        $dataPagamento: data.dataPagamento,
        $statusPago: data.statusPago ? 1 : 0,
        $tipoPagamento: data.tipoPagamento,
        $tipoPagamentoQuant: data.tipoPagamentoQuant,
        $tipoParcelamento: data.tipoParcelamento,
        $dataRegistro: data.dataRegistro
      })

      return result.lastInsertRowId.toLocaleString()
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function getSaidasPorMes(mesAno: string) {
    const query = `
      SELECT * FROM saidas
      WHERE strftime('%m-%Y', dataVencimento) = $mesAno
    `

    return await database.getAllAsync<Saidas>(query, { $mesAno: mesAno })
  }



  // ======================= Resumo Financeiro =======================
  async function getResumoPorMes(mesAno: string) {
    const queryEntradas = `
      SELECT SUM(valor) as totalEntradas
      FROM entradas
      WHERE strftime('%m-%Y', dataRecebimento) = $mesAno
    `

    const querySaidas = `
      SELECT
        SUM(CASE WHEN statusPago = 1 THEN valor ELSE 0 END) as totalPagas,
        SUM(CASE WHEN statusPago = 0 THEN valor ELSE 0 END) as tatalAPagar
      FROM saidas
      WHERE strftime('%m-%Y', dataVencimento) = $mesAno
    `

    const entradas = await database.getFirstAsync<{ totalEntradas: number | null }>(queryEntradas, { $mesAno: mesAno })
    const saidas = await database.getFirstAsync<{ totalPagas: number | null, totalAPagar: number | null }>(querySaidas, { $mesAno: mesAno })

    return {
      totalEntradas: entradas?.totalEntradas ?? 0,
      totalSaidas: ((saidas?.totalAPagar ?? 0) + (saidas?.totalPagas ?? 0)),
      totalPagas: saidas?.totalPagas ?? 0,
      totalAPagar: saidas?.totalAPagar ?? 0,
      saldo: (entradas?.totalEntradas ?? 0) - ((saidas?.totalAPagar ?? 0) + (saidas?.totalPagas ?? 0))
    }
  }

  return { createEntradas, getEntradasPorMes, createSaidas, getSaidasPorMes, getResumoPorMes }
}