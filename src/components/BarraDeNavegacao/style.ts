import { Animated } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: ${({ theme }: any) => theme.colors.navbar};
  padding: 10px;
  padding-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  justify-content: center;
  align-items: center;
`;

export const Add = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
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
  font-size: 18px;
  color: ${({ theme }: any) => theme.colors.white};
  font-weight: bold;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  gap: 10px;
`;

export const Handle = styled.View`
  width: 40px;
  height: 5px;
  background-color: ${({ theme }: any) => theme.colors.accent};
  border-radius: 3px;
  margin-bottom: 15px;
`;

export const BottonSheet = styled(Animated.View)`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 220px;
  background-color: ${({ theme }: any) => theme.colors.surface};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-width: 1px;
  border-color: ${({ theme }: any) => theme.colors.border};
  padding: 20px;
  align-items: center;
`;
