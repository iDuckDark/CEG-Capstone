/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { shuffle } from "../../helpers/utils";

class Pressure extends Component {
    constructor(props) {
        super(props);
        const { data, name } = props;
        for (const item of data) {
            item[name] = item.pv;
        }
        this.state = { data };
    }

    componentDidMount() {
        setInterval(() => {
            const { data } = this.state;
            this.setState({ data: shuffle(data) });
        }, 300);
    }

    renderPressure() {
        const { data } = this.state;
        const { name } = this.props;
        if (!data) return <div />;
        // console.log(data);
        const newData = data.filter(item => item != null);
        return (
            <div style={{ width: 310, height: 220 }}>
                <ResponsiveContainer>
                    <AreaChart
                        width={375}
                        height={300}
                        data={newData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            {/* #70e1f5 → #ffd194 */}
                            <linearGradient
                                id='colorPv3'
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'
                            >
                                <stop
                                    offset='5%'
                                    stopColor='#ffd194'
                                    stopOpacity={0.4}
                                />
                                <stop
                                    offset='95%'
                                    stopColor='#ffd194'
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey='date' tick={false} />
                        <Tooltip />
                        <Area
                            type='monotone'
                            dataKey={name}
                            stroke='#ffd194'
                            fillOpacity={1}
                            fill='url(#colorPv3)'
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }

    render() {
        return <>{this.renderPressure()}</>;
    }
}

export default Pressure;
