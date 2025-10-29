import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppThemeProvider } from "../contexts/ThemeContext";

export default function Layout() {
  return (
    <AppThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
    </AppThemeProvider>
  );
}
