import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  getColorMode,
  setColorMode,
} from "../../store/slicers/applicationSlice";
import style from "../../css/themeSwiitcher.module.css";
import ApplicationService from "../../services/applicationService";
import { dispatchThemeChange } from "../../customEvents/dispatchChangeTheme";

const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const themeColor = useAppSelector((state) => getColorMode(state));
  const applicationService = new ApplicationService();

  const handleToggle = () => {
    const newTheme = themeColor === "light" ? "dark" : "light";
    applicationService.setTheme(newTheme);
    dispatch(setColorMode(newTheme));
    dispatchThemeChange(newTheme);
  };

  return (
    <div className={style.ThemeSwitchWrapper}>
      <input
        type="checkbox"
        id="themeSwitch"
        name="theme-switch"
        className={style.ThemeSwitchInput}
        defaultChecked={themeColor === "dark"}
        onClick={handleToggle}
      />
      <label htmlFor="themeSwitch" className={style.Switch}>
        <span className={style.slider}></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
