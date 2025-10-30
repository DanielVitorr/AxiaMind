import { View } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import {
  Container,
  Balance,
  Title,
  BalanceValor,
  Resumo,
  Content,
  ContentText,
} from "./style";
import { useAppTheme } from "@/src/contexts/ThemeContext";

type ResumoProps = {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  totalPago: number;
  totalAPagar: number;
};

export default function ResumoFinanceiro({
  totalReceitas,
  totalDespesas,
  saldo,
  totalAPagar,
  totalPago,
}: ResumoProps) {
  const { theme } = useAppTheme();

  return (
    <Container>
      <Balance>
        <Title>Saldo total</Title>
        <BalanceValor>
          {saldo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </BalanceValor>
      </Balance>

      <View>
        <Resumo>
          <View
            style={{
              backgroundColor: theme.colors.Entry,
              padding: 7,
              borderRadius: 5,
            }}
          >
            <Feather name="trending-up" size={20} color={theme.colors.white} />
          </View>
          <Content>
            <ContentText>Receitas</ContentText>
            <ContentText>
              {totalReceitas.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </ContentText>
          </Content>
        </Resumo>

        <Resumo>
          <View
            style={{
              backgroundColor: theme.colors.Exit,
              padding: 7,
              borderRadius: 5,
            }}
          >
            <Feather
              name="trending-down"
              size={20}
              color={theme.colors.white}
            />
          </View>
          <Content>
            <ContentText>Despesas</ContentText>
            <ContentText>
              {totalDespesas.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </ContentText>
          </Content>
        </Resumo>

        <Resumo>
          <View
            style={{
              backgroundColor: theme.colors.paid,
              padding: 7,
              borderRadius: 5,
            }}
          >
            <Feather name="check-circle" size={20} color={theme.colors.white} />
          </View>
          <Content>
            <ContentText>Pago</ContentText>
            <ContentText>
              {totalPago.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </ContentText>
          </Content>
        </Resumo>

        <Resumo>
          <View
            style={{
              backgroundColor: theme.colors.toSwitchOff,
              padding: 7,
              borderRadius: 5,
            }}
          >
            <Feather name="alert-circle" size={20} color="#FFFFFF" />
          </View>
          <Content>
            <ContentText>A Pagar</ContentText>
            <ContentText>
              {totalAPagar.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </ContentText>
          </Content>
        </Resumo>
      </View>
    </Container>
  );
}
