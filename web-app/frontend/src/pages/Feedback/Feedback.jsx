import React from "react";
// import Board from "react-trello";
import Layout from "../../components/layout";
import Title from "../../components/Titles/Title";
// import SEO from "../../components/seo";

const data = {
    lanes: [
        {
            id: "lane2",
            title: "Completed",
            label: "0/0",
            cards: [],
        },
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
            {/* <SEO title='Feedback' /> */}
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    marginTop: "2%",
                    marginBottom: "15%",
                    textAlign: "center",
                }}
            >
                <Title
                    variant='h5'
                    gutterBottom
                    className='title'
                    style={{ color: "#FFFFFF" }}
                >
                    Feedback
                </Title>
                <div
                    style={{
                        paddingLeft: "30px",
                    }}
                >
                    {/* <Board data={data} editable /> */}
                </div>
            </div>
        </Layout>
    );
};
export default Feedback;
