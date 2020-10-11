import React, { Component } from "react";
import PropTypes from "prop-types";
import "./layout.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import MiniDrawer from "../Drawer/MiniDrawer";
import Header from "../Header/Header";
import { isServerSideRendering } from "../../helpers/utils";
import gif from "../../pages/Home/200.gif";
import FadeIn from "react-fade-in";

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
            }, 1500);
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
        const { width } = this.state;
        const { loading } = this.state;
        return (
            <>
                <ThemeProvider theme={theme}>
                    {loading && (
                        <div
                            style={{
                                textAlign: "center",
                                color: "#FFFFFF",
                            }}
                        >
                            <img
                                src={gif}
                                alt='loading'
                                style={{ width: "800px", height: "600px" }}
                            />
                        </div>
                    )}

                    {!loading && width > 960 && <MiniDrawer props={children} />}
                    {!loading && width <= 960 && <Header />}
                    {!loading && (
                        <FadeIn transitionDuration={3000}>
                            <main>{children} </main>
                        </FadeIn>
                    )}
                    {/* <MiniDrawer props={children} /> */}
                    {/* {!loadingTime && <main>{children} </main>} */}
                </ThemeProvider>
            </>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
