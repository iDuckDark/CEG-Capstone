import React, { Component } from "react";
import { SEO } from "../../helpers/components";
import Logo from "../../../static/images/favicon.png";
// import gif from "./200.gif";
import loadingGif from "../../../../../assets/animated-logo.gif";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // loadingTime: true,
        };
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({ loadingTime: false });
        // }, 5000);
    }

    render() {
        // const { loadingTime } = this.state;
        return (
            <>
                <SEO title='Home' />

                <div
                    style={{
                        textAlign: "center",
                        color: "#FFFFFF",
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
                            maxWidth: `500px`,
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
