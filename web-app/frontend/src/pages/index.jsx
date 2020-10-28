import React from "react";
import { SEO, Layout } from "../helpers/components";
import loadingGif from "../../static/images/animated-logo.gif";
import hoverX from "../../static/images/HoverX.jpg";
import Home from "./Home/Home";
import "./index.scss";

const IndexPage = () => (
    <Layout>
        <Home />
        {/* <SEO title='Home' />
        <div
            style={{
                textAlign: "center",
                color: "#FFFFFF",
                backgroundColor: "#2b2e43",
                marginTop: "10px",
            }}
        >
            <img
                src={loadingGif}
                style={{
                    maxWidth: `300px`,
                    borderRadius: "20%",
                }}
                alt='logo'
            />
            <img
                src={hoverX}
                style={{
                    borderRadius: "20%",
                    width: "50%",
                }}
                alt='hoverx'
            />
            <br />
        </div> */}
    </Layout>
);

export default IndexPage;
