import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    gap: 15,
    backgroundColor: "#10B981",
  },
  headerTexto: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  inputs: {
    gap: 10,
  },
  inputsTexto: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputTexto: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    padding: 15,
    fontSize: 18,
  },
  selectCategoria: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    fontSize: 18,
  },
  selectCategoriaTexto: {
    fontSize: 18,
  },
  botaoAdicionar: {
    backgroundColor: "#000000",
    padding: 20,
    borderRadius: 50,
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoTexto: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  containerDataRecebimento: {
    gap: 10,
    padding: 10,
  },
  selectDataRecebimento: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  dataRecebimentoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  selectButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderColor: "#10B981",
    borderWidth: 1,
  },
  selectButtonAtivo: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#10B981",
    borderRadius: 20,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectButtonTextAtivo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
