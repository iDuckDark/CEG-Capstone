import React from "react";
import { Typography, Card, CardContent, CardMedia } from "@material-ui/core";
import Layout from "../../components/layout";
import Title from "../../components/Titles/Title";

import "./Members.scss";
import logo from "../../assets/members/Nevin.jpg";
import logo2 from "../../assets/members/Peter.jpg";
import logo3 from "../../assets/members/Divyang.jpg";
import logo4 from "../../assets/members/Paul.jpg";
import logo5 from "../../assets/members/Shail.jpg";

const imageStyle = {
    margin: "16px auto 0",
    borderRadius: "50%",
    width: "166px",
    maxWidth: "100%",
    height: "166px",
    display: "block",
    WebkitBorderRadius: "50%",
    WebkitBoxShadow: "0 0 0 8px rgba(0, 0, 0, 0.06)",
    boxShadow: "0 0 0 8px rgba(0, 0, 0, 0.06)",
};

const members = [
    {
        name: "Peter",
        email: "pfara039@uottawa.ca",
        position: "Product Owner & Full-Stack Developer",
        src: logo2,
    },
    {
        name: "Nevin",
        email: "ngane103@uottawa.ca",
        position: "Scrum Master & Full-Stack Developer",
        src: logo,
    },
    {
        name: "Divyang",
        email: "daror101@uottawa.ca",
        position: "Machine Learning Developer & UX-Designer ",
        src: logo3,
    },
    {
        name: "Paul",
        email: "pabou049@uottawa.ca",
        position: "Reseacher & Project Consultant ",
        src: logo4,
    },
    {
        name: "Shail",
        email: "spate127@uottawa.ca",
        position: "Reseacher & Quality Assurance",
        src: logo5,
    },
];

const Members = () => {
    return (
        <Layout>
            <div className='center-horizontal' style={{ marginTop: "20px" }}>
                <Title variant='h5' gutterBottom className='title'>
                    Members
                </Title>
                <div>
                    {members.map((item, key) => {
                        return (
                            <div
                                key={String(key)}
                                style={{
                                    display: "inline-block",
                                    marginLeft: "1%",
                                }}
                            >
                                <Card
                                    style={{
                                        margin: "16px 16px",
                                        width: "280px",
                                        // display:"inline"
                                    }}
                                >
                                    <CardMedia
                                        component='img'
                                        height='166'
                                        image={item.src}
                                        src={item.src}
                                        title={item.src}
                                        style={imageStyle}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant='h5'
                                            className='center-horizontal'
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography
                                            component='p'
                                            className='center-horizontal'
                                        >
                                            {item.position}
                                        </Typography>
                                        {item.email}
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};
export default Members;
