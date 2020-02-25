import React from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Title from "../../components/Titles/Title";
import logo from "../../images/favicon.png";
import Gallery from "react-photo-gallery";
import { isServerSideRendering } from "../../helpers/utils";

const photos = () => {
    let arr = [];
    if (isServerSideRendering()) return arr;
    for (let i = 1; i < 8; i++) {
        const src = require(`../../assets/progress/${String(i)}.jpg`);
        arr.push({
            src,
            width: 2 + i,
            height: 3 + i,
        });
    }
    return arr;
};

const Gallery2 = () => (
    <Layout>
        <SEO title='CEG Capstone Project' />
        <div
            className='center-horizontal'
            style={{ marginTop: "20px", marginBottom: "18%" }}
        >
            <Title variant='h5' gutterBottom className='title'>
                Gallery
            </Title>
            <Gallery photos={photos()} />
        </div>
    </Layout>
);

export default Gallery2;
