import { THEME_CONSTANT_LOCAL_STORAGE } from "../constants";
import { ThemeState } from "../types/types";
import LocalStorageService from "./localStorageService";

export default class ThemeService {
  private mediaThemeQueryString: string = "(prefers-color-scheme: dark)";
  private localStorageService: LocalStorageService = new LocalStorageService();

  /**
   * Get the current OS theme preference ('light' or 'dark').
   */
  getOsTheme(): ThemeState {
    const isDarkTheme = window.matchMedia(this.mediaThemeQueryString).matches;
    return isDarkTheme ? "dark" : "light";
  }

  /**
   * Get the theme from localStorage, if set.
   */
  getStorageTheme(): ThemeState | null {
    try {
      const themeString = this.localStorageService.getObject<string>(
        THEME_CONSTANT_LOCAL_STORAGE
      );
      if (!themeString) {
        return null; // No theme stored
      }

      if (themeString === "light" || themeString === "dark") {
        return themeString;
      }

      return null;
    } catch (error) {
      console.error("Error reading theme from localStorage:", error);
      return null;
    }
  }

  /**
   * Get the theme to use, prioritizing localStorage over OS settings.
   */
  getTheme(): ThemeState {
    const themeStorage = this.getStorageTheme();
    return themeStorage ?? this.getOsTheme();
  }

  setTheme(theme: string) {
    const themeStorage = this.getStorageTheme();

    if (themeStorage === theme) {
      return;
    }

    if (themeStorage) {
      this.localStorageService.removeItem(THEME_CONSTANT_LOCAL_STORAGE);
    }

    this.localStorageService.createObjectStore<string>(
      THEME_CONSTANT_LOCAL_STORAGE,
      theme
    );
  }
}
