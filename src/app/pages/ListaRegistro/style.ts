import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#10B981',
    gap: 10
  },
  headerTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 7,
    borderBottomWidth: 0.5,
    borderColor: '#F3F4F6',
  },
  headerFiltro: {
    justifyContent: 'space-between',
    alignItems: 'center',
  }, 
  headerTexto: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  content: {
    flex: 1,
    padding: 20
  }
})