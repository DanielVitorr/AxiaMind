import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { getCategoria } from "../database/mmkvCategorias";

export default function PickerCostumizado() {
  const [selected, setSelected] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const categorias = getCategoria();

  console.log(categorias.map((categoria) => categoria.nomeIcone));

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
        <MaterialIcons name={item.nomeIcone} size={20} color="#2445fd" />
        <Text style={{ marginLeft: 10 }}>{item.titulo}</Text>
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {selected ? (
            <>
              <MaterialIcons
                name={selected.nomeIcone}
                size={20}
                color="#2445fd"
              />
              <Text style={{ marginLeft: 10 }}>{selected.titulo}</Text>
            </>
          ) : (
            <Text style={{ color: "#999" }}>Selectione uma categoria</Text>
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
              maxHeight: "50%",
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
    </View>
  );
}
