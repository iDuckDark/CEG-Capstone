/* eslint-disable react/prop-types */
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import logo from "../../../static/images/animated-logo.gif";
import { mapDispatchToProps } from "../../helpers/actions";
import { SEO, Title } from "../../helpers/components";
import { isServerSideRendering } from "../../helpers/utils";

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
    //
    cssLabel: {
        color: "#cd4391",
    },

    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: `${theme.palette.secondary.main} !important`,
        },
    },

    cssFocused: {},

    notchedOutline: {
        borderWidth: "1px",
        borderColor: "white !important",
    },
});

class Login extends Component {
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
        this.setIP();
    }

    setIP() {
        const { actions } = this.props;
        actions.getIP().then(() => {
            const { ip: ips } = this.props;
            const { ip } = ips[ips.length - 1];
            // eslint-disable-next-line no-console
            console.log("IP: ", ip);
            this.setState({ displayURL: ip });
        });
    }

    changeIP(piUrl) {
        const { actions } = this.props;
        actions.setIP(piUrl).then(() => {
            // eslint-disable-next-line no-console
            console.log("Done changing ip.");
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
                </div>
            </>
        );
    }

    renderLogin() {
        const { classes } = this.props;
        const { email, password } = this.state;
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
                            label='Email Address'
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
                                className: { color: "white" },
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
                            defaultValue='color'
                            InputLabelProps={{
                                classes: {},
                                style: { color: "#fff" },
                                className: { color: "white" },
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                },
                                inputMode: "numeric",
                                style: { color: "#fff" },
                                className: { color: "white" },
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
                        <Button
                            // type='submit'
                            fullWidth
                            variant='contained'
                            color='secondary'
                            className={classes.submit}
                            onClick={() => {
                                const valid =
                                    email === "capstone" &&
                                    password === "capstone";
                                this.setState({ valid });
                            }}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }

    render() {
        const { valid } = this.state;
        return (
            <>
                {valid && this.renderSettings()}
                {!valid && this.renderLogin()}
            </>
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

Login.defaultProps = {
    actions: null,
    ip: null,
};

Login.propTypes = {
    actions: PropTypes.any,
    ip: PropTypes.any,
};

export default withStyles(styles, { withTheme: true })(
    isServerSideRendering()
        ? Login
        : connect(mapStateToProps, mapDispatchToProps)(Login)
);
