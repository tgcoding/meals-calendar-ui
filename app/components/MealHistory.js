import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import HttpUtils from "../util/HttpUtils";

class MealHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mealDate: moment(),
            name: "",
            mealTime: 0,
            calories: "",
            redirect: false,
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addMealHistory = this.addMealHistory.bind(this);
    }

    async componentDidMount() {
        if (this.props.mealHistoryId) {
            const response = await HttpUtils.get(`/mealhistory/${this.props.mealHistoryId}`)
                .catch((error) => {
                    console.log(error);
                });
            if (response.data) {
                response.data.mealDate = moment(response.data.mealDate);
                this.setState({
                    ...response.data,
                });
            }
        }
    }

    handleDateChange(newDate) {
        this.setState({
            mealDate: newDate
        });
    }

    handleInputChange(event) {
        const { value, name } = event.target;
        if (name === "mealTime") {
            this.setState({
                [name]: parseInt(value, 10),
            });
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    async addMealHistory(event) {
        event.preventDefault();
        const mealHistory = { ...this.state };
        mealHistory.user = { id: 1 };
        mealHistory.calories = parseInt(mealHistory.calories.trim(), 10);
        mealHistory.mealDate = mealHistory.mealDate.format("YYYY-MM-DD");

        const response = await HttpUtils.post("/mealhistory/", mealHistory)
            .catch((error) => {
                console.log(error);
            });
        if (response.data) {
            this.setState({
                mealDate: moment(),
                name: "",
                mealTime: 0,
                calories: 0,
            });

            if (this.props.onEdit) {
                this.props.onEdit();
            } else {
                this.setState({
                    redirect: true,
                });
            }
        }
    }

    render() {
        const cancel = (this.props.mealHistoryId) ? (<button className="btn btn-danger" onClick={this.props.onEdit}>Cancel</button>) : null;
        if (this.state.redirect === true) {
            return (
                <Redirect to={{ pathname: "/calendar", state: { from: "/mealhistory" } }} />
            );
        }
        return (
            <div className="container mt-5">
                <div className="row mt-2">
                    <div className="col-md-12">
                        <span>Date</span>
                        <div className="col-md-12">
                            <DatePicker selected={this.state.mealDate} onChange={this.handleDateChange} />
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <span>Meal</span>
                        <div className="form-check">
                            <input type="radio" id="breakfast" name="mealTime" value={1} checked={this.state.mealTime === 1} onChange={this.handleInputChange} />
                            <label className="form-check-label" htmlFor="breakfast">
                                Breakfast
                            </label>
                        </div>
                        <div className="form-check">
                            <input type="radio" id="lunch" name="mealTime" value={2} checked={this.state.mealTime === 2} onChange={this.handleInputChange} />
                            <label className="form-check-label" htmlFor="lunch">
                                Lunch
                            </label>
                        </div>
                        <div className="form-check">
                            <input type="radio" id="dinner" name="mealTime" value={3} checked={this.state.mealTime === 3} onChange={this.handleInputChange} />
                            <label className="form-check-label" htmlFor="dinner">
                                Dinner
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        Meal name
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        Calories
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <input type="text" name="calories" value={this.state.calories} onChange={this.handleInputChange} />
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="float-left">
                            {cancel}
                            <button className="btn btn-primary ml-2" onClick={this.addMealHistory}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MealHistory.propTypes = {
    mealHistoryId: PropTypes.number,
    onEdit: PropTypes.func,
};

export default MealHistory;
