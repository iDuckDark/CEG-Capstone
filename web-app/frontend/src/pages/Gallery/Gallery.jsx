import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Gallery from "react-photo-gallery";
import { SEO, Layout, Title } from "../../helpers/components";

const query = graphql`
    query {
        allGalleryJson {
            nodes {
                src {
                    childImageSharp {
                        fixed {
                            ...GatsbyImageSharpFixed_withWebp
                        }
                    }
                }
                width
                height
            }
        }
    }
`;

const Gallery2 = () => (
    <StaticQuery
        query={query}
        render={({ allGalleryJson: { nodes } }) => {
            const pictures = [];
            for (const i in nodes) {
                const { src } = nodes[i].src.childImageSharp.fixed;
                const { width, height } = nodes[i];
                pictures.push({ src, width, height });
            }
            return (
                <Layout>
                    <SEO title='Gallery' />
                    <div
                        className='center-horizontal'
                        style={{
                            marginTop: "20px",
                            marginBottom: "18%",
                            backgroundColor: "#2b2e43",
                            paddingLeft: "150px",
                            paddingRight: "50px",
                        }}
                    >
                        <Title
                            variant='h5'
                            gutterBottom
                            className='title'
                            style={{ color: "#FFFFFF" }}
                        >
                            Gallery
                        </Title>
                        <Gallery photos={pictures} />
                    </div>
                </Layout>
            );
        }}
    />
);

export default Gallery2;
