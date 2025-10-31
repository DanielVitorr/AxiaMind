import styled from "styled-components/native";

export const Container = styled.View`
  width: max-content;
  padding-bottom: 10px;
  margin: 0px 10px 0px 10px;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: 25px;
  border: 1px solid ${({ theme }: any) => theme.colors.border};
`;

export const CurrentMonth = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }: any) => theme.colors.text};
`;

export const SideMonth = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }: any) => theme.colors.textSecondary};
`;
