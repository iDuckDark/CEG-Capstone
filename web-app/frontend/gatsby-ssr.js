/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/gatsby-ssr.js
import storeProvider from "./src/redux/storeProvider";

export const wrapRootElement = storeProvider;
