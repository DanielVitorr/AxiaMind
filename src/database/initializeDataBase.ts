import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDataBase(database: SQLiteDatabase) {
  // --------------------- usado para resetar as tabelas quando inicializar -----------------------
  // await database.execAsync(`DROP TABLE IF EXISTS entradas;`);
  // await database.execAsync(`DROP TABLE IF EXISTS saidas;`);

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS entradas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      categoria TEXT NOT NULL,
      valor REAL NOT NULL,
      dataRecebimento TEXT NOT NULL,
      dataRegistro TEXT NOT NULL
    );
  `)

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS saidas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      categoria TEXT NOT NULL,
      valor REAL NOT NULL,
      dataVencimento TEXT NOT NULL,
      dataPagamento TEXT NOT NULL,
      statusPago INTEGER NOT NULL DEFAULT 0, -- 0 = A pagar | 1 = Pago
      tipoPagamento TEXT NOT NULL,
      dataRegistro TEXT NOT NULL
    );
  `)
}