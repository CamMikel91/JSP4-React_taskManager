import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { getTasks } from "./fakeTaskService-1";
import NavBar from "./components/common/navbar";
import Home from "./components/home";
import TaskList from "./components/taskList";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    this.setState({ tasks: getTasks() });
  }

  handleComplete = (task) => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks[index] = { ...tasks[index] };
    tasks[index].completed = !tasks[index].completed;
    this.setState({ tasks });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          <Switch>
            <Route
              path="/tasks"
              render={() => (
                <TaskList
                  tasks={this.state.tasks}
                  onCompleted={this.handleComplete}
                />
              )}
            />
            <Route path="/" render={() => <Home />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
