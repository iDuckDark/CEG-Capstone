import React from "react";
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
                    title='1'
                    width='560'
                    height='315'
                    src='https://www.youtube.com/embed/t9YXkrnr4_4'
                    frameBorder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                />

                <iframe
                    title='2'
                    width='853'
                    height='480'
                    src='https://www.youtube.com/embed/EkogkDwx1pA'
                    frameBorder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                />

                <div style={{ marginBottom: "20px" }} />
                <Title variant='h5' gutterBottom className='title'>
                    Live Stream
                </Title>
                <iframe
                    title='3'
                    width='640'
                    height='360'
                    src='https://www.youtube.com/embed/ZG5nE0rd4BM'
                    frameBorder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                />
            </div>
        </Layout>
    );
};
export default Restreamer;
