import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import TestingArea from "./testingArea";
import "./css/login.css";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(50).required(),
  };

  doSubmit = () => {
    // Call the server
    console.log(`Submitted`);
  };

  render() {
    return (
      <div id="login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className="container">
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
        <TestingArea />
      </div>
    );
  }
}

export default Login;
