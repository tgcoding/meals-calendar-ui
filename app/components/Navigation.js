import React, { Component } from "react";
import ListItemLink from "./ListItemLink";

class Navigation extends Component {
    constructor(props) {
        super(props);
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
                </div>
            </nav>
        );
    }
}

export default Navigation;
