import React, { Component } from "react";
import HttpUtils from "../util/HttpUtils";

class MealCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
        this.getCalendarData = this.getCalendarData.bind(this);
    }

    componentDidMount() {
        this.getCalendarData();
    }

    async getCalendarData() {
        const response = await HttpUtils.get("/mealhistory/currentweek")
            .catch((error) => {
                console.log(error);
            });
        this.setState({
            data: response.data,
        });
    }

    render() {
        const noWrap = {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: "0",
        };
        const flexParent = {
            display: "flex",
            flexFlow: "row wrap",
            position: "relative",
        };
        const flexChild = {
            flex: "1 1 calc(14% - 0.2rem)",
            height: "200px",
        };

        return (
            <div className="m-5">
                <div style={{ ...flexParent }}>
                    {Object.keys(this.state.data).map((key, index) => (
                        <div style={{ ...flexChild, ...noWrap, margin: "0.2rem" }} key={key} className={`card ${(index < 7) ? "bg-light" : ""}`}>
                            <div className="card-body" style={{ padding: "0.2rem" }}>
                                <h5 className="card-title">{key}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{this.state.data[key].reduce((sum, current) => sum + current.calories, 0)} Calories</h6>
                                {this.state.data[key].map(mealHistory => (
                                    <div className="d-block" style={{ ...noWrap }} key={mealHistory.id}>
                                        {mealHistory.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default MealCalendar;
