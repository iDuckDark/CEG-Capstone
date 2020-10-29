import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { SEO, Layout } from "../../helpers/components";
import Login from "../../components/SignIn/Login";
import "../index.scss";

const SettingsPage = () => {
    return (
        <Layout>
            <SEO title='CEG Capstone Project' />
            <Provider store={store}>
                <div
                    className='center-horizontal'
                    style={{ marginTop: "20px" }}
                />
                <Login />
            </Provider>
        </Layout>
    );
};

export default SettingsPage;
