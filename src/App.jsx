import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { getTasks } from "./fakeTaskService-1";
import NavBar from "./components/common/navbar";
import Home from "./components/home";
import TaskList from "./components/taskList";
import TaskDetails from "./components/taskDetails";
import NotFound from "./components/notFound";
import AdminDashboard from "./components/adminDashboard";
import Login from "./components/login";
import UserDashboard from "./components/userDashboard";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

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
            <Route path={"/tasks/:_id/:title"} component={TaskDetails} />
            <Route
              path="/tasks"
              render={(props) => (
                <TaskList
                  tasks={this.state.tasks}
                  onCompleted={this.handleComplete}
                  {...props}
                />
              )}
            />
            <Route path={"/login"} component={Login} />
            <Route path={"/adminDashboard"} component={AdminDashboard} />
            <Route path={"/userDashboard"} component={UserDashboard} />
            <Route path={"/not-found"} component={NotFound} />
            <Route exact path="/" component={Home} />
            <Redirect to={"/not-found"} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
