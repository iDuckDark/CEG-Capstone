import React from "react";
import { Provider } from "react-redux";
import { SEO, Layout } from "../helpers/components";
import Dashboard from "./Dashboard/Dashboard";
import "./index.scss";
import store from "../redux/store";

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
