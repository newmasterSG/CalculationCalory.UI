/**
 * Custom hook to get and subscribe to the OS theme setting.
 * @returns The current theme ('light' or 'dark').
 */

import { useEffect, useState } from "react";
import ApplicationService from "../services/applicationService";
import { getColorMode, setColorMode } from "../store/slicers/applicationSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { ThemeState } from "../types/types";
import { THEME_CONSTANT_EVENT } from "../constants";

const applicationService = new ApplicationService();

export const useTheme = (): ThemeState => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => getColorMode(state));

  const handleThemeChangeBody = (newTheme: ThemeState) => {
    const body = document.body;
    if (newTheme === "dark") {
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
    } else {
      body.classList.add("light-theme");
      body.classList.remove("dark-theme");
    }
  };

  const handleThemeChange = (event: Event) => {
    const customEvent = event as CustomEvent<{ theme: ThemeState }>;
    const newTheme = customEvent.detail?.theme;

    if (!newTheme) {
      return;
    }

    dispatch(setColorMode(newTheme));
    handleThemeChangeBody(newTheme);
  };

  useEffect(() => {
    const theme = applicationService.getTheme();
    dispatch(setColorMode(theme));
    handleThemeChangeBody(theme);

    document.addEventListener(THEME_CONSTANT_EVENT, handleThemeChange);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener(THEME_CONSTANT_EVENT, handleThemeChange);
    };
  }, []);

  return theme;
};
