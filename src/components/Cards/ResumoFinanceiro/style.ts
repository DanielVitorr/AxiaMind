import styled from "styled-components/native";

export const Container = styled.View`
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.colors.surface};
`;

export const Balance = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.05);
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.colors.text};
`;

export const BalanceValor = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.colors.text};
`;

export const Resumo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 10px;
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentText = styled.Text`
  font-size: 16px;
  color: ${({ theme }: any) => theme.colors.text};
`;
