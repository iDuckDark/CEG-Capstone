import React, { Component } from "react";
import { SEO } from "../../helpers/components";
// import Logo from "../../../static/images/favicon.png";
// import gif from "./200.gif";
import loadingGif from "../../../../../assets/animated-logo.gif";
import { isServerSideRendering } from "../../helpers/utils";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // width: isServerSideRendering() ? 0 : window.innerWidth,
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        if (!isServerSideRendering()) {
            window.addEventListener("resize", this.updateDimensions);
        }
    }

    componentWillUnmount() {
        if (!isServerSideRendering())
            window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        // if (!isServerSideRendering())
        // this.setState({ width: window.innerWidth });
    }

    render() {
        // const { width } = this.state;
        // const isMobile = width <= 960;
        return (
            <>
                <SEO title='Home' />

                <div
                    style={{
                        textAlign: "center",
                        color: "#FFFFFF",
                        backgroundColor: "#2b2e43",
                    }}
                >
                    {/* {loadingTime && (
                        <img
                            src={gif}
                            alt='loading'
                            style={{ width: "100%", height: "100%" }}
                        />
                    )} */}
                    {/* <Header siteTitle='CEG Capstone Project Winter 2020 - Fall 2020' /> */}
                    {/* <h1>Hi everyone! </h1> */}
                    <h1>Smart Search &amp; Rescue Drone</h1>
                    <p>CEG Capstone 4912/4913</p>
                    {/* <p>We are gonna build something great!</p> */}
                    {/* <p>Members: Nevin, Peter, Divyang, Paul, Shail</p> */}
                    <img
                        src={loadingGif}
                        style={{
                            maxWidth: `300px`,
                            marginBottom: `1.45rem`,
                            borderRadius: "20%",
                        }}
                        alt='logo'
                    />
                </div>
            </>
        );
    }
}

export default Home;
