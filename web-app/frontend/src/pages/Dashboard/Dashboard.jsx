import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Thermometer from "react-thermometer-component";
import ReactSpeedometer from "react-d3-speedometer";
import { mapDispatchToProps } from "../../helpers/actions";
import { Paper, Grid } from "../../helpers/material-ui";
import { Map, Temperature, Altitude, Pressure } from "../../helpers/components";
import { isServerSideRendering, detectMob } from "../../helpers/utils";
import { getVideoUrl, setVideoUrl } from "../../helpers/settings";

// const defaultUrl = "https://45.72.149.128:8000/";
// const defaultUrl = "https://www.youtube.com/embed/Q-TEYBltFis";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        const width = isServerSideRendering() ? 1080 : window.innerWidth;
        const height = isServerSideRendering() ? 600 : window.innerHeight;
        this.state = {
            pressure: 0,
            altitude: 0,
            temperature: 0,

            pressures: [],
            altitudes: [],
            temperatures: [],

            index: 0,
            width,
            height,
            piUrl: getVideoUrl(),
        };
        // this.handleURLChange = this.handleURLChange.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        this.setAPIs();
        if (!isServerSideRendering())
            window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        if (!isServerSideRendering())
            window.removeEventListener("resize", this.updateDimensions);
    }

    getArrayfromKey(array, key) {
        const result = [];
        for (const item of array) {
            result.push({ value: item[key], date: item.time });
        }
        return result;
    }

    getArrayfromKeyPV(array, key) {
        return this.formatArray(this.getArrayfromKey(array, key));
    }

    // eslint-disable-next-line react/sort-comp
    updateDimensions() {
        if (!isServerSideRendering())
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight,
            });
    }

    setAPIs() {
        const { actions } = this.props;
        actions.getUsers().then(() => {
            const { users } = this.props;
            // eslint-disable-next-line no-console
            console.log("API is working: ", users);
        });
        this.setSSAR();
        this.setIP();
    }

    formatArray(array) {
        const data = [];
        for (const i in array) {
            const item = array[i];
            const d = new Date(item.date * 1000);

            const dformat = `${[
                d.getMonth() + 1,
                d.getDate(),
                d.getFullYear(),
            ].join("/")} ${[d.getHours(), d.getMinutes(), d.getSeconds()].join(
                ":"
            )}`;
            data.push({
                date: dformat,
                pv: Math.round(item.value * 100) / 100,
            });
        }
        return data;
    }

    setSSAR() {
        const { actions } = this.props;
        actions.getSSAR().then(() => {
            const { ssar } = this.props;
            const ssar2 = ssar;
            // All
            const temperatures = this.getArrayfromKeyPV(ssar2, "temperature");
            const altitudes = this.getArrayfromKeyPV(ssar2, "altitude");
            const pressures = this.getArrayfromKeyPV(ssar2, "pressure");
            const gps = { lat: ssar2[0].lat, lon: ssar2[0].lon };

            this.setState({ temperatures, altitudes, pressures, gps });
            // Cyclic
            const first = ssar2[0];
            const { altitude, pressure, temperature } = first;
            this.setState({ altitude, pressure, temperature });
            // this.setSSARInterval(ssar2);
        });
    }

    setIP() {
        const { actions } = this.props;
        actions
            .getIP()
            .then(() => {
                const { ip: ips } = this.props;
                const { ip } = ips[ips.length - 1];
                const formatted = ip;
                this.setState({ piUrl: ip });
                setVideoUrl(formatted);
                // eslint-disable-next-line no-console
                console.log("Formatted IP:", formatted);
            })
            .catch(() => {
                this.setState({ piUrl: getVideoUrl() });
            });
    }

    formatIP(ip) {
        return `https://${ip}:8000`;
    }

    setSSARInterval(ssar) {
        setInterval(() => {
            let { index } = this.state;
            index = (index + 1) % ssar.length;
            const { altitude, pressure, temperature } = ssar[index];
            this.setState({ index, altitude, pressure, temperature });
        }, 500);
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
        const { width, height } = this.state;
        return (
            <div>
                <div
                    style={{
                        textAlign: "center",
                        marginLeft: "5%",
                        marginRight: "5%",
                    }}
                >
                    <iframe
                        title='3'
                        width={width * 0.9}
                        height={height / 1.6}
                        src={piUrl}
                        frameBorder='0'
                        style={{ border: 0 }}
                        onErrorCapture={error => {
                            // eslint-disable-next-line no-console
                            console.log("iframe", error);
                        }}
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    />
                </div>
            </div>
        );
    }

    render() {
        // const graphs = [<Temperature />, <Altitude />, <Pressure />];
        const { temperatures, altitudes, pressures, gps } = this.state;
        if (
            !(
                temperatures.length > 0 &&
                altitudes.length > 0 &&
                pressures.length > 0 &&
                gps.lat !== null &&
                gps.lon !== null
            )
        )
            return <>Loading </>;
        return (
            <div>
                {this.renderVideo()}
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <div
                                style={{
                                    backgroundColor: "#2b2e43",
                                    textAlign: "right",
                                    paddingLeft: "90px",
                                }}
                            >
                                <Map lat={gps.lat} lon={gps.lon} />
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <Paper style={{ backgroundColor: "#2f3247" }}>
                                <div
                                    style={{
                                        color: "#02aab0",
                                        paddingTop: "10px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Temperature
                                </div>
                                <Temperature data={temperatures} />
                            </Paper>
                        </Grid>

                        <Grid item xs={3}>
                            <Paper style={{ backgroundColor: "#2f3247" }}>
                                <div
                                    style={{
                                        color: "#ef629f",
                                        paddingTop: "10px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Altitude
                                </div>
                                <Altitude data={altitudes} />
                            </Paper>
                        </Grid>

                        <Grid item xs={3}>
                            <Paper style={{ backgroundColor: "#2f3247" }}>
                                <div
                                    style={{
                                        color: "#ffd194",
                                        paddingTop: "10px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Pressure
                                </div>
                                <Pressure data={pressures} />
                            </Paper>
                        </Grid>

                        {/* {graphs.map((graph, key) => {
                            return (
                                <Grid key={String(key)} item xs={3}>
                                    <Paper>{graph}</Paper>
                                </Grid>
                            );
                        })} */}
                    </Grid>
                </div>

                {/* {this.renderSpeedometers()} */}
                {/* {this.renderTemp()} */}
                {/* <MapChart /> */}
            </div>
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

Dashboard.defaultProps = {
    actions: null,
    ssar: null,
    users: null,
    ip: null,
};

Dashboard.propTypes = {
    actions: PropTypes.any,
    ssar: PropTypes.any,
    users: PropTypes.any,
    ip: PropTypes.any,
};

export default isServerSideRendering()
    ? Dashboard
    : connect(mapStateToProps, mapDispatchToProps)(Dashboard);
