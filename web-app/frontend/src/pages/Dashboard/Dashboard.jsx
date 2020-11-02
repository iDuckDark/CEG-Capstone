import React from "react";
import { Layout } from "../../helpers/components";
import Dashboard from "./DashboardPage";
import "../index.scss";

const DashboardPage = () => (
    <Layout>
        <div className='center-horizontal' style={{ marginTop: "20px" }} />
        <Dashboard />
    </Layout>
);

export default DashboardPage;
