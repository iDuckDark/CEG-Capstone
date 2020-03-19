import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import Thermometer from "react-thermometer-component";
import ReactSpeedometer from "react-d3-speedometer";
import Title from "../../components/Titles/Title";
import { mapDispatchToProps } from "../../helpers/actions";
import { isServerSideRendering, detectMob } from "../../helpers/utils";
import Map from "./Map";

const defaultUrl = "http://45.72.149.128:8000/";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressure: 0,
            altitude: 0,
            temperature: 0,
            index: 0,
            piUrl: defaultUrl,
        };
        this.handleURLChange = this.handleURLChange.bind(this);
    }

    componentDidMount() {
        this.setAPIs();
    }

    setAPIs() {
        const { actions } = this.props;
        actions.getUsers().then(() => {
            const { users } = this.props;
            // eslint-disable-next-line no-console
            console.log("API is working: ", users);
        });
        this.setSSAR();
    }

    setSSAR() {
        const { actions } = this.props;
        actions.getSSAR().then(() => {
            const { ssar } = this.props;
            const first = ssar[0];
            const { altitude, pressure, temperature } = first;
            this.setState({ altitude, pressure, temperature });
            this.setSSARInterval(ssar);
        });
    }

    setSSARInterval(ssar) {
        setInterval(() => {
            let { index } = this.state;
            index = (index + 1) % ssar.length;
            const { altitude, pressure, temperature } = ssar[index];
            this.setState({ index, altitude, pressure, temperature });
        }, 500);
    }

    handleURLChange(event) {
        const piUrl = event.target.value;
        if (piUrl) this.setState({ piUrl });
        else this.setState({ piUrl: defaultUrl });
    }

    renderSpeedometer(val, label) {
        const value = Math.round(val * 100) / 100;
        return (
            <div style={{ height: "100px", width: "200px" }}>
                <ReactSpeedometer
                    height={200}
                    forceRender
                    maxValue={value * 1.5}
                    value={value}
                    needleColor='red'
                    needleTransition='easeElastic'
                    needleTransitionDuration={50}
                    segments={5}
                    currentValueText={`${label} : ${value}`}
                />
            </div>
        );
    }

    renderSpeedometers() {
        const { altitude, pressure } = this.state;
        const marginLeft = detectMob() ? "8%" : "20%";
        const style = { display: "inline-block", marginLeft };
        return (
            <>
                <div style={style}>
                    {this.renderSpeedometer(altitude, "Altitude")}
                </div>
                <div style={style}>
                    {this.renderSpeedometer(pressure, "Pressure")}
                </div>
            </>
        );
    }

    renderTemp() {
        let { temperature } = this.state;
        temperature = Math.round(temperature * 100) / 100;
        return (
            <div
                style={{
                    marginLeft: "16%",
                    marginTop: "8%",
                    zIndex: "2",
                    position: "absolute",
                }}
            >
                <Thermometer
                    theme='dark'
                    value={temperature}
                    max='40'
                    min='20'
                    format='°C'
                    size='large'
                    height='300'
                />
            </div>
        );
    }

    renderVideo() {
        const { piUrl } = this.state;
        return (
            <div>
                {/* <Title variant='h5' gutterBottom className='title'>
                    Live Stream (Input)
                </Title> */}
                <div style={{ textAlign: "center" }}>
                    <TextField
                        id='input'
                        type='input'
                        onChange={this.handleURLChange}
                        value={piUrl}
                        // style={{ width: "360px" }}
                        placeholder={defaultUrl}
                    />
                </div>{" "}
                <iframe
                    title='3'
                    width='1080'
                    height='640'
                    // style={{ margin: "0 auto" }}
                    src={piUrl}
                    frameBorder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                />
            </div>
        );
    }

    render() {
        return (
            <div
                style={{ height: "100vh", width: "100%", marginBottom: "15%" }}
            >
                {this.renderSpeedometers()}
                {this.renderTemp()}
                <Map />
                {this.renderVideo()}
            </div>
        );
    }
}

const mapStateToProps = ({ actionReducer }) => {
    return {
        users: actionReducer.users,
        ssar: actionReducer.ssar,
    };
};

Dashboard.defaultProps = {
    actions: null,
    ssar: null,
    users: null,
};

Dashboard.propTypes = {
    actions: PropTypes.any,
    ssar: PropTypes.any,
    users: PropTypes.any,
};

export default isServerSideRendering()
    ? Dashboard
    : connect(mapStateToProps, mapDispatchToProps)(Dashboard);
