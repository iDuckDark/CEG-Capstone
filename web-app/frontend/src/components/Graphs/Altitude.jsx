/* eslint-disable react/prop-types */
import React, { Component } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { shuffle, cleaner } from "../../helpers/utils";

class Altitude extends Component {
    constructor(props) {
        super(props);
        const { data, name } = props;
        for (const item of data) {
            item[name] = item.pv / 100;
        }
        const newData = cleaner(name, 25, 50, 20);
        this.state = { data: newData };
    }

    componentDidMount() {
        setInterval(() => {
            const { data } = this.state;
            this.setState({ data: shuffle(data) });
        }, 300);
    }

    renderAltitude() {
        const { data } = this.state;
        const { name } = this.props;
        if (!data) return <div />;
        const newData = data.filter(item => item != null);
        return (
            <div style={{ width: 260, height: 220 }}>
                <ResponsiveContainer>
                    <AreaChart
                        width={375}
                        height={300}
                        data={newData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            {/* #2c3e50 #fd746c */}
                            <linearGradient
                                id='colorPv2'
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'
                            >
                                <stop
                                    offset='5%'
                                    stopColor='#ef629f'
                                    stopOpacity={0.4}
                                />
                                <stop
                                    offset='95%'
                                    stopColor='#ef629f'
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
                            stroke='#ef629f'
                            fillOpacity={1}
                            fill='url(#colorPv2)'
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }

    render() {
        return <>{this.renderAltitude()}</>;
    }
}

export default Altitude;
