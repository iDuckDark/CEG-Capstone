import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { Typography, Card, CardContent, CardMedia } from "@material-ui/core";
import { SEO, Layout, Title } from "../../helpers/components";
import "./Members.scss";

const query = graphql`
    query {
        allMembersJson {
            nodes {
                name
                email
                position
                src {
                    childImageSharp {
                        fixed {
                            ...GatsbyImageSharpFixed_withWebp
                        }
                    }
                }
            }
        }
    }
`;

const Members = () => {
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
    return (
        <StaticQuery
            query={query}
            render={({ allMembersJson: { nodes } }) => {
                const members = nodes;
                return (
                    <Layout>
                        <SEO title='Members' />
                        <div
                            className='center-horizontal'
                            style={{
                                marginTop: "20px",
                                color: "#FFFFFF",
                                backgroundColor: "#2b2e43",
                            }}
                        >
                            <Title
                                variant='h5'
                                gutterBottom
                                className='title'
                                style={{ color: "#FFFFFF" }}
                            >
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
                                                    width: "220px",
                                                }}
                                                boxShadow={3}
                                                elevation={10}
                                            >
                                                <CardMedia
                                                    component='img'
                                                    height='166'
                                                    image={
                                                        item.src.childImageSharp
                                                            .fixed.src
                                                    }
                                                    src={
                                                        item.src.childImageSharp
                                                            .fixed.src
                                                    }
                                                    title={
                                                        item.src.childImageSharp
                                                            .fixed.src
                                                    }
                                                    style={imageStyle}
                                                />
                                                <CardContent
                                                    style={{ color: "#FFFFFF" }}
                                                >
                                                    <Typography
                                                        gutterBottom
                                                        variant='h5'
                                                        className='center-horizontal'
                                                        style={{
                                                            color: "#FFFFFF",
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                    <Typography
                                                        component='p'
                                                        className='center-horizontal'
                                                        style={{
                                                            color: "#FFFFFF",
                                                        }}
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
            }}
        />
    );
};
export default Members;
