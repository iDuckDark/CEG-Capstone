/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./src/redux/store";

export function replaceHydrateFunction() {
    return (element, container, callback) => {
        ReactDOM.render(
            <Provider store={store}>{element}</Provider>,
            container,
            callback
        );
    };
}
