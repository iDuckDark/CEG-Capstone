import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Dashboard from "../pages/Dashboard/Dashboard";
import "./index.scss";
import Title from "../components/Titles/Title";
// Redux
import { Provider } from "react-redux";
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

{
    /* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */
}
{
    /* <Link to="/page-2/">Go to page 2</Link> */
}
