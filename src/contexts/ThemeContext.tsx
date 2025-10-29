import themes from "@/src/theme";
import React, { createContext, useContext, useEffect, useState } from "react";
import { MMKV } from "react-native-mmkv";
import { ThemeProvider } from "styled-components";

type ThemeType = "dark" | "light";

type ThemeContextData = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const storage = new MMKV();

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("dark");

  useEffect(() => {
    const saved = storage.getString("@theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    storage.set("theme", newTheme);
  };

  const currentTheme = theme === "dark" ? themes.darkTheme : themes.lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
