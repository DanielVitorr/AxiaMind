import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Main = styled.View`
  flex: 1;
  background-color: ${({ theme }: any) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  background-color: ${({ theme }: any) => theme.colors.header};
  padding-top: 35px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
`;

export const Content = styled.View`
  margin-left: 20;
  margin-right: 20;
  gap: 15;
`;
