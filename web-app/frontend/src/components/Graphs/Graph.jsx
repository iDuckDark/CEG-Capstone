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

class Graph extends Component {
    constructor(props) {
        super(props);
        const { name, color, width, height } = props;
        const { data } = props;
        for (const item of data) item[name] = item.pv;
        this.state = {
            data,
            name,
            color,
            width,
            height,
        };
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
    width: 260,
    height: 220,
};

Graph.propTypes = {
    data: PropTypes.any,
    name: PropTypes.any,
    color: PropTypes.any,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default Graph;
