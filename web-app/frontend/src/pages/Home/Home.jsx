import React, { Component } from "react";
import { SEO } from "../../helpers/components";
import loadingGif from "../../../../../assets/animated-logo.gif";
import hoverX from "../../../static/images/HoverX.jpg";

class Home extends Component {
    constructor(props) {
        super(props);
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
                        marginTop: "10px",
                    }}
                >
                    {/* <img
                        src={hoverX}
                        style={{
                            borderRadius: "20%",
                            width: "80%",
                        }}
                        alt='hoverx'
                    /> */}
                    <br />
                    <h2>Smart Search &amp; Rescue Drone</h2>
                    <p>CEG Capstone 4912/4913</p>
                    <img
                        src={loadingGif}
                        style={{
                            maxWidth: `300px`,
                            // marginBottom: `1.45rem`,
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
