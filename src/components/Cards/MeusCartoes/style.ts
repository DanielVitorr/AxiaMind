import styled from "styled-components/native";

const Container = styled.View`
  padding: 20px;
  background-color: ${({ theme }: any) => theme.colors.surface};
  border-radius: 12px;
`;

const Titulo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.05);
`;

const style = StyleSheet.create({
  titulo: {
    flexDirection: "row",
    gap: 10,
  },
  tituloTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  containerCartoes: {
    flexDirection: "row",
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textoSecundario: {
    color: "#6B7280",
  },
});
