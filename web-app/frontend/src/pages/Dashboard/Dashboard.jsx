import React, { Component } from "react";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import Overlay from "pigeon-overlay";

class Dashboard extends Component {
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

                    <Overlay anchor={[45.4112, -75.6981]} offset={[120, 79]}>
                        <img src='pigeon.jpg' width={240} height={158} alt='' />
                    </Overlay>
                </Map>
            </div>
        );
    }
}

export default Dashboard;
