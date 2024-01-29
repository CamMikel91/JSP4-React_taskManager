import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          <Switch>
            <Route path={"/tasks/:_id"} component={TaskForm} />
            <Route path="/tasks" component={TaskList} />
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
