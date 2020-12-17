import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TokenService from "../services/TokenService";

class OAuth2RedirectHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false
        }
        this.getUrlParameter = this.getUrlParameter.bind(this);
    }
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        console.log("In OAuth2RedirectHandler");
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');
        const path = this.getUrlParameter('path');

        if(token) {
            TokenService.setToken(token);
            this.props.updateAuth();
            console.log("Success");
            console.log("Path");
            console.log(path);
            return <Redirect to={{
                pathname: (path) ? path : "/",
                state: { from: this.props.location }
            }}/>; 
        } else {
            console.log("Failure");
            return <Redirect to={{
                pathname: "/",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}

export default OAuth2RedirectHandler;
