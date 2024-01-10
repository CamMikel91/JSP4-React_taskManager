import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";

class RegisterForm extends Form {
  state = {
    data: {
      name: "",
      password: "",
      email: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(50).required(),
  };

  doSubmit = () => {
    // Call the server
    console.log(`Submitted`);
  };

  render() {
    return (
      <div id="register">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit} className="container">
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
