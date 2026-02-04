import type { ReactNode } from "react";

import { ScriptOnce } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import type { UserTheme } from "@/lib/theme";

import {
  setupPreferredThemeListener,
  getStoredUserTheme,
  handleThemeChange,
  UserThemeSchema,
  getSystemTheme,
  setStoredTheme,
  themeScript,
} from "@/lib/theme";
import { ThemeContext } from "@/contexts/theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [userTheme, setUserTheme] = useState<UserTheme>(getStoredUserTheme);

  useEffect(() => {
    if (userTheme !== "system") {
      return;
    }
    return setupPreferredThemeListener();
  }, [userTheme]);

  const appTheme = userTheme === "system" ? getSystemTheme() : userTheme;

  const setTheme = (newUserTheme: UserTheme) => {
    const validatedTheme = UserThemeSchema.parse(newUserTheme);
    setUserTheme(validatedTheme);
    setStoredTheme(validatedTheme);
    handleThemeChange(validatedTheme);
  };

  return (
    <ThemeContext value={{ userTheme, appTheme, setTheme }}>
      <ScriptOnce children={themeScript} />
      {children}
    </ThemeContext>
  );
}
