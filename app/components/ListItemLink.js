import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";

class ListItemLink extends Component {
    render() {
        return (
            <Route path={this.props.to} exact={true}>
                {({ match }) => (
                    <li className={match ? "nav-item active" : "nav-item"}>
                        <Link className="nav-link" {...this.props} />
                    </li>
                )}
            </Route>
        );
    }
}

ListItemLink.propTypes = {
    to: PropTypes.string.isRequired,
};

export default ListItemLink;
