import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDataBase } from "../database/initializeDataBase";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider databaseName="financas.db" onInit={initializeDataBase}>
        <Slot />
      </SQLiteProvider>
    </GestureHandlerRootView>
  )
}