import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export type Categoria = {
  id: number;
  titulo: string;
  nomeIcone: string;
  corIcone: string;
};

const CATEGORIAS_PREDEFINIDAS: Omit<Categoria, "id">[] = [
  { titulo: "Alimentação", nomeIcone: "fastfood", corIcone: "#ff6347" },
  { titulo: "Assinaturas", nomeIcone: "cached", corIcone: "#1e90ff" },
  { titulo: "Compras e lazer", nomeIcone: "shopping-bag", corIcone: "#ff69b4" },
  {
    titulo: "Educação e desenvolvimento",
    nomeIcone: "school",
    corIcone: "#32cd32",
  },
  { titulo: "Emergências", nomeIcone: "crisis-alert", corIcone: "#ff4500" },
  {
    titulo: "Entretedimento digital",
    nomeIcone: "videogame-asset",
    corIcone: "#8a2be2",
  },
  {
    titulo: "Hobbies e atividades de lazer",
    nomeIcone: "attractions",
    corIcone: "#ff8c00",
  },
  { titulo: "Investimentos", nomeIcone: "trending-up", corIcone: "#20b2aa" },
  {
    titulo: "Manutenção e reparos",
    nomeIcone: "construction",
    corIcone: "#a0522d",
  },
  { titulo: "Moradia", nomeIcone: "home", corIcone: "#ffdead" },
  { titulo: "Outros", nomeIcone: "category", corIcone: "#808080" },
  { titulo: "Renda", nomeIcone: "wallet", corIcone: "#32cd32" },
  { titulo: "Saúde e bem-estar", nomeIcone: "healing", corIcone: "#ff1493" },
  { titulo: "Seguros", nomeIcone: "shield", corIcone: "#4682b4" },
  {
    titulo: "Serviços financeiros e bancarios",
    nomeIcone: "account-balance",
    corIcone: "#daa520",
  },
  { titulo: "Streaming", nomeIcone: "ondemand-video", corIcone: "#ff4500" },
  {
    titulo: "Transferencias e pagamentos",
    nomeIcone: "swap-horiz",
    corIcone: "#ff69b4",
  },
  { titulo: "Transportes", nomeIcone: "directions-car", corIcone: "#1e90ff" },
  { titulo: "Viagens", nomeIcone: "airplane-ticket", corIcone: "#20b2aa" },
];

// Apenas para forçar a atualização das categorias predefinidas (para testes)
const FORCE_UPDATE_CATEGORIAS = false;

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

  if (categoria.length === 0 || FORCE_UPDATE_CATEGORIAS) {
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
