import React, { Component } from "react";
import CompletedBtn from "./completedBtn";

class TaskList extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="text-center">Task Manager</h1>
        <ul className="list-unstyled">
          {this.props.tasks.map((task) => (
            <li key={task._id}>
              <strong>Task ID</strong>: {task._id} <br />
              <strong>Title:</strong> {task.title} <br />
              <strong>Task:</strong> {task.task} <br />
              <strong>Category:</strong> {task.category} <br />
              <strong>Severity:</strong> {task.severity.name} <br />
              <CompletedBtn
                completed={task.completed}
                onClick={() => this.props.onCompleted(task)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TaskList;
