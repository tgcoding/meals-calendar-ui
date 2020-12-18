import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TokenService from "../services/TokenService";

class LogoutHandler extends Component {
    constructor(props) {
        super(props);
        this.updateLoggedOutState = this.updateLoggedOutState.bind(this);
    }

    componentDidMount() {
        this.updateLoggedOutState();
    }

    updateLoggedOutState() {
        TokenService.removeToken();
        this.props.handleLogoutState();
    }

    render() {
        if (!this.props.loggedIn) {
            return (
                <Redirect to={{
                    pathname: "/"
                }}
                />
            );
        }
        return <div></div>;
    }
}

export default LogoutHandler;
