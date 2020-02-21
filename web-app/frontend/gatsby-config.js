module.exports = {
  siteMetadata: {
    title: `CEG Capstone Project Winter 2020 - Fall 2020`,
    description: `CEG Capstone Project by Nevin, Peter, Divyang and Paul`,
    author: `@Nevin`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-sass',
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `CEG-Capstone`,
        short_name: `CEG-Capstone`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    // `gatsby-plugin-offline`,
  ],
}
