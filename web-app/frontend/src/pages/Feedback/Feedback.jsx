import React, { Component } from "react";
import Layout from "../../components/layout";
import Title from "../../components/Titles/Title";
import Board from "react-trello";

const data = {
    lanes: [
        {
            id: "lane1",
            title: "Planned Tasks",
            label: "2/2",
            cards: [
                {
                    id: "Card1",
                    title: "Eg: Feedback:",
                    description: "Can AI make memes",
                    label: "30 mins",
                    draggable: false,
                },
                {
                    id: "Card2",
                    title: "Test Raspberry Pi Cam",
                    description: "IR Camera",
                    label: "5 mins",
                    metadata: { sha: "be312a1" },
                },
            ],
        },
        {
            id: "lane2",
            title: "Completed",
            label: "0/0",
            cards: [],
        },
    ],
};

const Feedback = () => {
    return (
        <Layout>
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    marginTop: "2%",
                    marginBottom: "15%",
                    textAlign: "center",
                }}
            >
                <Title variant='h5' gutterBottom className='title'>
                    Feedback
                </Title>
                <Board data={data} editable/>
                {/* <iframe
                    width='640'
                    height='360'
                    src='https://www.youtube.com/embed/ZG5nE0rd4BM'
                    frameborder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowfullscreen
                ></iframe> */}
            </div>
        </Layout>
    );
};
export default Feedback;
