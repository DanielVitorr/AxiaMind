import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
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

export const Button = styled.TouchableOpacity`
  height: 50;
  width: 50;
  justify-content: center;
  align-items: center;
`;

export const Add = styled.TouchableOpacity`
  height: 50;
  width: 50;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: any) => theme.colors.primary};
  border-radius: 10px;
`;

export const Entry = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${({ theme }: any) => theme.colors.Entry};
  border-radius: 10px;
  width: 100%;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;
`;

export const Exit = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${({ theme }: any) => theme.colors.Exit};
  border-radius: 10px;
  width: 100%;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;
`;

export const Text = styled.Text`
  font-size: 18;
  color: ${({ theme }: any) => theme.colors.white};
  font-weight: bold;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  gap: 10;
`;

export const style = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: "#1F1A3D",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#9B80FF",
    borderRadius: 3,
    marginBottom: 15,
  },
});
