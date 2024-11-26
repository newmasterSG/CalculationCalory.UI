import { THEME_CONSTANT_EVENT } from "../constants";
import { ThemeState } from "../types/types";

export const dispatchThemeChange = (theme: ThemeState) => {
  const updateThemeEvent = new CustomEvent(THEME_CONSTANT_EVENT, {
    detail: { theme },
  });

  document.dispatchEvent(updateThemeEvent);
};
