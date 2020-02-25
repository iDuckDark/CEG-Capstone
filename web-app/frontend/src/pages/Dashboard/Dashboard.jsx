import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../helpers/actions";
import { isServerSideRendering } from "../../helpers/utils";
// import Map from "pigeon-maps";
// import Marker from "pigeon-marker";
// import Overlay from "pigeon-overlay";
import logo from "../../images/favicon.png";

import Map from "./Map";

// const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicGlnZW9uLW1hcHMiLCJhIjoiY2l3eW01Y2E2MDA4dzJ6cWh5dG9pYWlwdiJ9.cvdCf-7PymM1Y3xp5j71NQ'

// const mapbox = (mapboxId, accessToken) => (x, y, z, dpr) => {
//   return `https://api.mapbox.com/styles/v1/mapbox/${mapboxId}/tiles/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}?access_token=${accessToken}`
// }

// const providers = {
//     osm: (x, y, z) => {
//         const s = String.fromCharCode(97 + ((x + y + z) % 3));
//         return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
//     },
//     wikimedia: (x, y, z, dpr) => {
//         return `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}${
//             dpr >= 2 ? "@2x" : ""
//         }.png`;
//     },
//     stamen: (x, y, z, dpr) => {
//         return `https://stamen-tiles.a.ssl.fastly.net/terrain/${z}/${x}/${y}${
//             dpr >= 2 ? "@2x" : ""
//         }.jpg`;
//     },
//     streets: mapbox("streets-v10", MAPBOX_ACCESS_TOKEN),
//     satellite: mapbox("satellite-streets-v10", MAPBOX_ACCESS_TOKEN),
//     outdoors: mapbox("outdoors-v10", MAPBOX_ACCESS_TOKEN),
//     light: mapbox("light-v9", MAPBOX_ACCESS_TOKEN),
//     dark: mapbox("dark-v9", MAPBOX_ACCESS_TOKEN),
// };

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
