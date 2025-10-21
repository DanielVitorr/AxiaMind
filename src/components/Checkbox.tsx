import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

type Option = {
  id: number;
  titulo: string;
};

type Props = {
  options?: Option[];
  onChange: (selected: number[]) => void;
};

export default function Checkbox({ options = [], onChange }: Props) {
  const [selected, setSelected] = useState<number[]>([]);

  function toggle(id: number) {
    const index = selected.findIndex((i) => i === id);
    const arrSelected = [...selected];

    if (index !== -1) {
      arrSelected.splice(index, 1);
    } else {
      arrSelected.push(id);
    }
    setSelected(arrSelected);
  }

  useEffect(() => onChange(selected), [selected]);
  // console.log(selected);

  return (
    <View>
      {options.map((op) => (
        <View key={op.id}>
          <TouchableOpacity
            onPress={() => toggle(op.id)}
            style={style.optionContainer}
          >
            {selected.findIndex((i) => i === op.id) !== -1 ? (
              <View style={style.optionBoxChecked}>
                <Ionicons name="checkmark" size={20} color="#fff" />
              </View>
            ) : (
              <View style={style.optionBox} />
            )}

            <Text>{op.titulo}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    gap: 5,
  },
  optionBoxChecked: {
    margin: 2,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 3,
    borderColor: "#009213",
    backgroundColor: "#009213",
  },
  optionBox: {
    margin: 2,
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: "#009213",
  },
});
