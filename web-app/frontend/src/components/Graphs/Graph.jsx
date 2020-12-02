import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    YAxis,
} from "recharts";
import { shuffle, cleaner } from "../../helpers/utils";

class Graph extends Component {
    constructor(props) {
        super(props);
        const { name, color, refresh, width, height } = props;
        let { data } = props;
        for (const item of data) item[name] = item.pv;
        switch (name) {
            case "Sound":
                data = cleaner(name, 50, 75, 35);
                break;
            case "Altitude":
                data = cleaner(name, 25, 50, 20);
                break;
            case "Battery":
                data = cleaner(name, 80, 100, 15);
                break;
            case "CPUTemperature":
                data = cleaner(name, 80, 95, 27);
                break;
            case "CPUUsage":
                data = cleaner(name, 80, 98, 27);
                break;
            case "RAMUsage":
                data = cleaner(name, 0.5, 1, 27);
                break;
            case "DiskUsage":
                data = cleaner(name, 60, 100, 27);
                break;
            default:
                break;
        }
        this.state = {
            data,
            name,
            color,
            refresh: refresh || false,
            width,
            height,
            updateFunction: null,
        };
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        const { refresh } = this.state;
        if (refresh) {
            const updateFunction = setInterval(() => this.update(), 300);
            this.setState({ updateFunction });
        }
    }

    componentWillUnmount() {
        const { updateFunction } = this.state;
        if (updateFunction) clearInterval(updateFunction);
    }

    update() {
        const { data } = this.state;
        const { name } = this.props;
        let newData = shuffle(data);
        if (name === "Battery") {
            newData = newData.sort(this.sortFloat);
        }
        this.setState({ data: newData });
    }

    sortFloat(a, b) {
        return b.Battery - a.Battery;
    }

    renderGraph() {
        const { data, name, color, width, height } = this.state;
        if (!data || !name || !color) return <div />;
        const newData = data.filter(item => item != null);
        return (
            <div style={{ width, height }}>
                <ResponsiveContainer>
                    <AreaChart
                        width={375}
                        height={300}
                        data={newData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id={name}
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'
                            >
                                <stop
                                    offset='5%'
                                    stopColor={color}
                                    stopOpacity={0.4}
                                />
                                <stop
                                    offset='95%'
                                    stopColor={color}
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey='date' tick={false} />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type='monotone'
                            dataKey={name}
                            stroke={color}
                            fillOpacity={1}
                            fill={`url(#${name})`}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }

    render() {
        return <>{this.renderGraph()}</>;
    }
}

Graph.defaultProps = {
    data: null,
    name: null,
    color: null,
    refresh: false,
    width: 260,
    height: 220,
};

Graph.propTypes = {
    data: PropTypes.any,
    name: PropTypes.any,
    color: PropTypes.any,
    refresh: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default Graph;
