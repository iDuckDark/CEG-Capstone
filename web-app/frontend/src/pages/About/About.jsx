import React from "react";
import { SEO, Layout, Header2 as Header } from "../../helpers/components";
import Logo from "../../../static/images/favicon.png";

const About = () => {
    return (
        <Layout>
            <SEO title='About' />
            <div
                style={{
                    textAlign: "center",
                    color: "#FFFFFF",
                }}
            >
                <Header siteTitle='CEG Capstone Project Winter 2020 - Fall 2020' />
                <h1>Hi everyone! </h1>
                <p>Welcome to our CEG Captone Dashboard</p>
                <p>We are gonna build something great!</p>
                <p>Members: Nevin, Peter, Divyang, Paul, Shail</p>

                <img
                    src={Logo}
                    style={{
                        maxWidth: `300px`,
                        marginBottom: `1.45rem`,
                        borderRadius: "20%",
                    }}
                    alt='logo'
                />
            </div>
        </Layout>
    );
};

export default About;
