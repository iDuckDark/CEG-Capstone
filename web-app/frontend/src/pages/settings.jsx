import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { SEO, Layout } from "../helpers/components";
import "./index.scss";

import Settings from "./Settings/Settings";

const SettingsPage = () => {
    return (
        <Layout>
            <SEO title='CEG Capstone Project' />
            <Provider store={store}>
                <div
                    className='center-horizontal'
                    style={{ marginTop: "20px" }}
                />
                <Settings />
            </Provider>
        </Layout>
    );
};

export default SettingsPage;
