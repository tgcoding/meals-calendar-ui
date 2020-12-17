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
        let tokenExists = TokenService.tokenExists();
        this.state = {
            currentUser: null,
            authenticated: tokenExists
        };

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.updateLoggedIn = this.updateLoggedIn.bind(this);
        this.updateLoggedOut = this.updateLoggedOut.bind(this);
        this.logOut = this.logOut.bind(this);
        console.log("In App constructor");
        console.log(this.state.authenticated);
    }
  
    loadCurrentlyLoggedInUser() {
        console.log("In loadCurrentlyLoggedInUser");
        if (TokenService.tokenExists()) {
            console.log("loadCurrentlyLoggedInUser token exists");

            UserService.getCurrentUser()
                .then(response => {
                    console.log("loadCurrentlyLoggedInUser token is valid");
                    this.setState({
                        currentUser: response.data,
                        authenticated: true
                    });
                }).catch(error => {
                    console.log("loadCurrentlyLoggedInUser token is bad");
                    if (error.response.status === 401) {
                        console.log("401 response");
                        this.updateLoggedOut();
                    }
                });
        } else {
            console.log("loadCurrentlyLoggedInUser token does not exist");
            this.setState({
                currentUser: null,
                authenticated: false
            });  
        }
    }

    updateLoggedIn() {
        console.log("Updating to logged in");
        this.setState({
            authenticated: true,
            currentUser: null
        });
    }

    updateLoggedOut() {
        console.log("Updating to logged out");
        this.setState({
            authenticated: false,
            currentUser: null
        });
    }

    logOut() {
        console.log("Redirecting to logout");
        window.location = EnvConstants.OAUTH_LOGOUT;
    }
  
    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
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
                    <Route path='/login' component={(props) => { window.location = EnvConstants.GOOGLE_OAUTH_PATH + '&react_redirect_path=' + props.location.state.from.pathname; return null;} }/>
                    <Route path="/oauth2/redirect" component={(props) => <OAuth2RedirectHandler {...props} updateAuth={this.updateLoggedIn} />} ></Route>
                    <Route path="/logout" component={() => <LogoutHandler handleLogoutState={this.updateLoggedOut} loggedIn={this.state.authenticated} />} />
                </div>
            </Router>
        );
    }
}

export default App;
