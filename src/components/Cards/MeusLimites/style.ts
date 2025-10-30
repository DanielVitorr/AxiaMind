import styled from "styled-components/native";

export const Container = styled.View`
  padding: 20px;
  background-color: ${({ theme }: any) => theme.colors.surface};
  border-radius: 12px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.05);
`;

export const Title = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.colors.text};
`;

export const Card = styled.View`
  flex-direction: row;
  /* min-height: 100px; */
  justify-content: center;
  align-items: center;
`;

export const CardText = styled.Text`
  color: ${({ theme }: any) => theme.colors.text};
`;
