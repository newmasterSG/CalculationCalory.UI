import React from "react";
import Sidebar from "./Sidebar";
import Home from "./homePage/homeComponent";
import { Provider } from "react-redux";
import store from '../store/mainStore'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from "./userProfileComponent/userProfile";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthGuard from "./AuthComponents/AuthGuard";
import Login from "./userProfileComponent/login";
import Register from "./userProfileComponent/register";

const MainComponent: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    //For resolving vite problem
    const theme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Sidebar isOpen={open} toggleDrawer={toggleDrawer} />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <AuthGuard element={<Home />} />
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/userprofile" element={<UserProfile />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </Provider>
    )
}

export default MainComponent;