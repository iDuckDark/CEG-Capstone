import React from "react";
import loadingGif from "../../../../../assets/animated-logo.gif";

const Loader = () => {
    return (
        <div
            style={{
                textAlign: "center",
                color: "#2b2e43",
                backgroundColor: "#2b2e43",
                alignItems: "center",
                justifyContent: "center",
                verticalAlign: "middle",
            }}
        >
            <img
                src={loadingGif}
                alt='loading'
                style={{
                    width: "200px",
                    height: "200px",
                    position: "absolute",
                    margin: "auto",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            />
        </div>
    );
};

export default Loader;
