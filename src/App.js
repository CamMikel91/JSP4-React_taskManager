import React, { Component } from "react";
import { getTasks } from "./fakeTaskService-1";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    tasks: getTasks(),
  };
  render() {
    return (
      <div className="App">
        <h1 className="text-center">Task Manager</h1>
        <ul className="list-unstyled">
          {this.state.tasks.map((task) => (
            <li key={task._id}>
              <strong>Task ID</strong>: {task._id} <br />
              <strong>Title:</strong> {task.title} <br />
              <strong>Task:</strong> {task.task} <br />
              <strong>Category:</strong> {task.category} <br />
              <strong>Severity:</strong> {task.severity.name} <br />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
