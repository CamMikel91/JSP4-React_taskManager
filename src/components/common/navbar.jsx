import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./css/navbar.css";

const NavBar = ({ user }) => {
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
      {/* Any user is logged in */}
      {user && (
        <>
          {/* If user is not admin, render link to profile page */}
          {!user.isAdmin && (
            // <>
            <li class="nav-item">
              <Link to={"/users/profile"} class="nav-link">
                Profile
              </Link>
            </li>
            // </>
          )}
          {/* Admin is logged in, render link to admin page */}
          {user.isAdmin && (
            <li class="nav-item">
              <Link to={"/adminDashboard"} class="nav-link">
                Admin
              </Link>
            </li>
          )}
          {/* If user is logged in, render logout button */}
          <li class="nav-item">
            <Link to={"/logout"} class="nav-link">
              Logout
            </Link>
          </li>
        </>
      )}

      {/* If no user is logged in, render login and register links */}
      {!user && (
        <>
          <li class="nav-item">
            <Link to={"/users/register"} class="nav-link">
              Register
            </Link>
          </li>
          <li class="nav-item">
            <Link to={"/login"} class="nav-link">
              Login
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavBar;
