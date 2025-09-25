import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDataBase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS entradas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      categoria TEXT NOT NULL,
      valor REAL NOT NULL,
      dataRecebimento TEXT NOT NULL,
      dataRegistro TEXT NOT NULL
    )
  `)

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS saidas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      categoria TEXT NOT NULL,
      valor REAL NOT NULL,
      dataVencimento TEXT NOT NULL,
      dataPagamento TEXT NOT NULL,
      statusPago INTEGER NOT NULL DEFAULT 0,
      tipoPagamento TEXT NOT NULL,
      tipoPagamentoQuant INTERGER NOT NULL,
      tipoParcelamento TEXT NOT NULL,
      dataRegistro TEXT NOT NULL
    )
  `)
}
