import { StyleSheet } from "react-native";
import styled from "styled-components/native";

const Main = styled.View`
  flex: 1;
  gap: 15;
  background-color: ${({ theme }: any) => theme.colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  background-color: ${({ theme }: any) => theme.colors.primary};
  padding-top: 35;
  padding-bottom: 10;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
  padding: 10px;
`;

Main.Header = Header;
Main.Header.Button = Button;

export default Main;

export const style = StyleSheet.create({
  content: {
    marginLeft: 20,
    marginRight: 20,
    gap: 15,
  },
});
