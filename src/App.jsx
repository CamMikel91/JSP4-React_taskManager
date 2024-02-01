import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavBar from "./components/common/navbar";
import Home from "./components/home";
import TaskList from "./components/taskList";
import TaskForm from "./components/taskForm";
import NotFound from "./components/notFound";
import AdminDashboard from "./components/adminDashboard";
import RegisterForm from "./components/users/registration";
import Login from "./components/login";
import Logout from "./components/logout";
import ProfilePage from "./components/users/profilePage";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <NavBar user={user} />
        <div className="content">
          <Switch>
            <Route path={"/tasks/:_id"} component={TaskForm} />
            <Route
              path="/tasks"
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                return <TaskList {...props} user={user} />;
              }}
            />
            <Route path={"/users/register"} component={RegisterForm} />
            <Route
              path={"/users/profile"}
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                return <ProfilePage {...props} user={user} />;
              }}
            />
            <Route path={"/login"} component={Login} />
            <Route path={"/logout"} component={Logout} />
            <Route
              path={"/adminDashboard"}
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                if (!user.isAdmin) return <Redirect to="/not-found" />;
                return <AdminDashboard {...props} user={user} />;
              }}
            />
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
