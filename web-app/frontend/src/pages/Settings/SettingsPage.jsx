import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../helpers/actions";
import { SEO, Title } from "../../helpers/components";
import { isServerSideRendering } from "../../helpers/utils";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = { piUrl: "", displayURL: "" };
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

    render() {
        return <>{this.renderSettings()}</>;
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

export default isServerSideRendering()
    ? Settings
    : connect(mapStateToProps, mapDispatchToProps)(Settings);
