import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../helpers/actions";
import { isServerSideRendering } from "../../helpers/utils";

import logo from "../../images/favicon.png";

import Map from "./Map";
import Thermometer from "react-thermometer-component";

// Reference
// https://github.com/mariusandra/pigeon-maps
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
        // document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
    }

    componentDidMount() {
        this.callAPI();
    }

    callAPI() {
        const { actions } = this.props;
        actions.getUsers().then(() => {
            const { users } = this.props;
            console.log(users);
            this.setState({ apiResponse: users });
        });
    }

    render() {
        return (
            <div
                style={{ height: "100vh", width: "100%", textAlign: "center" }}
            >
                <div
                    style={{
                        marginLeft: "20%",
                        // marginBottom: "50%",
                        zIndex:"2",
                        position: "absolute",
                        // float: "right"
                        // display: "absolute",
                    }}
                >
                    <Thermometer
                        theme='dark'
                        value='10'
                        max='100'
                        // steps='3'
                        format='°C'
                        // size='large'
                        height='300'
                    />

                </div>
                <Map />
            </div>
        );
    }
}

const mapStateToProps = ({ actionReducer }) => {
    return { users: actionReducer.users };
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
