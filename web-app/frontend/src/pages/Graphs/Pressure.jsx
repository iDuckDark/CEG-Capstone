import React, { Component } from "react";
import { AreaChart, Area, XAxis, Tooltip } from "recharts";
import { shuffle } from "../../helpers/utils";

class Pressure extends Component {
    constructor(props) {
        super(props);
        // eslint-disable-next-line react/prop-types
        const { data } = props;
        this.state = { data };
    }

    componentDidMount() {
        // setInterval(() => {
            const { data } = this.state;
            // const newData = shuffle(data);
            this.setState({ data: data });
        // }, 300);
    }

    renderPressure() {
        const { data } = this.state;
        if (!data) return <div />;
        const newData = data.filter(item => item != null);
        return (
            <AreaChart
                height={200}
                width={375}
                data={newData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    {/* #70e1f5 → #ffd194 */}
                    <linearGradient id='colorPv3' x1='0' y1='0' x2='0' y2='1'>
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
                    dataKey='pv'
                    stroke='#ffd194'
                    fillOpacity={1}
                    fill='url(#colorPv3)'
                />
            </AreaChart>
        );
    }

    render() {
        return <>{this.renderPressure()}</>;
    }
}

export default Pressure;
