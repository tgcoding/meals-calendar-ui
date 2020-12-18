import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Navigation from "./Navigation";
import MealCalendar from "./MealCalendar";
import MealHistory from "./MealHistory";
import PrivateRoute from "./common/PrivateRoute";
import UserService from "../services/UserService";
import EnvConstants from "../constants/EnvConstants";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import LogoutHandler from "./LogoutHandler";
import TokenService from "../services/TokenService";

class App extends Component {
    constructor(props) {
        super(props);
        const tokenExists = TokenService.tokenExists();
        this.state = {
            currentUser: null,
            authenticated: tokenExists
        };

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.updateLoggedIn = this.updateLoggedIn.bind(this);
        this.updateLoggedOut = this.updateLoggedOut.bind(this);
        this.logOut = this.logOut.bind(this);
        console.log(this.state.authenticated);
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    loadCurrentlyLoggedInUser() {
        if (TokenService.tokenExists()) {

            UserService.getCurrentUser()
                .then((response) => {
                    this.setState({
                        currentUser: response.data,
                        authenticated: true
                    });
                }).catch((error) => {
                    if (error.response.status === 401) {
                        console.log("401 response");
                        this.updateLoggedOut();
                    }
                });
        } else {
            this.setState({
                currentUser: null,
                authenticated: false
            });
        }
    }

    updateLoggedIn() {
        this.setState({
            authenticated: true,
            currentUser: null
        });
    }

    updateLoggedOut() {
        this.setState({
            authenticated: false,
            currentUser: null
        });
    }

    logOut() {
        window.location = EnvConstants.OAUTH_LOGOUT;
    }

    render() {
        return (
            <Router basename="/meals-calendar">
                <div>
                    <Navigation user={this.state.currentUser} logoutRedirect={this.logOut} />
                    <div className="container mt-5">
                        <div className="col-md-12">
                            <h1 className="d-inline">Meals Calendar</h1>
                            <div className="float-right">
                                <Link to="/history"><button className="btn btn-primary ml-2">New</button></Link>
                            </div>
                        </div>
                        <Route exact={true} path="/" render={() => (
                            <div className="row mt-5">
                                <div className="col-md-12">
                                    <div className="row">
                                        <Link to="/history">New Meal</Link>
                                    </div>
                                    <div className="row">
                                        <Link to="/calendar">Calendar</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                        />
                    </div>
                    <PrivateRoute path="/history" authenticated={this.state.authenticated} noAuthResponse={this.updateLoggedOut} component={MealHistory} />
                    <PrivateRoute path="/calendar" authenticated={this.state.authenticated} noAuthResponse={this.updateLoggedOut} component={MealCalendar} />
                    <Route path="/login" component={(props) => { window.location = EnvConstants.GOOGLE_OAUTH_PATH + "&react_redirect_path=" + props.location.state.from.pathname; return null; }} />
                    <Route path="/oauth2/redirect" component={(props) => <OAuth2RedirectHandler {...props} updateAuth={this.updateLoggedIn} />} />
                    <Route path="/logout" component={() => <LogoutHandler handleLogoutState={this.updateLoggedOut} loggedIn={this.state.authenticated} />} />
                </div>
            </Router>
        );
    }
}

export default App;
