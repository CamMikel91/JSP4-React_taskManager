import React, { Component } from "react";
import "./css/taskDetails.css";

class TaskDetails extends Component {
  render() {
    return (
      <div id="taskDetails">
        <h1>Task Details</h1>
        <div id="taskDetailsContent">
          <p>Task ID: {this.props.match.params._id}</p>
          <p>Task Title: {this.props.match.params.title}</p>
          <button className="btn" onClick={this.props.history.goBack}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default TaskDetails;
