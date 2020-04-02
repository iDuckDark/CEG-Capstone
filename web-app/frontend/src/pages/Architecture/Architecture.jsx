import React from "react";
import { SEO, Layout, Title } from "../../helpers/components";
import design from "../../../static/images/architecture/Design.png";
import arc from "../../../static/images/architecture/SystemArch.png";

const Architecture = () => {
    return (
        <Layout>
            <SEO title='Architecture' />
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    marginTop: "2%",
                    marginBottom: "15%",
                    textAlign: "center",
                }}
            >
                <Title
                    variant='h5'
                    gutterBottom
                    className='title'
                    style={{ color: "#FFFFFF" }}
                >
                    System Architecture
                </Title>

                <div style={{ display: "inline-block" }}>
                    <img
                        src={design}
                        alt={design}
                        style={{ height: "500px", width: "500px" }}
                    />
                </div>
                <div style={{ display: "inline-block" }}>
                    <img
                        src={arc}
                        alt={arc}
                        style={{ height: "500px", width: "700px" }}
                    />
                </div>
            </div>
        </Layout>
    );
};
export default Architecture;
