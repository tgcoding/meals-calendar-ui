import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TokenService from "../services/TokenService";

class OAuth2RedirectHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouned: false
        };
        this.getUrlParameter = this.getUrlParameter.bind(this);
    }

    getUrlParameter(name) {
        const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        const results = regex.exec(this.props.location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    render() {
        const token = this.getUrlParameter("token");
        const error = this.getUrlParameter("error");
        const path = this.getUrlParameter("path");

        if (token) {
            TokenService.setToken(token);
            this.props.updateAuth();
            return (
                <Redirect to={{
                    pathname: (path) ? path : "/",
                    state: { from: this.props.location }
                }}
                />
            );
        }
        return (
            <Redirect to={{
                pathname: "/",
                state: {
                    from: this.props.location,
                    error,
                }
            }}
            />
        );
    }
}

export default OAuth2RedirectHandler;
