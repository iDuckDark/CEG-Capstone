import React from "react";
import { Provider } from "react-redux";
import { SEO, Layout } from "../../helpers/components";
import Dashboard from "./DashboardPage";
import store from "../../redux/store";
import "../index.scss";

const DashboardPage = () => (
    <Layout>
        <SEO title='CEG Capstone Project' />
        <Provider store={store}>
            <div className='center-horizontal' style={{ marginTop: "20px" }} />
            <Dashboard />
        </Provider>
    </Layout>
);

export default DashboardPage;
