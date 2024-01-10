import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { getTasks } from "./fakeTaskService-1";
import NavBar from "./components/common/navbar";
import Home from "./components/home";
import TaskList from "./components/taskList";
import TaskForm from "./components/taskForm";
import NotFound from "./components/notFound";
import AdminDashboard from "./components/adminDashboard";
import RegisterForm from "./components/users/registration";
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

  handleSaveTask = (task) => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks[index] = { ...tasks[index] };
    tasks[index].title = task.title;
    tasks[index].task = task.task;
    tasks[index].category = task.category;
    tasks[index].severity = task.severity;
    tasks[index].completed = task.completed;
    this.setState({ tasks });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          <Switch>
            <Route
              path={"/tasks/:_id"}
              render={(props) => (
                <TaskForm
                  tasks={this.state.tasks}
                  onSaveTask={this.handleSaveTask}
                  {...props}
                />
              )}
            />
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
            <Route path={"/users/register"} component={RegisterForm} />
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
