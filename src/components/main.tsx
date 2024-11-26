import React from "react";
import Sidebar from "./Sidebar";
import Home from "./homePage/homeComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./userProfileComponent/userProfile";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthGuard from "./AuthComponents/AuthGuard";
import Login from "./userProfileComponent/login";
import Register from "./userProfileComponent/register";
import { useTheme } from "../hooks/useTheme";
import { getTheme } from "../themes/mainTheme";

const MainComponent: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const themeString = useTheme();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <ThemeProvider theme={getTheme(themeString)}>
      <Router>
        <Sidebar isOpen={open} toggleDrawer={toggleDrawer} />
        <Routes>
          <Route path="/" element={<AuthGuard element={<Home />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default MainComponent;
