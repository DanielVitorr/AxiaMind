import themes from "@/src/theme";
import React, { createContext, useContext, useEffect, useState } from "react";
import { MMKV } from "react-native-mmkv";
import { ThemeProvider } from "styled-components";

type ThemeName = "dark" | "light";

type ThemeContextData = {
  theme: typeof themes.darkTheme; // o objeto com as cores
  themeName: ThemeName; // a string ("dark" ou "light")
  toggleTheme: () => void;
};

const storage = new MMKV();

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>("dark");

  useEffect(() => {
    const saved = storage.getString("@theme");
    if (saved === "dark" || saved === "light") {
      setThemeName(saved);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = themeName === "dark" ? "light" : "dark";
    setThemeName(newTheme);
    storage.set("@theme", newTheme);
  };

  const theme = themeName === "dark" ? themes.darkTheme : themes.lightTheme;

  return (
    // @ts-ignore
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      {/* @ts-ignore */}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
