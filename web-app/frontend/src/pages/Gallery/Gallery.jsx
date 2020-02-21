import React from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Title from "../../components/Titles/Title";

const Gallery = () => (
    <Layout>
        <SEO title='CEG Capstone Project' />
        <div className='center-horizontal' style={{ marginTop: "20px" }}>
            <Title variant='h5' gutterBottom className='title'>
                Gallery (Coming Soon)
            </Title>
        </div>
    </Layout>
);

export default Gallery;
