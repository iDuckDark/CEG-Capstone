import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import store from "../../redux/store";
import MiniDrawer from "../Drawer/MiniDrawer";
import Header from "../Header/Header";
import { isServerSideRendering } from "../../helpers/utils";
import loadingGif from "../../../../../assets/animated-logo.gif";
import "./layout.css";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#2b2e43",
        },
        secondary: {
            main: "#d04290",
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
        this.state = {
            width: isServerSideRendering() ? 0 : window.innerWidth,
            loading: isServerSideRendering()
                ? false
                : window.location.pathname === "/",
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        if (!isServerSideRendering()) {
            window.addEventListener("resize", this.updateDimensions);
            setTimeout(() => {
                this.setState({ loading: false });
            }, 1000);
        }
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
        const { width, loading } = this.state;
        const rootStyle = {
            height: "100vh",
            minHeight: "100vh",
            backgroundColor: "#2b2e43",
            justifyContent: "center",
        };
        if (loading) {
            return (
                <div style={rootStyle}>
                    <ThemeProvider theme={theme}>
                        {loading && (
                            <div
                                style={{
                                    textAlign: "center",
                                    color: "#2b2e43",
                                    backgroundColor: "#2b2e43",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    verticalAlign: "middle",
                                }}
                            >
                                <img
                                    src={loadingGif}
                                    alt='loading'
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        position: "absolute",
                                        margin: "auto",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                />
                            </div>
                        )}
                        {!loading && width > 960 && (
                            <MiniDrawer props={children} />
                        )}
                        {!loading && width <= 960 && <Header />}
                    </ThemeProvider>
                </div>
            );
        }
        return (
            <div style={rootStyle}>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        {width > 960 && <MiniDrawer props={children} />}
                        {width <= 960 && <Header />}
                        <main>{children} </main>
                    </ThemeProvider>
                </Provider>
            </div>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
