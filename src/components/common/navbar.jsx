import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./css/navbar.css";

const NavBar = () => {
  return (
    <ul class="nav nav-pills">
      <li class="nav-item">
        <Link to={"/"} class="nav-link" aria-current="page">
          Home
        </Link>
      </li>
      <li class="nav-item">
        <Link to={"/tasks"} class="nav-link">
          Tasks
        </Link>
      </li>
      <li class="nav-item">
        <Link to={"/login"} class="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
