import React, { Component } from "react";
import { SEO } from "../../helpers/components";
import loadingGif from "../../../../../assets/animated-logo.gif";
import hoverX from "../../../../../assets/specs/2/hover-x.png";

class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <>
                <SEO title='Home' />
                <div
                    style={{
                        textAlign: "center",
                        color: "#FFFFFF",
                        backgroundColor: "#2b2e43",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                        marginTop: "3%",
                    }}
                >
                    <h2 style={{ fontSize: "28px" }}>
                        Smart Search &amp; Rescue Drone
                    </h2>
                    <p style={{ fontSize: "20px" }}>CEG Capstone 4912/4913</p>
                    <img
                        src={loadingGif}
                        style={{
                            maxWidth: `300px`,
                            // marginBottom: `1.45rem`,
                            borderRadius: "20%",
                        }}
                        alt='logo'
                    />
                    <br />
                    <img
                        src={hoverX}
                        style={{
                            width: "400px",
                        }}
                        alt='hoverx'
                    />
                </div>
            </>
        );
    }
}

export default Home;
