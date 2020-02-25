import React from "react";
import PropTypes from "prop-types";
import Link from "../Routers/Link";

const NavButton = props => {
    const { link, title, component: NavComponent, loadable, ...other } = props;
    const linker = link || `/${title.toLowerCase().replace(/ /g, "-")}`;
    return (
        <NavComponent color='inherit' component={Link} to={linker} {...other}>
            {title}
        </NavComponent>
    );
};

NavButton.defaultProps = {
    component: null,
    loadable: null,
    link: null,
    title: null,
};

NavButton.propTypes = {
    component: PropTypes.any,
    loadable: PropTypes.any,
    link: PropTypes.string,
    title: PropTypes.string,
};

export default NavButton;
