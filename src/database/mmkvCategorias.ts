import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export type Categoria = {
  id: number;
  titulo: string;
  nomeIcone: string;
};

const CATEGORIAS_PREDEFINIDAS: Omit<Categoria, "id">[] = [
  { titulo: "Alimentação", nomeIcone: "fastfood" },
  { titulo: "Assinaturas", nomeIcone: "cached" },
  { titulo: "Compras e lazer", nomeIcone: "shopping-bag" },
  { titulo: "Educação e desenvolvimento", nomeIcone: "school" },
  { titulo: "Emergências", nomeIcone: "crisis-alert" },
  { titulo: "Entretedimento digital", nomeIcone: "videogame-asset" },
  { titulo: "Hobbies e atividades de lazer", nomeIcone: "attractions" },
  { titulo: "Investimentos", nomeIcone: "trending-up" },
  { titulo: "Manutenção e reparos", nomeIcone: "construction" },
  { titulo: "Moradia", nomeIcone: "home" },
  { titulo: "Outros", nomeIcone: "category" },
  { titulo: "Renda", nomeIcone: "wallet" },
  { titulo: "Saúde e bem-estar", nomeIcone: "healing" },
  { titulo: "Seguros", nomeIcone: "shield" },
  { titulo: "Serviços financeiros e bancarios", nomeIcone: "account-balance" },
  { titulo: "Streaming", nomeIcone: "ondemand-video" },
  { titulo: "Transferencias e pagamentos", nomeIcone: "swap-horiz" },
  { titulo: "Transportes", nomeIcone: "directions-car" },
  { titulo: "Viagens", nomeIcone: "airplane-ticket" },
];

function getData<T>(key: string): T[] {
  const json = storage.getString(key);
  return json ? JSON.parse(json) : [];
}

function saveData<T>(key: string, data: T[]) {
  storage.set(key, JSON.stringify(data));
}

export function createCategoria(data: Omit<Categoria, "id">) {
  const categoria = getData<Categoria>("Categoria");

  const newItem: Categoria = {
    ...data,
    id: Date.now(),
  };

  categoria.push(newItem);
  saveData("Categoria", categoria);

  return newItem.id.toString();
}

export function getCategoria() {
  const categoria = getData<Categoria>("Categoria");

  if (categoria.length === 0) {
    const categoriasPredefinidas = CATEGORIAS_PREDEFINIDAS.map(
      (categoria, intex) => ({
        ...categoria,
        id: intex + 1,
      })
    );
    saveData("Categoria", categoriasPredefinidas);
    return categoriasPredefinidas;
  }

  return categoria;
}
