import { MMKV } from "react-native-mmkv";
import dayjs from "dayjs";

export const storage = new MMKV();

export type Entradas = {
  id: number;
  titulo: string;
  categoria: string;
  valor: number;
  dataRecebimento: string;
  dataRegistro: string;
};

export type Saidas = {
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
};

function getData<T>(key: string): T[] {
  const json = storage.getString(key);
  return json ? JSON.parse(json) : [];
}

function saveData<T>(key: string, data: T[]) {
  storage.set(key, JSON.stringify(data));
}

// ======================= Entrada =======================
export function createEntredas(data: Omit<Entradas, "id">) {
  const entradas = getData<Entradas>("Entradas");

  const newItem: Entradas = {
    ...data,
    id: Date.now(),
  };

  entradas.push(newItem);
  saveData("Entradas", entradas);

  return newItem.id.toString();
}

export function getEntradasPorMes(mesAno: string) {
  const entradas = getData<Entradas>("Entradas");

  return entradas.filter((e) => {
    const [ano, mes] = e.dataRecebimento.split("-");
    const dataFormatada = `${mes}-${ano}`;
    return dataFormatada === mesAno;
  });
}

// ======================= Saidas =======================
export function createSaidas(data: Omit<Saidas, "id">) {
  const saidas = getData<Saidas>("Saidas");

  const newItem: Saidas = {
    ...data,
    id: Date.now(),
  };

  saidas.push(newItem);
  saveData("Saidas", saidas);

  return newItem.id.toString();
}

export function createSaidasParceladas(data: Omit<Saidas, "id">) {
  if (
    data.tipoPagamento !== "Parcelado" ||
    !data.tipoPagamentoQuant ||
    !data.tipoParcelamento
  ) {
    return createSaidas(data);
  }

  const parcelasCriadas: string[] = [];
  const dataBase = dayjs(data.dataVencimento);

  for (let i = 0; i < data.tipoPagamentoQuant; i++) {
    let novaData = dataBase;

    if (i > 0) {
      if (data.tipoParcelamento === "Mensal")
        novaData = dataBase.add(i, "month");
      if (data.tipoParcelamento === "Quinzenal")
        novaData = dataBase.add(i * 15, "day");
      if (data.tipoParcelamento === "Semanal")
        novaData = dataBase.add(i * 7, "day");
    }

    const parcelaStatus = i === 0 ? data.statusPago : 0;
    const parcelaPagamento = i === 0 ? data.tipoPagamento : null;

    const parcela: Omit<Saidas, "id"> = {
      ...data,
      quantidadeParcelas: `${i + 1}/${data.tipoPagamentoQuant}`,
      dataVencimento: novaData.format("YYYY-MM-DD"),
      dataRegistro: novaData.format("YYYY-MM-DD"),
      statusPago: parcelaStatus,
      dataPagamento: parcelaPagamento,
    };

    const id = createSaidas(parcela);
    parcelasCriadas.push(id);
  }

  return parcelasCriadas;
}

export function getSaidasPorMes(mesAno: string) {
  const saidas = getData<Saidas>("Saidas");

  return saidas.filter((s) => {
    const [ano, mes] = s.dataVencimento.split("-");
    const dataFormatada = `${mes}-${ano}`;
    return dataFormatada === mesAno;
  });
}

// ======================= Resumo Financeiro =======================
export function getResumoPorMes(mesAno: string) {
  const entradas = getEntradasPorMes(mesAno);
  const saidas = getSaidasPorMes(mesAno);

  const totalEntradas = entradas.reduce((acc, e) => acc + e.valor, 0);
  const totalPagas = saidas
    .filter((s) => s.statusPago === 1)
    .reduce((acc, s) => acc + s.valor, 0);
  const totalAPagar = saidas
    .filter((s) => s.statusPago === 0)
    .reduce((acc, s) => acc + s.valor, 0);

  return {
    totalEntradas,
    totalSaidas: totalPagas + totalAPagar,
    totalPagas,
    totalAPagar,
    saldo: totalEntradas - (totalAPagar + totalPagas),
  };
}
