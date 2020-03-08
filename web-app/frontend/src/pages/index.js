import React from "react";
import { Provider } from "react-redux";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Dashboard from "./Dashboard/Dashboard";
import "./index.scss";
import Title from "../components/Titles/Title";
import store from "../store";

const IndexPage = () => (
    <Layout>
        <SEO title='CEG Capstone Project' />
        <Provider store={store}>
            <div className='center-horizontal' style={{ marginTop: "20px" }}>
                <Title variant='h5' gutterBottom className='title'>
                    Smart Search and Rescue Drone
                </Title>
            </div>
            <Dashboard />
        </Provider>
    </Layout>
);

export default IndexPage;