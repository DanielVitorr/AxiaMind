import { StyleSheet } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }: any) => theme.colors.navbar};
  padding: 10px;
  padding-bottom: 20;
`;

const Button = styled.TouchableOpacity`
  height: 50;
  width: 50;
  justify-content: center;
  align-items: center;
`;

const Add = styled.TouchableOpacity`
  height: 50;
  width: 50;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: any) => theme.colors.primary};
  border-radius: 10px;
`;

const Entry = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${({ theme }: any) => theme.colors.addEntry};
  border-radius: 10px;
  width: 100%;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;
`;

const Exit = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${({ theme }: any) => theme.colors.addExit};
  border-radius: 10px;
  width: 100%;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;
`;

const Text = styled.Text`
  font-size: 18;
  color: ${({ theme }: any) => theme.colors.white};
  font-weight: bold;
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
  gap: 10;
`;

Container.Button = Button;
Container.Button.Add = Add;
Container.Button.Entry = Entry;
Container.Button.Exit = Exit;
Container.Button.Text = Text;
Container.Content = Content;

export default Container;

export const style = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    marginBottom: 15,
  },
});
