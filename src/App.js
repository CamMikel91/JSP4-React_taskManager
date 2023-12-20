import React, { Component } from "react";
import { getTasks } from "./fakeTaskService-1";
import "./App.css";
import CompletedBtn from "./components/common/completedBtn";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    tasks: getTasks(),
  };

  handleComplete = (task) => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks[index] = { ...tasks[index] };
    tasks[index].completed = !tasks[index].completed;
    this.setState({ tasks });
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
              <CompletedBtn
                completed={task.completed}
                onClick={() => this.handleComplete(task)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
