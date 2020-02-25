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
    for (let i = 9; i >= 1; i--) {
        const src = require(`../../assets/progress/${String(i)}.jpg`);
        let width = i + 3;
        let height = i + 4;
        if (i == 9) {
            width = 5;
            height = 4;
        }
        arr.push({ src, width, height });
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
