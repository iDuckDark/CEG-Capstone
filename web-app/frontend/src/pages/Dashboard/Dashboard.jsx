import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../helpers/actions";
import { isServerSideRendering } from "../../helpers/utils";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import Overlay from "pigeon-overlay";
import logo from "../../images/favicon.png";

// Reference
// https://github.com/mariusandra/pigeon-maps
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
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
                <Map
                    center={[45.4112, -75.6981]}
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
                        payload={1}
                        onClick={({ event, anchor, payload }) => {}}
                    />

                    <Overlay anchor={[45.4112, -75.6981]} offset={[10, 9]}>
                        <img src={logo} width={50} height={50} alt='' />
                    </Overlay>
                </Map>
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
