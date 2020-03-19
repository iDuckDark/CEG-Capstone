import React, { Component } from "react";
import Layout from "../../components/layout";
import Title from "../../components/Titles/Title";

const defaultUrl = "http://45.72.149.128:8000/";

class Restreamer extends Component {
    constructor(props) {
        super(props);
        this.state = { piUrl: defaultUrl };
        this.handleURLChange = this.handleURLChange.bind(this);
    }

    handleURLChange(event) {
        const piUrl = event.target.value;
        if (piUrl) this.setState({ piUrl });
        else this.setState({ piUrl: defaultUrl });
    }

    render() {
        const { piUrl } = this.state;
        return (
            <Layout>
                <div
                    style={{
                        height: "100vh",
                        width: "100%",
                        marginTop: "2%",
                        textAlign: "center",
                    }}
                >
                    <div style={{ marginBottom: "20px" }} />
                    {/* <Title variant='h5' gutterBottom className='title'>
                        Live Stream (Input)
                    </Title>
                    <div style={{ textAlign: "center" }}>
                        <TextField
                            id='input'
                            type='input'
                            onChange={this.handleURLChange}
                            value={piUrl}
                            style={{ width: "100%" }}
                            placeholder={defaultUrl}
                        />
                    </div> */}
                    {/* <iframe
                        title='3'
                        width='100%'
                        height='100%'
                        style={{ margin: "0 auto", display: "block" }}
                        src={piUrl}
                        frameBorder='0'
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    /> */}

                    <div style={{ marginBottom: "20px" }} />
                    <Title variant='h5' gutterBottom className='title'>
                        Live Stream (Sample)
                    </Title>
                    <iframe
                        title='3'
                        width='640'
                        height='360'
                        src='https://www.youtube.com/embed/ZG5nE0rd4BM'
                        frameBorder='0'
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    />
                    <div style={{ marginBottom: "20px" }} />
                    <Title variant='h5' gutterBottom className='title'>
                        Past Streams
                    </Title>
                    <iframe
                        title='1'
                        width='560'
                        height='315'
                        src='https://www.youtube.com/embed/t9YXkrnr4_4'
                        frameBorder='0'
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    />
                    <iframe
                        title='2'
                        width='853'
                        height='480'
                        src='https://www.youtube.com/embed/EkogkDwx1pA'
                        frameBorder='0'
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    />
                </div>
            </Layout>
        );
    }
}
export default Restreamer;
