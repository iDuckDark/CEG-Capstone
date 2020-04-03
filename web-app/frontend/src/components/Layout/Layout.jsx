import React, { Component } from "react";
import PropTypes from "prop-types";
import "./layout.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import MiniDrawer from "../Drawer/MiniDrawer";
import Header from "../Header/Header";
import { isServerSideRendering } from "../../helpers/utils";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#2b2e43",
        },
        secondary: {
            main: "#d04290",
            // contrastText: "#ffcc00",
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        background: {
            paper: "#2b2e43",
            default: "#2b2e43",
        },
    },
});

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = { width: isServerSideRendering() ? 0 : window.innerWidth };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        if (!isServerSideRendering())
            window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        if (!isServerSideRendering())
            window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        if (!isServerSideRendering())
            this.setState({ width: window.innerWidth });
    }

    render() {
        const { children } = this.props;
        const { width } = this.state;
        return (
            <>
                <ThemeProvider theme={theme}>
                    {width > 960 && <MiniDrawer props={children} />}
                    {width <= 960 && <Header />}
                    <main>{children} </main>
                </ThemeProvider>
            </>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
