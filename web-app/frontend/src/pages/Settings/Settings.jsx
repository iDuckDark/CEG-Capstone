import React from "react";
import { SEO, Layout } from "../../helpers/components";
import Login from "../../components/SignIn/Login";
import "../index.scss";

const Settings = () => {
    return (
        <Layout>
            <SEO title='CEG Capstone Project' />
            <div className='center-horizontal' style={{ marginTop: "20px" }} />
            <Login />
        </Layout>
    );
};

export default Settings;
