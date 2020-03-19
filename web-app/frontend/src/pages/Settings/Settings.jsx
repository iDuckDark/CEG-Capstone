import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Title from "../../components/Titles/Title";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { getVideoUrl, setVideoUrl, workingUrl } from "../../helpers/settings";
import { isServerSideRendering } from "../../helpers/utils";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = { defaultUrl: "" };
        this.handleURLChange = this.handleURLChange.bind(this);
    }

    handleURLChange(event) {
        const { value } = event.target;
        this.setState({ defaultUrl: value });
    }

    render() {
        const { defaultUrl } = this.state;
        return (
            <Layout>
                <SEO title='Settings' />
                <div
                    className='center-horizontal'
                    style={{
                        marginTop: "20px",
                        marginBottom: "18%",
                        color: "#FFFFFF",
                    }}
                >
                    <Title variant='h5' gutterBottom className='title'>
                        Settings
                    </Title>
                    <div> Current URL: {getVideoUrl()}</div>
                    <div
                        style={{
                            textAlign: "center",
                            margin: "20px",
                        }}
                    >
                        <input
                            id='input'
                            type='input'
                            color='primary'
                            style={{
                                width: "250px",
                                color: "#FFFFFF",
                                background: "transparent",
                                border: "none",
                                borderBottom: "1px solid #FFFFFF",
                                borderRadius: "5px",
                            }}
                            onChange={e => this.handleURLChange(e)}
                            value={defaultUrl}
                            placeholder={workingUrl}
                        />
                    </div>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => {
                            setVideoUrl(defaultUrl);
                            if (!isServerSideRendering())
                                window.location.reload(false);
                        }}
                    >
                        Update
                    </Button>
                </div>
            </Layout>
        );
    }
}
export default Settings;
