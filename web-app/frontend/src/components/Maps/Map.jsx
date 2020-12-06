/* eslint-disable no-restricted-properties */
/* eslint-disable no-nested-ternary */
import React, { Component } from "react";

import Map from "pigeon-maps";
import pigeonSvg from "../../../static/images/animated-logo.gif";
import DraggableOverlay from "./DraggableOverlay";

const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoicGlnZW9uLW1hcHMiLCJhIjoiY2l3eW01Y2E2MDA4dzJ6cWh5dG9pYWlwdiJ9.cvdCf-7PymM1Y3xp5j71NQ";

const mapbox = (mapboxId, accessToken) => (x, y, z, dpr) => {
    return `https://api.mapbox.com/styles/v1/mapbox/${mapboxId}/tiles/256/${z}/${x}/${y}${
        dpr >= 2 ? "@2x" : ""
    }?access_token=${accessToken}`;
};

const providers = {
    osm: (x, y, z) => {
        const s = String.fromCharCode(97 + ((x + y + z) % 3));
        return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
    },
    wikimedia: (x, y, z, dpr) => {
        return `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}${
            dpr >= 2 ? "@2x" : ""
        }.png`;
    },
    stamen: (x, y, z, dpr) => {
        return `https://stamen-tiles.a.ssl.fastly.net/terrain/${z}/${x}/${y}${
            dpr >= 2 ? "@2x" : ""
        }.jpg`;
    },
    streets: mapbox("streets-v10", MAPBOX_ACCESS_TOKEN),
    satellite: mapbox("satellite-streets-v10", MAPBOX_ACCESS_TOKEN),
    outdoors: mapbox("outdoors-v10", MAPBOX_ACCESS_TOKEN),
    light: mapbox("light-v9", MAPBOX_ACCESS_TOKEN),
    dark: mapbox("dark-v9", MAPBOX_ACCESS_TOKEN),
};

const MAP_ID = "4ddefb36-c0c7-4aa9-a627-c5ebfd5ae115";
const MAPTILER_ACCESS_TOKEN = "yltXQh4miTGcI5w3eHbM";

