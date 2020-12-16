import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Navigation from "./Navigation";
import MealCalendar from "./MealCalendar";
import MealHistory from "./MealHistory";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router basename="/meals-calendar">
                <div>
                    <Navigation />
                    <div className="container mt-5">
                        <h1>Meals Calendar</h1>
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
                    <Route path="/history" component={MealHistory} />
                    <Route path="/calendar" component={MealCalendar} />
                </div>
            </Router>
        );
    }
}

export default App;
