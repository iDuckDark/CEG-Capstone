import React, { Component } from "react";
import Layout from "../../components/layout";
import Title from "../../components/Titles/Title";

const Restreamer = () => {
    return (
        <Layout>
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    marginTop: "2%",
                    textAlign: "center",
                }}
            >
                <Title variant='h5' gutterBottom className='title'>
                    Past Streams
                </Title>
                <iframe
                    width='560'
                    height='315'
                    src='https://www.youtube.com/embed/t9YXkrnr4_4'
                    frameborder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowfullscreen
                ></iframe>

                <iframe
                    width='853'
                    height='480'
                    src='https://www.youtube.com/embed/EkogkDwx1pA'
                    frameborder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowfullscreen
                ></iframe>

                <div style={{ marginBottom: "20px" }}></div>
                <Title variant='h5' gutterBottom className='title'>
                    Live Stream
                </Title>
                <iframe
                    width='640'
                    height='360'
                    src='https://www.youtube.com/embed/ZG5nE0rd4BM'
                    frameborder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowfullscreen
                ></iframe>
            </div>
        </Layout>
    );
};
export default Restreamer;
