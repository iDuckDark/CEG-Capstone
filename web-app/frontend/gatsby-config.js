module.exports = {
    siteMetadata: {
        title: `HoverX`,
        description: `CEG Capstone Project by Nevin, Peter, Divyang, Paul & Shail`,
        author: `@Nevin`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        "gatsby-plugin-sass",
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-json`,
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "dataPrivate",
                path: `${__dirname}/src/data`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/static/images`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `CEG-Capstone`,
                short_name: `CEG-Capstone`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `static/images/favicon.png`,
            },
        },
    ],
};
