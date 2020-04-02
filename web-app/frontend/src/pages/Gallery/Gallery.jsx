/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from "react";
import Gallery from "react-photo-gallery";
import { SEO, Layout, Title } from "../../helpers/components";
import { isServerSideRendering } from "../../helpers/utils";

const photos = () => {
    const arr = [];
    if (isServerSideRendering()) return arr;
    for (let i = 9; i >= 1; i -= 1) {
        const src = require(`../../../static/images/progress/${String(i)}.jpg`);
        let width = i + 3;
        let height = i + 4;
        if (i === 9) {
            width = 5;
            height = 4;
        }
        arr.push({ src, width, height });
    }
    return arr;
};

const Gallery2 = () => (
    <Layout>
        <SEO title='Gallery' />
        <div
            className='center-horizontal'
            style={{ marginTop: "20px", marginBottom: "18%" }}
        >
            <Title
                variant='h5'
                gutterBottom
                className='title'
                style={{ color: "#FFFFFF" }}
            >
                Gallery
            </Title>
            <Gallery photos={photos()} />
        </div>
    </Layout>
);

export default Gallery2;
