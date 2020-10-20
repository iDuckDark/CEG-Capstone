import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

class Login extends Component {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        const { email, password } = this.state;
        return email.length > 0 && password.length > 0;
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className='Login'>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId='email' bsSize='large'>
                        {/* <ControlLabel>Email<ControlLabel> */}
                        <FormControl
                            autoFocus
                            type='email'
                            value={this.state.email}
                            // onChange={e => this.setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId='password' bsSize='large'>
                        {/* <ControlLabel>Password</ControlLabel> */}
                        <FormControl
                            value={this.state.password}
                            // onChange={e => this.setPassword(e.target.value)}
                            type='password'
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize='large'
                        disabled={!this.validateForm()}
                        type='submit'
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default Login;
