import React from "react";
import PropTypes from "prop-types";
import "./layout.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import MiniDrawer from "./Drawer/MiniDrawer";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#2b2e43",
        },
        secondary: {
            main: "#d04290",
            contrastText: "#ffcc00",
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        background: {
            paper: "#2b2e43",
            default: "#2b2e43",
        },
    },
});

const Layout = ({ children }) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <MiniDrawer props={children} />
                <main>{children} </main>
            </ThemeProvider>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
