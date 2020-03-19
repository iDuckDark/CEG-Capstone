import React, { Component } from "react";
import { AreaChart, Area, XAxis, Tooltip } from "recharts";
import { shuffle } from "../../helpers/utils";

class Temperature extends Component {
    constructor(props) {
        super(props);
        // eslint-disable-next-line react/prop-types
        const { data } = props;
        this.state = { data };
    }

    componentDidMount() {
        setInterval(() => {
            const { data } = this.state;
            const newData = shuffle(data);
            this.setState({ data: newData });
        }, 300);
    }

    renderTemperature() {
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
