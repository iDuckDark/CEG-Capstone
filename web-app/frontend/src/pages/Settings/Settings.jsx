/* eslint-disable react/prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import {
    mapDispatchToProps,
    connectPropsWithStyles,
} from "../../helpers/actions";
import {
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Typography,
    Container,
} from "../../helpers/material-ui";
import { SEO, Title, Layout } from "../../helpers/components";
import { isServerSideRendering } from "../../helpers/utils";
import logo from "../../../static/images/animated-logo.gif";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            valid: false,
            piUrl: "",
            displayURL: "",
        };
        this.handleURLChange = this.handleURLChange.bind(this);
    }

    componentDidMount() {
        const { actions } = this.props;
        if (actions) {
            actions.getIP().then(() => {
                const { ip: ips } = this.props;
                const { ip } = ips[ips.length - 1];
                this.setState({ displayURL: ip });
            });
        }
    }

    responseGoogle = response => {
        // eslint-disable-next-line no-console
        console.log("Google Response: ", response);
        const { email, password } = this.state;
        const { profileObj } = response;
        const authorized = [
            "ngane103@uottawa.ca",
            "nevinganesan@gmail.com",
            "pfara039@uottawa.ca",
            "daror101@uottawa.ca",
            "pabou049@uottawa.ca",
            "spate127@uottawa.ca",
        ];
        const valid =
            authorized.includes(profileObj.email) &&
            email === "capstone" &&
            password === "capstone";
        this.setState({ valid });
    };

    changeIP(piUrl) {
        const { actions } = this.props;
        actions.setIP(piUrl).then(() => {
            if (!isServerSideRendering()) {
                this.setIP();
            }
        });
    }

    handleURLChange(event) {
        const { value } = event.target;
        this.setState({ piUrl: value });
    }

    renderSettings() {
        const { piUrl, displayURL } = this.state;
        const { classes } = this.props;
        return (
            <>
                <SEO title='Settings' />
                <div
                    className='center-horizontal'
                    style={{
                        marginTop: "20px",
                        marginBottom: "18%",
                        color: "#FFFFFF",
                    }}
                >
                    <Title variant='h5' gutterBottom className='title'>
                        Settings
                    </Title>
                    <br />
                    <div
                        style={{
                            // width: "90%",
                            textAlign: "center",
                        }}
                    >
                        <b> Current URL: </b> <br />
                        {displayURL}
                    </div>
                    <div
                        style={{
                            textAlign: "center",
                            margin: "20px",
                        }}
                    >
                        <input
                            id='input'
                            type='input'
                            color='primary'
                            style={{
                                width: "250px",
                                color: "#FFFFFF",
                                background: "transparent",
                                border: "none",
                                borderBottom: "1px solid #FFFFFF",
                                borderRadius: "5px",
                            }}
                            onChange={e => this.handleURLChange(e)}
                            value={piUrl}
                            // placeholder={workingUrl}
                        />
                    </div>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => {
                            this.changeIP(piUrl);
                        }}
                    >
                        Update
                    </Button>
                    <br />
                    <GoogleLogout
                        render={renderProps => (
                            <Button
                                onClick={() => {
                                    renderProps.onClick();
                                    this.setState({ valid: false });
                                }}
                                variant='contained'
                                color='secondary'
                                className={classes.submit}
                            >
                                Logout
                            </Button>
                        )}
                        clientId={process.env.GATSBY_GOOGLE_CLIENT_ID}
                        buttonText='Logout'
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                    />
                </div>
            </>
        );
    }

    renderLogin() {
        const { classes } = this.props;
        return (
            <Container component='main' maxWidth='xs'>
                <SEO title='Login' />
                <CssBaseline />
                <div className={classes.paper}>
                    <img
                        src={logo}
                        style={{
                            width: "150px",
                        }}
                        alt='logo'
                    />
                    <Typography component='h1' variant='h5'>
                        Sign In
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            onChange={e =>
                                this.setState({ email: e.target.value })
                            }
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Username'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            InputLabelProps={{
                                style: { color: "#fff" },
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                },
                                inputMode: "numeric",
                                style: { color: "#fff" },
                            }}
                            color='secondary'
                        />
                        <TextField
                            onChange={e =>
                                this.setState({ password: e.target.value })
                            }
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            InputLabelProps={{
                                classes: {},
                                style: { color: "#fff" },
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                },
                                inputMode: "numeric",
                                style: { color: "#fff" },
                            }}
                            color='secondary'
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value='remember'
                                    color='secondary'
                                    style={{ color: "#fff" }}
                                />
                            }
                            label='Remember me'
                        />
                        <GoogleLogin
                            render={renderProps => (
                                <Button
                                    onClick={() => {
                                        renderProps.onClick();
                                    }}
                                    fullWidth
                                    variant='contained'
                                    color='secondary'
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                            )}
                            clientId={process.env.GATSBY_GOOGLE_CLIENT_ID}
                            buttonText='Login'
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                        />
                    </form>
                </div>
            </Container>
        );
    }

    render() {
        const { valid } = this.state;
        return (
            <Layout>
                {valid && this.renderSettings()}
                {!valid && this.renderLogin()}
            </Layout>
        );
    }
}

const mapStateToProps = ({ actionReducer }) => {
    return {
        users: actionReducer.users,
        ssar: actionReducer.ssar,
        ip: actionReducer.ip,
    };
};

Settings.defaultProps = {
    actions: null,
    ip: null,
};

Settings.propTypes = {
    actions: PropTypes.any,
    ip: PropTypes.any,
};

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#FFFFFF",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cssLabel: {
        color: "#cd4391",
    },
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: `#d04290 !important`,
        },
    },
    cssFocused: {},
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "white !important",
    },
});

export default connectPropsWithStyles(
    Settings,
    mapStateToProps,
    mapDispatchToProps,
    styles
);
