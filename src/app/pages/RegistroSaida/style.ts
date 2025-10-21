import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    gap: 15,
    backgroundColor: '#F87171'
  },
  headerTexto: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 20
  },
  contentInputs: {
    gap: 10
  },
  contentTitulo: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputTexto: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    padding: 15,
    fontSize: 18
  },
  selectList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    fontSize: 18
  },
  selectCategoriaTexto: {
    fontSize: 18,
  },
  botaoAdicionar: {
    backgroundColor: '#000000',
    padding: 20,
    borderRadius: 50,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botaoTexto: {
    fontSize: 20,
    color: '#FFFFFF'
  },
  selectDataRecebimento: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  selectButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderColor: '#F87171',
    borderWidth: 1
  },
  selectButtonAtivo: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F87171',
    borderRadius: 20
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectButtonTextAtivo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  statusPago: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selectButtonStatusPago: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: '#F87171',
    borderWidth: 1,
    alignItems: 'center'
  },
  selectButtonStatusNaoPago: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#F87171',
    borderWidth: 1,
    alignItems: 'center'
  },
  selectButtonStatusPagoActive: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#10B981',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center'
  },
  selectButtonStatusNaoPagoActive: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F87171',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center'
  },
  selectButtonStatusTexto: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  selectButtonStatusTextoActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  contentTipoLancamento: {
    flexDirection: 'row',
  },
  selectButtonTipLancUni: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: '#F87171',
    borderWidth: 1,
    alignItems: 'center'
  },
  selectButtonTipLancUniAtivo: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F87171',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center'
  },
  selectButtonTipLancParc: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#F87171',
    borderWidth: 1,
    alignItems: 'center'
  },
  selectButtonTipLancParcAtivo: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F87171',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center'
  },
  selectButtonTipoLancUniText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  selectButtonTipLancUniTextAtivo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  selectButtonTipLancParcText: {
    fontSize: 16,
    fontWeight: 'bold'    
  },
  selectButtonTipLancParcTextAtivo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  selectButtonTipLancParcCarrossel: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    overflow: "hidden"
  },
  selectButtonTipLancParcValor: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#eee"
  },
  selectButtonTipLancParcValorAtivo: {
    backgroundColor: "#007AFF",
  }
})