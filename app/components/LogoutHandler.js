import React, { Component } from "react";
import TokenService from "../services/TokenService";
import { Redirect } from 'react-router-dom'

class LogoutHandler extends Component {
    constructor(props) {
        super(props);
        console.log("LogoutHandler constructor");
        console.log("LogoutHandler authenticated: " + this.props.loggedIn);
        this.updateLoggedOutState = this.updateLoggedOutState.bind(this);
    }

    updateLoggedOutState() {
        console.log("In LogoutHandler, updating state");
        TokenService.removeToken();
        this.props.handleLogoutState();
    }

    componentDidMount() {
        console.log("In LogoutHandler, componentDidMount");
        this.updateLoggedOutState();
    }

    render() {
        console.log("In LogoutHandler, render");
        console.log("Logged in: " + this.props.loggedIn);
        if (!this.props.loggedIn) {
            console.log("In LogoutHandler, redirecting");
            return <Redirect to={{
                pathname: "/"
            }}/>;
        } else {
            console.log("In LogoutHandler, no action");
            return <div></div>;
        }
    }
}

export default LogoutHandler;