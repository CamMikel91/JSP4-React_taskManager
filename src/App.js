import React, { Component } from "react";
import { getTasks } from "./fakeTaskService-1";
import TaskList from "./components/taskList";
import "./App.css";
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
      <TaskList tasks={this.state.tasks} onCompleted={this.handleComplete} />
    );
  }
}

export default App;
