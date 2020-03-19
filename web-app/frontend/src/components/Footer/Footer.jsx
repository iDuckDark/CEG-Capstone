import React from "react";

const Footer = () => {
    return (
        <footer style={{ textAlign: "center" }}>
            Copyright © {new Date().getFullYear()}, Built Source
            {` `}
            <a href='https://github.com/iDuckDark/CEG-Capstone'>Code</a> {` `},
            <a href='https://trello.com/b/1iLa3eKF/ceg-4912-capstone'>Trello</a>{" "}
            {` `} and
            <a href='https://ceg-capstone.herokuapp.com/'> Server </a>
        </footer>
    );
};

export default Footer;
