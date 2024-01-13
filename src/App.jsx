import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/common/navbar";
import Home from "./components/home";
import { getTasks } from "./fakeTasks/fakeTaskService";
import { getGenres } from "./fakeTasks/fakeGenreService";
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
    tasks: getTasks(),
    genres: getGenres(),
  };

  handleTaskUpdate = (task) => {
    const tasks = this.state.tasks;
    const updatedTask = task;
    const index = tasks.indexOf(tasks.find((t) => t._id === task._id));
    tasks[index] = updatedTask;
    this.setState({ tasks });
  };

  // handle new task creation
  handleNewTask = (task) => {
    const tasks = [...this.state.tasks, task];
    this.setState({ tasks });
  };

  // handle task completion toggle
  handleComplete = (task) => {
    const tasks = this.state.tasks;
    const index = tasks.indexOf(tasks.find((t) => t._id === task._id));
    tasks[index].completed = !tasks[index].completed;
    this.setState({ tasks });
  };

  // handle task deletion
  handleTaskDelete = (task) => {
    const tasks = this.state.tasks.filter((t) => t._id !== task._id);
    this.setState({ tasks });
  };

  render() {
    const { tasks, genres } = this.state;
    return (
      <div>
        <NavBar />
        <div className="content">
          <Switch>
            <Route
              path={"/tasks/:_id"}
              render={(props) => (
                <TaskForm
                  {...props}
                  tasks={tasks}
                  genres={genres}
                  onTaskUpdate={this.handleTaskUpdate}
                  onNewTask={this.handleNewTask}
                />
              )}
            />
            <Route
              path="/tasks"
              render={() => (
                <TaskList
                  tasks={tasks}
                  genres={genres}
                  onTaskComplete={this.handleComplete}
                  onTaskDelete={this.handleTaskDelete}
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
