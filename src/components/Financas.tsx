import { Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
  data: {
    nome: string
    categoria: string
    valor: number
    dataPagamento: string
    dataVencimento: string
    statusPago: boolean
    tipoPagamento: string
  }
}

export default function Financas({ data, ...rest }: Props) {
  return (
    <Pressable
      style={{
        backgroundColor: '#cecece',
        padding: 24,
        borderRadius: 5,
        gap: 12
      }}
      {...rest}
    >
      <Text>Nome: {data.nome}</Text>
      <Text>Categoria: {data.categoria}</Text>
      <Text>Valor: {data.valor}</Text>
      <Text>Data do Pagamento: {data.dataPagamento}</Text>
      <Text>Data do Vencimento: {data.dataVencimento}</Text>
      <Text>Status Pago: {data.statusPago}</Text>
      <Text>Tipo de Pagamento: {data.tipoPagamento}</Text>
    </Pressable>
  )
}