import React, { Component } from "react";
import { Link } from "react-router-dom";
import ListItemLink from "./ListItemLink";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logoutRedirect();
    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand" href="./">MealsCalendar</a>
                <div className="navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <ListItemLink to="./">Dashboard</ListItemLink>
                        <ListItemLink to="./history">New Meal</ListItemLink>
                        <ListItemLink to="./calendar">Calendar</ListItemLink>
                    </ul>
                    {(this.props.user != null) ? (
                        <div>
                            <span className="mr-2 text-light">{this.props.user.email}</span>
                            <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={this.logout}>Sign Out</button>
                        </div>
                    ) : (
                        <div>
                            <Link to={{ pathname: "./login", state: { from: { pathname: "/" } } }}><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sign In</button></Link>
                        </div>
                    )
                    }
                </div>
            </nav>
        );
    }
}

export default Navigation;
