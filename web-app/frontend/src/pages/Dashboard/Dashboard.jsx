import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../helpers/actions";
import { isServerSideRendering } from "../../helpers/utils";

import logo from "../../images/favicon.png";

import Map from "./Map";
// import Restreamer from "../Restreamer/Restreamer";
import Thermometer from "react-thermometer-component";
import ReactSpeedometer from "react-d3-speedometer";
import GaugeChart from 'react-gauge-chart';

// Reference
// https://github.com/mariusandra/pigeon-maps
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            ssar: "",
            pressure: 0,
            altitude: 0,
            temperature: 0,
            index: 0,
        };
    }

    componentDidMount() {
        this.callAPI();
    }

    callAPI() {
        const { actions } = this.props;
        actions.getUsers().then(() => {
            const { users } = this.props;
            console.log("API is working: ", users);
            this.setState({ apiResponse: users });
        });

        actions.getSSAR().then(() => {
            const { ssar } = this.props;
            console.log("Drone: ", ssar);
            const first = ssar[0];
            const { altitude, pressure, temperature } = first;
            this.setState({ ssar, altitude, pressure, temperature });

            setInterval(() => {
                let { index } = this.state;
                index = (index + 1) % ssar.length;
                const { altitude, pressure, temperature } = ssar[index];
                this.setState({ index, altitude, pressure, temperature });
            }, 500);
        });
    }

    renderSpeedometer(value, label) {
        value = Math.round(value * 100) / 100;
        return (
            <div style={{ height: "100px", width: "200px" }}>
                <ReactSpeedometer
                    // width={300}
                    height={200}
                    forceRender={true}
                    maxValue={value * 1.5}
                    value={value}
                    needleColor='red'
                    needleTransition='easeElastic'
                    needleTransitionDuration={50}
                    // startColor='green'
                    segments={5}
                    // endColor='blue'
                    // startColor='#27ae60'
                    // endColor='#c0392b'
                    currentValueText={`${label} : ${value}`}
                />
            </div>
        );
    }

    renderSpeedometers() {
        const { altitude, pressure } = this.state;
        return (
            <>
                <div style={{ display: "inline-block", marginLeft: "20%" }}>
                    {this.renderSpeedometer(altitude, "Altitude")}
                </div>
                <div style={{ display: "inline-block", marginLeft: "20%" }}>
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
                    // marginBottom: "50%",
                    zIndex: "2",
                    position: "absolute",
                    // float: "right"
                    // display: "absolute",
                }}
            >
                <Thermometer
                    theme='dark'
                    value={temperature}
                    max='40'
                    // steps='5'
                    min='20'
                    format='°C'
                    size='large'
                    height='300'
                />
            </div>
        );
    }

    render() {
        return (
            <div
                style={{ height: "100vh", width: "100%", marginBottom: "15%" }}
            >
                {/* <Restreamer /> */}
                {this.renderSpeedometers()}
                {this.renderTemp()}
                <Map />
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

export default isServerSideRendering()
    ? Dashboard
    : connect(mapStateToProps, mapDispatchToProps)(Dashboard);

{
    /* <Map
                    center={[45.4112, -75.6981]}
                    provider={providers["osm"]}
                    zoom={12}
                    width={800}
                    height={400}
                >
                    <Marker
                        anchor={[45.4112, -75.6981]}
                        payload={1}
                        onClick={({ event, anchor, payload }) => {}}
                    />

                    <Marker
                        anchor={[45.4212, -75.6981]}
                        offset={[10, 9]}
                        payload={1}
                        onClick={({ event, anchor, payload }) => {}}
                    />

                    <Overlay anchor={[45.4321, -75.6831]}>
                        <img src={logo} width={50} height={50} alt='' />
                    </Overlay>
                </Map> */
}