function mapTilerProvider(x, y, z, dpr) {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${
        dpr >= 2 ? "@2x" : ""
    }.png?key=${MAPTILER_ACCESS_TOKEN}`;
}

const markers = {
    Drone: [[45.423, -75.6838], 13],
    SITE: [[45.4195, -75.6788], 13],
};

const lng2tile = (lon, zoom) => ((lon + 180) / 360) * Math.pow(2, zoom);
const lat2tile = (lat, zoom) =>
    ((1 -
        Math.log(
            Math.tan((lat * Math.PI) / 180) +
                1 / Math.cos((lat * Math.PI) / 180)
        ) /
            Math.PI) /
        2) *
    Math.pow(2, zoom);

const Banner = () => (
    <a href='https://github.com/mariusandra/pigeon-maps'>
        <img
            style={{ position: "absolute", top: 0, right: 0, border: 0 }}
            src='https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png'
            alt='Fork me on GitHub'
        />
    </a>
);

function isMapBox(provider) {
    return (
        provider === "streets" ||
        provider === "satellite" ||
        provider === "outdoors" ||
        provider === "light" ||
        provider === "dark"
    );
}

const MapboxAttribution = () => (
    <span className='map-attribution'>
        <span>
            © <a href='https://www.mapbox.com/about/maps/'>Mapbox</a>
        </span>
        {" | "}
        <span>
            © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>
        </span>
        {" | "}
        <strong>
            <a href='https://www.mapbox.com/map-feedback/' target='_blank'>
                Improve this map
            </a>
        </strong>
    </span>
);

const StamenAttribution = () => (
    <span className='map-attribution'>
        Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under{" "}
        <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data
        by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under{" "}
        <a href='http://www.openstreetmap.org/copyright'>ODbL</a>.
    </span>
);

const WikimediaAttribution = () => (
    <span className='map-attribution'>
        Map tiles by{" "}
        <a href='https://foundation.wikimedia.org/w/index.php?title=Maps_Terms_of_Use#Where_does_the_map_data_come_from.3F'>
            Wikimedia
        </a>
        . Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>
    </span>
);

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // center: [45.423, -75.6838],
            center: [props.lat, props.lon],
            zoom: 18,
            provider: "osm",
            metaWheelZoom: false,
            twoFingerDrag: false,
            animate: true,
            animating: false,
            zoomSnap: true,
            mouseEvents: true,
            touchEvents: true,
            minZoom: 1,
            maxZoom: 18,
            // dragAnchor: [45.423, -75.6838]
            dragAnchor: [props.lat, props.lon],
        };
    }

    zoomIn = () => {
        this.setState({
            zoom: Math.min(this.state.zoom + 1, 18),
        });
    };

    zoomOut = () => {
        this.setState({
            zoom: Math.max(this.state.zoom - 1, 1),
        });
    };

    handleBoundsChange = ({ center, zoom, bounds, initial }) => {
        if (initial) {
            // console.log('Got initial bounds: ', bounds)
        }
        this.setState({ center, zoom });
    };

    handleClick = ({ event, latLng, pixel }) => {
        // console.log('Map clicked!', latLng, pixel)
    };

    handleMarkerClick = ({ event, payload, anchor }) => {
        // console.log(`Marker #${payload} clicked at: `, anchor)
    };

    handleAnimationStart = () => {
        this.setState({ animating: true });
    };

    handleAnimationStop = () => {
        this.setState({ animating: false });
    };

    render() {
        const {
            center,
            zoom,
            provider,
            animate,
            metaWheelZoom,
            twoFingerDrag,
            zoomSnap,
            mouseEvents,
            touchEvents,
            animating,
            minZoom,
            maxZoom,
        } = this.state;

        return (
            <div style={{ textAlign: "right", marginTop: 0 }}>
                {/* <Banner /> */}
                <div
                    style={{
                        maxWidth: 280,
                        maxHeight: 300,
                        margin: "0 auto",
                        // width: 250,
                        // height: 250,
                        textAlign: "right",
                    }}
                >
                    <Map
                        limitBounds='edge'
                        center={center}
                        zoom={zoom}
                        provider={providers[provider]}
                        // provider={mapTilerProvider}
                        dprs={[1, 2]}
                        onBoundsChanged={this.handleBoundsChange}
                        onClick={this.handleClick}
                        onAnimationStart={this.handleAnimationStart}
                        onAnimationStop={this.handleAnimationStop}
                        animate={animate}
                        metaWheelZoom={metaWheelZoom}
                        twoFingerDrag={twoFingerDrag}
                        zoomSnap={zoomSnap}
                        mouseEvents={mouseEvents}
                        touchEvents={touchEvents}
                        minZoom={minZoom}
                        maxZoom={maxZoom}
                        attribution={
                            isMapBox(provider) ? (
                                <MapboxAttribution />
                            ) : provider === "stamen" ? (
                                <StamenAttribution />
                            ) : provider === "wikimedia" ? (
                                <WikimediaAttribution />
                            ) : null
                        }
                        defaultWidth={600}
                        height={270}
                        boxClassname='pigeon-filters'
                    >
                        <DraggableOverlay
                            anchor={this.state.dragAnchor}
                            offset={[100, 100]}
                            // onDragMove={(anchor) => console.log('moving pigeon', anchor)}
                            onDragEnd={anchor => {
                                this.setState({ dragAnchor: anchor });
                            }}
                            style={
                                {
                                    //   clipPath: 'polygon(100% 0, 83% 0, 79% 15%, 0 68%, 0 78%, 39% 84%, 43% 96%, 61% 100%, 79% 90%, 69% 84%, 88% 71%, 100% 15%)'
                                }
                            }
                        >
                            <img
                                src={pigeonSvg}
                                alt='svg'
                                width={200}
                                height={200}
                            />
                        </DraggableOverlay>
                        {isMapBox(provider) && (
                            <span className='mapbox-wordmark' />
                        )}
                    </Map>
                </div>
                <div style={{ marginTop: 20 }}></div>
            </div>
        );
    }
}
