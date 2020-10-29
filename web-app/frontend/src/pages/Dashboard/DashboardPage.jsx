import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../helpers/actions";
import { Paper, Grid } from "../../helpers/material-ui";
import { Graph, Map as PigeonMap, SEO } from "../../helpers/components";
import { isServerSideRendering } from "../../helpers/utils";
import "./Dashboard.css";

class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressures: [],
            altitudes: [],
            temperatures: [],
            sound: [],
            piUrl: null,
        };
    }

    componentDidMount() {
        this.setAPIs();
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

    setSSAR() {
        const { actions } = this.props;
        actions.getSSAR().then(() => {
            const { ssar } = this.props;
            const ssar2 = ssar;
            const temperatures = this.getArrayfromKeyPV(ssar2, "temperature");
            const altitudes = this.getArrayfromKeyPV(ssar2, "altitude");
            const pressures = this.getArrayfromKeyPV(ssar2, "pressure");
            const gps = { lat: ssar2[0].lat, lon: ssar2[0].lon };
            this.setState({ temperatures, altitudes, pressures, gps });
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
                // eslint-disable-next-line no-console
                console.log("Video URL Address:", ip);
            })
            .catch(() => {});
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

    renderVideo() {
        const { piUrl } = this.state;
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
                        src={piUrl}
                        modestbranding='1'
                        frameBorder='0'
                        controls='0'
                        style={{ border: 0 }}
                        onErrorCapture={error => {
                            // eslint-disable-next-line no-console
                            console.log("iframe", error);
                        }}
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
            <div style={{ float: "left" }}>
                <Paper
                    style={{ backgroundColor: "#2f3247", paddingTop: "0px" }}
                >
                    <div
                        style={{
                            color: "#bdc3c7",
                            marginLeft: "10px",
                            // marginBottom: "10px",
                            fontSize: "20px",
                            textAlign: "center",
                        }}
                    >
                        <a
                            href={`https://www.google.pl/maps/place/${lat},${lon}/@${lat},${lon},10z`}
                            style={{ color: "#bdc3c7" }}
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
        const { temperatures, altitudes, pressures, gps, sound } = this.state;

        const array = [
            {
                name: "Speed",
                units: "(mph)",
                data: [...temperatures.slice(0, 20)],
                color: "#02aab0",
                refresh: true,
            },
            {
                name: "Temperature",
                units: "(°C)",
                data: temperatures,
                color: "#8884d8",
                refresh: true,
            },
            {
                name: "Altitude",
                units: "(ft)",
                data: altitudes,
                color: "#ef629f",
                refresh: true,
            },
            {
                name: "Pressure",
                units: "(Pa)",
                data: pressures,
                color: "#ffd194",
                refresh: true,
            },
            {
                name: "Sound",
                units: "(db)",
                data: sound,
                color: "#74b9ff",
                refresh: true,
            },
            {
                name: "Battery",
                units: "(%)",
                data: [...temperatures.slice(0, 20)],
                color: "#2ecc71",
                refresh: true,
            },
            {
                name: "CPU Temperature",
                units: "(°C)",
                data: temperatures,
                color: "#eb4d4b",
                refresh: true,
            },
            {
                name: "CPU Usage",
                units: "(%)",
                data: altitudes,
                color: "#e056fd",
                refresh: true,
            },
            {
                name: "RAM Usage",
                units: "(GB)",
                data: pressures,
                color: "#FEA47F",
                refresh: true,
            },
            {
                name: "Disk Usage",
                units: "(%)",
                data: pressures,
                color: "#D6A2E8",
                refresh: true,
            },
        ];
        if (
            !(
                temperatures.length > 0 &&
                altitudes.length > 0 &&
                pressures.length > 0 &&
                gps !== null &&
                sound !== null
            )
        )
            return (
                <>
                    <SEO title='Dashboard' />
                </>
            );
        return (
            <div style={{ backgroundColor: "#2b2e43", paddingLeft: "8%" }}>
                <SEO title='Dashboard' />
                {this.renderVideo()}
                <div>
                    <Grid container spacing={0}>
                        {array.map(graph => {
                            const { data, color, name, units, refresh } = graph;
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
                                            textAlign: "center",
                                        }}
                                    >
                                        {name} {units}
                                    </div>
                                    <Graph
                                        name={name.replace(/ /g, "")}
                                        color={color}
                                        data={data}
                                        refresh={refresh}
                                        width={250}
                                        height={120}
                                    />
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

DashboardPage.defaultProps = {
    actions: null,
    ssar: null,
    users: null,
    ip: null,
};

DashboardPage.propTypes = {
    actions: PropTypes.any,
    ssar: PropTypes.any,
    users: PropTypes.any,
    ip: PropTypes.any,
};

export default isServerSideRendering()
    ? DashboardPage
    : connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
