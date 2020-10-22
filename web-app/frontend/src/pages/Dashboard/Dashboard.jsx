/* eslint-disable react/sort-comp */
/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Thermometer from "react-thermometer-component";
import ReactSpeedometer from "react-d3-speedometer";
import { mapDispatchToProps } from "../../helpers/actions";
import { Paper, Grid } from "../../helpers/material-ui";
import {
    Altitude,
    Map as PigeonMap,
    Pressure,
    Sound,
    Speed,
    Temperature,
} from "../../helpers/components";
import {
    isServerSideRendering,
    detectMob,
    cleanerFloat,
} from "../../helpers/utils";
import Example from "./Example";
import "./Dashboard.css";
// import Music from "./Music";

// const stopVideo = element => {
//     const iframe = element.querySelector("iframe");
//     const video = element.querySelector("video");
//     if (iframe) {
//         const iframeSrc = iframe.src;
//         iframe.src = iframeSrc;
//         console.log(video);
//     }
//     if (video) {
//         video.pause();
//     }
// };

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
            gps2: null,
            piUrl: null,
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

    generateGPS() {
        setInterval(() => {
            const { gps } = this.state;
            const { lat, lon } = gps;
            const rand = (min, max) => Math.random() * (max - min) + min;
            const intervals = 5;
            const newGps = {
                lat: rand(lat - intervals, lat + intervals),
                lon: rand(lon - intervals, lon + intervals),
            };
            this.setState({ gps2: newGps });
        }, 300);
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
            // this.generateGPS();
        });
    }

    setIP() {
        const { actions } = this.props;
        actions
            .getIP()
            .then(() => {
                const { ip: ips } = this.props;
                const { ip } = ips[ips.length - 1];
                this.setState({ piUrl: ip });
                console.log("Video URL Address:", ip);
            })
            .catch(() => {});
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
        // const { width, height } = this.state;
        return (
            <Paper>
                <div
                    id='_id'
                    style={{
                        borderRadius: "20px",
                        float: "left",
                    }}
                    className='container'
                >
                    <iframe
                        title='3'
                        // width={width * 0.9}
                        // height={height / 1.6}
                        src={piUrl}
                        modestbranding='1'
                        frameBorder='0'
                        controls='0'
                        style={{ border: 0 }}
                        onErrorCapture={error => {
                            console.log("iframe", error);
                        }}
                        // onLoadStart={() => {
                        //     console.log("loaded");
                        // }}
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        className='responsive-iframe'
                    />
                </div>
                {this.renderMap()}
            </Paper>
        );
    }

    renderMap() {
        const { gps } = this.state;
        if (!gps) return null;
        const { lat, lon } = gps;

        return (
            <div
                style={{
                    float: "left",
                }}
            >
                <Paper
                    style={{
                        backgroundColor: "#2f3247",
                        paddingTop: "15px",
                    }}
                >
                    <div
                        style={{
                            color: "#bdc3c7",
                            marginLeft: "10px",
                            marginBottom: "10px",
                            fontSize: "20px",
                            textAlign: "center",
                        }}
                    >
                        <a
                            href={`https://www.google.pl/maps/place/${lat},${lon}/@${lat},${lon},10z`}
                            style={{
                                color: "#bdc3c7",
                            }}
                        >
                            GPS <br />
                            <div style={{ fontSize: "20px" }}>
                                ({lat},{lon})
                            </div>
                        </a>
                    </div>
                    <div>
                        <PigeonMap lat={gps.lat} lon={gps.lon} />
                    </div>
                </Paper>
            </div>
        );
    }

    render() {
        const { temperatures, altitudes, pressures, gps } = this.state;
        const graphs = [
            {
                name: "Speed (mph)",
                component: (
                    <Speed data={[...temperatures.slice(0, 20)]} name='Speed' />
                ),
                color: "#02aab0",
            },
            {
                name: "Temperature °C",
                component: (
                    <Temperature data={temperatures} name='Temperature' />
                ),
                color: "#8884d8",
            },
            {
                name: "Altitude (ft)",
                component: <Altitude data={altitudes} name='Altitude' />,
                component2: <Example data={altitudes} />,
                color: "#ef629f",
            },
            {
                name: "Pressure (Pa)",
                component: <Pressure data={pressures} name='Pressure' />,
                color: "#ffd194",
            },
            {
                name: "Sound (dB)",
                component: <Sound data={pressures} name='Sound' />,
                color: "#74b9ff",
            },
        ];
        if (
            !(
                temperatures.length > 0 &&
                altitudes.length > 0 &&
                pressures.length > 0 &&
                gps.lat !== null &&
                gps.lon !== null
            )
        )
            return <> </>;
        if (!gps) return null;
        return (
            <div style={{ backgroundColor: "#2b2e43", paddingLeft: "8%" }}>
                {this.renderVideo()}
                <div>
                    <Grid container spacing={1}>
                        {graphs.map(graph => {
                            const { component, color, name } = graph;
                            return (
                                <Paper
                                    key={name}
                                    style={{ backgroundColor: "#2f3247" }}
                                >
                                    <div
                                        style={{
                                            color,
                                            paddingTop: "15px",
                                            marginLeft: "10px",
                                            fontSize: "20px",
                                        }}
                                    >
                                        {name}
                                    </div>
                                    {component}
                                </Paper>
                            );
                        })}
                    </Grid>
                </div>
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
