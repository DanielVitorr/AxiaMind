import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import { createCategoria, getCategoria } from "../database/mmkvCategorias";

const CORES_PREDEFINIDAS = [
  { cor: "#E74C3C", nome: "Vermelho Vibrante" },
  { cor: "#3498DB", nome: "Azul Forte" },
  { cor: "#2ECC71", nome: "Verde Esmeralda" },
  { cor: "#F39C12", nome: "Laranja" },
  { cor: "#9B59B6", nome: "Roxo" },
  { cor: "#1ABC9C", nome: "Verde Água" },
  { cor: "#34495E", nome: "Azul Petróleo" },
  { cor: "#E67E22", nome: "Laranja Queimado" },
  { cor: "#27AE60", nome: "Verde Floresta" },
  { cor: "#2980B9", nome: "Azul Oceano" },
  { cor: "#8E44AD", nome: "Violeta" },
  { cor: "#16A085", nome: "Verde Oceano" },
  { cor: "#C0392B", nome: "Vermelho Escuro" },
  { cor: "#D35400", nome: "Laranja Escuro" },
  { cor: "#7D3C98", nome: "Roxo Uva" },
  { cor: "#2C3E50", nome: "Azul Aço" },
  { cor: "#F1C40F", nome: "Amarelo Ouro" },
  { cor: "#E84393", nome: "Rosa Vibrante" },
  { cor: "#00CEC9", nome: "Turquesa" },
  { cor: "#FD79A8", nome: "Rosa Claro" },
  { cor: "#6C5CE7", nome: "Roxo Azulado" },
  { cor: "#00B894", nome: "Verde Menta" },
  { cor: "#E17055", nome: "Coral" },
  { cor: "#0984E3", nome: "Azul Elétrico" },
  { cor: "#A29BFE", nome: "Lavanda" },
  { cor: "#55EFC4", nome: "Verde Água Claro" },
  { cor: "#FF7675", nome: "Rosa Salmão" },
  { cor: "#74B9FF", nome: "Azul Céu" },
  { cor: "#FFEAA7", nome: "Amarelo Claro" },
  { cor: "#D63031", nome: "Vermelho Vinho" },
  { cor: "#00B4D8", nome: "Azul Ciano" },
  { cor: "#FF9FF3", nome: "Rosa Choque" },
  { cor: "#FDCB6E", nome: "Amarelo Mostarda" },
  { cor: "#6A89CC", nome: "Azul Suave" },
];

const materialIconsGlyphMap = MaterialIcons.getRawGlyphMap();
const ALL_MATERIAL_ICONS = Object.keys(materialIconsGlyphMap);

export default function PickerCostumizado() {
  const [selected, setSelected] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalNovaCategoria, setModalNovaCategoria] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorNome, setSelectedColorNome] = useState("");
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [nomeIcone, setNomeIcone] = useState("");

  const categorias = getCategoria();

  // @ts-ignore
  const handleColorSelect = (color) => {
    setSelectedColor(color.cor);
    setSelectedColorNome(color.nome);
  };

  const handleCriarCategoria = () => {
    if (!nomeCategoria || !selectedColor || !nomeIcone) {
      alert("Por favor, preencha o nome da categoria e selecione uma cor.");
      return;
    }

    createCategoria({
      titulo: nomeCategoria,
      nomeIcone: nomeIcone,
      corIcone: selectedColor,
    });

    setNomeCategoria("");
    setSelectedColor("");
    setModalNovaCategoria(false);
  };

  // @ts-ignore
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: "#f0f0f0",
        }}
        onPress={() => {
          setSelected(item);
          setModalVisible(false);
        }}
      >
        <View
          style={{
            padding: 10,
            borderRadius: 50,
            backgroundColor: item.corIcone || "#3498DB",
          }}
        >
          <MaterialIcons name={item.nomeIcone} size={25} color="#fff" />
        </View>
        <Text style={{ marginLeft: 10, fontSize: 18 }}>{item.titulo}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 15,
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 8,
          backgroundColor: "#fff",
        }}
        onPress={() => setModalVisible(true)}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", height: 35 }}
        >
          {selected ? (
            <>
              <View
                style={{
                  padding: 8,
                  borderRadius: 50,
                  /* @ts-ignore */
                  backgroundColor: selected.corIcone,
                }}
              >
                <MaterialIcons
                  /* @ts-ignore */
                  name={selected.nomeIcone}
                  size={16}
                  color="#fff"
                />
              </View>
              <Text style={{ marginLeft: 10, fontSize: 16 }}>
                {/* @ts-ignore */}
                {selected.titulo}
              </Text>
            </>
          ) : (
            <Text style={{ color: "#999", fontSize: 16 }}>
              Selectione uma categoria
            </Text>
          )}
        </View>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "70%",
            }}
          >
            <View
              style={{
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#f0f0f0",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Selectione a categoria
              </Text>
            </View>
            <FlatList
              data={categorias}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#d2d2d2d2",
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}
              onPress={() => setModalNovaCategoria(true)}
            >
              <View
                style={{
                  padding: 10,
                  borderRadius: 50,
                  backgroundColor: "#26cc2eff",
                }}
              >
                <MaterialIcons name="add" size={24} color="white" />
              </View>
              <Text style={{ fontSize: 18 }}>Adiconar nova categoria</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 15,
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: "#f0f0f0",
                marginBottom: 20,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalNovaCategoria}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalNovaCategoria(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingBottom: 30,
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold", padding: 20 }}>
                Nova Categoria
              </Text>
            </View>
            <View style={{ paddingHorizontal: 20, gap: 15, marginBottom: 20 }}>
              <TextInput
                placeholder="Nome da categoria"
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: 15,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  fontSize: 16,
                }}
              />

              <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                  Selecione uma cor:
                </Text>

                {/* Cor selecionada */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      backgroundColor: selectedColor || "#f0f0f0",
                      marginRight: 10,
                      borderWidth: 2,
                      borderColor: "#ccc",
                    }}
                  />
                  <Text style={{ fontSize: 16 }}>
                    {selectedColorNome || "Nenhuma cor selecionada"}
                  </Text>
                </View>

                {/* Paleta de cores */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View
                    style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}
                  >
                    {CORES_PREDEFINIDAS.map((color, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleColorSelect(color)}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          backgroundColor: color.cor,
                          borderWidth: selectedColor === color.cor ? 3 : 1,
                          borderColor:
                            selectedColor === color.cor ? "#000" : "#ddd",
                        }}
                      />
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View>
                <View>
                  <Text style={{ fontSize: 16, marginBottom: 10 }}>
                    Selecione um ícone:
                  </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View
                    style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}
                  >
                    <VirtualizedList
                      initialNumToRender={10}
                      renderItem={({}) => (
                        <View>
                          {" "}
                          <MaterialIcons />{" "}
                        </View>
                      )}
                    />
                  </View>
                </ScrollView>
              </View>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#230941",
                  borderRadius: 8,
                  alignItems: "center",
                }}
                onPress={() => setModalNovaCategoria(false)}
              >
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
                >
                  Fechar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
