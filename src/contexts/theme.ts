import { createContext } from "react";

import type { UserTheme, AppTheme } from "@/lib/theme";

type ThemeContextProperties = {
  setTheme: (theme: UserTheme) => void;
  userTheme: UserTheme;
  appTheme: AppTheme;
};

export const ThemeContext = createContext<ThemeContextProperties | undefined>(
  undefined
);
