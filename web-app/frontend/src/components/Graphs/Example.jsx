import React, { Component } from "react";
import {
    Area,
    CartesianGrid,
    ComposedChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { shuffle } from "../../helpers/utils";

class Example extends Component {
    constructor(props) {
        super(props);
        const data = [
            {
                name: "Page A",
                Temperature: 590,
                Altitude: 800,
                Pressure: 1400,
            },
            {
                name: "Page B",
                Temperature: 868,
                Altitude: 967,
                Pressure: 1506,
            },
            {
                name: "Page C",
                Temperature: 1397,
                Altitude: 1098,
                Pressure: 989,
            },
            {
                name: "Page D",
                Temperature: 1480,
                Altitude: 1200,
                Pressure: 1228,
            },
            {
                name: "Page E",
                Temperature: 1520,
                Altitude: 1108,
                Pressure: 1100,
            },
            {
                name: "Page F",
                Temperature: 1400,
                Altitude: 680,
                Pressure: 1700,
            },
        ];
        this.state = { data };
    }

    componentDidMount() {
        setInterval(() => {
            const { data } = this.state;
            this.setState({ data: shuffle(data) });
        }, 300);
    }

    render() {
        const { data } = this.state;
        return (
            <div style={{ width: 500, height: 300 }}>
                <ResponsiveContainer>
                    <ComposedChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid stroke='#f5f5f5' />
                        <XAxis dataKey='name' tick={false} />
                        <YAxis />
                        <Tooltip />
                        <Legend
                            wrapperStyle={{ fontSize: "20px", color: "white" }}
                        />
                        <Area
                            type='monotone'
                            dataKey='Pressure'
                            fill='#8884d8'
                            stroke='#8884d8'
                        />
                        {/* <Bar dataKey='Altitude' barSize={20} fill='#413ea0' /> */}
                        {/* <Line
                            type='monotone'
                            dataKey='Temperature'
                            stroke='#ff7300'
                        /> */}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default Example;
