import { createClientOnlyFn, createIsomorphicFn } from "@tanstack/react-start";
import * as z from "zod";

const UserThemeSchema = z.enum(["light", "dark", "system"]).catch("system");
const AppThemeSchema = z.enum(["light", "dark"]).catch("light");

type UserTheme = z.infer<typeof UserThemeSchema>;
type AppTheme = z.infer<typeof AppThemeSchema>;

const themeStorageKey = "ui-theme";

const getStoredUserTheme = createIsomorphicFn()
  .server((): UserTheme => "system")
  .client((): UserTheme => {
    const stored = localStorage.getItem(themeStorageKey);
    return UserThemeSchema.parse(stored);
  });

const setStoredTheme = createClientOnlyFn((theme: UserTheme) => {
  const validatedTheme = UserThemeSchema.parse(theme);
  localStorage.setItem(themeStorageKey, validatedTheme);
});

const getSystemTheme = createIsomorphicFn()
  .server((): AppTheme => "light")
  .client((): AppTheme => {
    return globalThis.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

const handleThemeChange = createClientOnlyFn((userTheme: UserTheme) => {
  const validatedTheme = UserThemeSchema.parse(userTheme);

  const root = document.documentElement;
  root.classList.remove("light", "dark", "system");

  if (validatedTheme === "system") {
    const systemTheme = getSystemTheme();
    root.classList.add(systemTheme, "system");
  } else {
    root.classList.add(validatedTheme);
  }
});

const setupPreferredThemeListener = createClientOnlyFn(() => {
  const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => handleThemeChange("system");
  mediaQuery.addEventListener("change", handler);
  return () => mediaQuery.removeEventListener("change", handler);
});

const themeScript = (function () {
  function themeFunction() {
    try {
      const storedTheme = localStorage.getItem("ui-theme") || "system";
      const validTheme = ["system", "light", "dark"].includes(storedTheme)
        ? storedTheme
        : "system";

      if (validTheme === "system") {
        const systemTheme = globalThis.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches
          ? "dark"
          : "light";
        document.documentElement.classList.add(systemTheme, "system");
      } else {
        document.documentElement.classList.add(validTheme);
      }
    } catch {
      const systemTheme = globalThis.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.classList.add(systemTheme, "system");
    }
  }
  return `(${themeFunction.toString()})();`;
})();

export {
  setupPreferredThemeListener,
  getStoredUserTheme,
  handleThemeChange,
  UserThemeSchema,
  AppThemeSchema,
  setStoredTheme,
  getSystemTheme,
  themeScript,
};
export type { UserTheme, AppTheme };
