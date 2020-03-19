import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Switch,
    Route,
    BrowserRouter,
    Link,
    useHistory,
} from "react-router-dom";
import { routes } from "../../routes";

import IndexPage from "../../pages/index";
import Gallery2 from "../../pages/Gallery/Gallery";

import { isServerSideRendering } from "../../helpers/utils";

const components = {
    "/": <IndexPage />,
    "/architecture": <Gallery2 />,
    "/gallery": <Gallery2 />,
    "/members": <Gallery2 />,
    "/about": <Gallery2 />,
    "/feedback": <Gallery2 />,
};

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer() {
    const classes = useStyles();
    const [open] = React.useState(false);
    const [currentPath, setCurrentPath] = React.useState(
        isServerSideRendering() ? "" : window.location.pathname
    );

    const handleRoute = path => {
        if (!isServerSideRendering()) window.location.pathname = path;
    };

    return (
        <div>
            <BrowserRouter>
                <CssBaseline />
                <AppBar
                    position='fixed'
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                />
                <Drawer
                    variant='permanent'
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <Divider />
                    <List>
                        {routes.map(item => {
                            const text = item.title;
                            const { icon, path } = item;
                            return (
                                <ListItem
                                    button
                                    key={text}
                                    onClick={() => {
                                        handleRoute(path);
                                        setCurrentPath(path);
                                    }}
                                >
                                    <ListItemIcon
                                        style={{
                                            color:
                                                currentPath === path
                                                    ? "#d04290"
                                                    : "#FFFFFF",
                                        }}
                                    >
                                        <Link
                                            to={path}
                                            style={{
                                                color:
                                                    currentPath === path
                                                        ? "#d04290"
                                                        : "#FFFFFF",
                                            }}
                                        >
                                            <FontAwesomeIcon icon={icon} />
                                        </Link>
                                    </ListItemIcon>
                                    <ListItemText
                                        style={{
                                            color: "#FFFFFF",
                                            fontFamily: "Raleway !important",
                                        }}
                                        primary={text}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </Drawer>
                <main>
                    {/* <BrowserRouter> */}
                    <Switch>
                        {/* <Route exact path='/' /> */}
                        {routes.map(item => {
                            const { path } = item;
                            // const Comp = components[path];
                            return (
                                <Route
                                    key={path}
                                    exact
                                    path={path}
                                    // render={() => <Comp />}
                                />
                            );
                        })}
                    </Switch>
                    {/* </BrowserRouter> */}
                </main>
            </BrowserRouter>
        </div>
    );
}

// color: "#d04290",
