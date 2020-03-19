import React, { Component } from "react";
import Title from "../../components/Titles/Title";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = { defaultUrl: "https://45.72.149.128:8000/" };
    }

    render() {
        const { defaultUrl } = this.state;
        return (
            <Layout>
                <SEO title='CEG Capstone Project' />
                <div
                    className='center-horizontal'
                    style={{ marginTop: "20px", marginBottom: "18%" }}
                    style={{ color: "#FFFFFF" }}
                >
                    <Title variant='h5' gutterBottom className='title'>
                        Settings
                    </Title>
                    {defaultUrl}
                </div>
            </Layout>
        );
    }
}
export default Settings;
