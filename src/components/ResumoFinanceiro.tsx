import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Feather from '@expo/vector-icons/Feather';

type ResumoProps = {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  totalPago: number;
  totalAPagar: number;
};

export default function ResumoFinanceiro({ totalReceitas, totalDespesas, saldo, totalAPagar, totalPago }: ResumoProps) {
  return (
    <View style={style.containerResumoPrincipal}>
      <View style={style.saldo}>
        <Text style={style.saldoTitulo}>Saldo total</Text>
        <Text style={style.saldoValor}>
          {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>

      <View>
        <View style={style.resumo}>
          <View style={{ backgroundColor: '#10B981', padding: 7, borderRadius: 5 }}>
            <Feather name="trending-up" size={20} color='#FFFFFF' />
          </View>
          <View style={style.resumoContent}>
            <Text style={style.resumoTexto}>Receitas</Text>
            <Text style={style.resumoTexto}>
              {totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
        </View>

        <View style={style.resumo}>
          <View style={{ backgroundColor: '#F87171', padding: 7, borderRadius: 5 }}>
            <Feather name="trending-down" size={20} color="#FFFFFF" />
          </View>
          <View style={style.resumoContent}>
            <Text style={style.resumoTexto}>Despesas</Text>
            <Text style={style.resumoTexto}>
              {totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
        </View>

        <View style={style.resumo}>
          <View style={{ backgroundColor: '#3B82F6', padding: 7, borderRadius: 5 }}>
            <Feather name="check-circle" size={20} color="#FFFFFF" />
          </View>
          <View style={style.resumoContent}>
            <Text style={style.resumoTexto}>Pago</Text>
            <Text style={style.resumoTexto}>
              {totalPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
        </View>

        <View style={style.resumo}>
          <View style={{ backgroundColor: '#FBBF24', padding: 7, borderRadius: 5 }}>
            <Feather name="alert-circle" size={20} color="#FFFFFF" />
          </View>
          <View style={style.resumoContent}>
            <Text style={style.resumoTexto}>A Pagar</Text>
            <Text style={style.resumoTexto}>
              {totalAPagar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  containerResumoPrincipal: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF'
  },
  saldo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)'
  },
  saldoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1C'
  },
  saldoValor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1C'
  },
  resumo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    gap: 10
  },
  resumoContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resumoTexto: {
    fontSize: 16,
    color: '#1C1C1C'
  },
})