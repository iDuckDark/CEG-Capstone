import React, { Component } from "react";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const data = [
    {
        name: "Temp",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

class Temperature extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderTemperature() {
        return (
            <AreaChart
                height={200}
                width={375}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    {/* #02aab0 → #00cdac */}
                    <linearGradient id='colorPv1' x1='0' y1='0' x2='0' y2='1'>
                        <stop
                            offset='5%'
                            stopColor='#02aab0'
                            stopOpacity={0.4}
                        />
                        <stop
                            offset='95%'
                            stopColor='#02aab0'
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey='name' tick={false} />
                <Tooltip />
                <Area
                    type='monotone'
                    dataKey='pv'
                    stroke='#02aab0'
                    fillOpacity={1}
                    fill='url(#colorPv1)'
                />
            </AreaChart>
        );
    }

    render() {
        return <>{this.renderTemperature()}</>;
    }
}

export default Temperature;
