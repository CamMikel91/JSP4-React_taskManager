import React from "react";
import { Link } from "react-router-dom";

const TestingArea = () => {
  return (
    <div className="testingArea">
      <h2>Testing Area</h2>
      <p>Temporary links for testing routes</p>
      <ul>
        <li>
          <Link to={"/adminDashboard"} className="link-info">
            Admin Dashboard
          </Link>
          <p>If logged in user is admin, route to admin dashboard</p>
        </li>
        <li>
          <Link to={"/userDashboard"} className="link-info">
            User Dashboard
          </Link>
          <p>If logged in user is not admin, route to user dashboard</p>
        </li>
      </ul>
    </div>
  );
};

export default TestingArea;
