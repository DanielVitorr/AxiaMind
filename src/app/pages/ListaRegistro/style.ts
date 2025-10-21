import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "#10B981",
    gap: 10,
  },
  headerTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 7,
    borderBottomWidth: 0.5,
    borderColor: "#F3F4F6",
  },
  headerFiltro: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTexto: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 10,
  },
  cardTitulos: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  cardSaidaValor: {
    fontSize: 15,
    color: "#F87171",
    fontWeight: "bold",
  },
  cardEntradaValor: {
    fontSize: 15,
    color: "#10B981",
    fontWeight: "bold",
  },
  cardTituloTexto: {
    fontWeight: "bold",
    fontSize: 17,
  },
  cardTituloCategoria: {
    fontSize: 15,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // height: 800,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 60,
    zIndex: 10,
    gap: 10,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    marginBottom: 15,
  },
  headerFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerbutton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#22273f",
    borderRadius: 10,
  },
  contentTitle: {
    fontSize: 18,
  },
  contentButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  contentButton: {
    width: 110,
    borderColor: "#22273f",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  contentButtonAtivo: {
    width: 110,
    backgroundColor: "#22273f",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  contentButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  contentButtonTextAtivo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22273f",
  },
  contentButtonAplicar: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#22273f",
    alignItems: "center",
    borderRadius: 30,
  },
  contentButtonAplicarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  contentSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  contentSelectButton: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
});
