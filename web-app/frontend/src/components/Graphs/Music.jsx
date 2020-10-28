/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";
import "./Music.scss";

const MAX_BAR_HEIGHT = 18;

class Music extends Component {
    componentDidMount() {
        this.addBarSpans();
        setInterval(() => {
            this.setRandomBars();
        }, 300);
    }

    setRandomBars() {
        const bars = document.getElementsByClassName("equalizer-bar");
        for (let i = 0; i < bars.length; i += 1) {
            const spans = bars[i].getElementsByTagName("span");
            const activeSpanCount = this.getActiveSpans(spans);
            const newHeight = this.getRandomHeight(MAX_BAR_HEIGHT);

            for (let j = 0; j < spans.length; j += 1) {
                if (newHeight > activeSpanCount) {
                    spans[j].style.opacity = "1";
                } else if (j > newHeight) {
                    spans[j].style.opacity = "0";
                }

                // set little opacity
                const upperSpan = MAX_BAR_HEIGHT - j;
                if (newHeight > MAX_BAR_HEIGHT - 5 && upperSpan < 5) {
                    spans[j].style.opacity = `0.${upperSpan}`;
                }
            }
        }
    }

    getActiveSpans(spans) {
        let counter = 0;
        for (let i = 0; i < spans.length; i += 1) {
            if (spans[i].style.opacity > 0) counter += 1;
        }
        return counter;
    }

    getRandomHeight(maxBarHeight) {
        return Math.round(Math.random() * (maxBarHeight - 1)) + 1;
    }

    addBarSpans() {
        const bars = document.getElementsByClassName("equalizer-bar");
        let html = "";
        for (let j = 0; j < MAX_BAR_HEIGHT; j += 1) {
            html += "<span></span>";
        }
        for (let i = 0; i < bars.length; i += 1) {
            bars[i].innerHTML = html;
        }
    }

    render() {
        const singleBar = key => {
            return (
                <div className='equalizer-bar' key={key}>
                    <span />
                </div>
            );
        };
        const rows = [];
        for (let i = 0; i < 15; i += 1) {
            rows.push(singleBar(String(i)));
        }

        return (
            <div
                className='equalizer'
                style={{ width: "200px", height: "100px" }}
            >
                {rows}
            </div>
        );
    }
}

export default Music;
