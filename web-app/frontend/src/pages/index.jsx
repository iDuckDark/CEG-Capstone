import React from "react";
import { Provider } from "react-redux";
import { SEO, Layout } from "../helpers/components";
import Home from "./Home/Home";
import "./index.scss";
import store from "../redux/store";

const IndexPage = () => (
    <Layout>
        <SEO title='CEG Capstone Project' />
        <Provider store={store}>
            <div className='center-horizontal' style={{ marginTop: "20px" }} />
            <Home />
        </Provider>
    </Layout>
);

export default IndexPage;
