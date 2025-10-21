import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  main: {
    flex: 1,
    gap: 15,
    backgroundColor: "#F3F4F6",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    paddingTop: 25,
    alignItems: "center",
    justifyContent: "space-around",
  },
  containerTopBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  content: {
    marginLeft: 20,
    marginRight: 20,
    gap: 15,
  },
  botao: {
    padding: 10,
  },
});
