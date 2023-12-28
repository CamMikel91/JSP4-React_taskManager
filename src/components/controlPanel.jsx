import React from "react";
import "./css/controlPanel.css";

const ControlPanel = (props) => {
  const { onFilter } = props;

  return (
    <div className="container controlPanel pt-3">
      <div className="card filters">
        <div className="card-header">
          <h5 className="card-title">Filters</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              onChange={(e) => {
                onFilter(e.currentTarget);
              }}
            >
              <option value="all">All</option>
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="severity" className="form-label">
              Severity
            </label>
            <select
              className="form-select"
              id="severity"
              name="severity"
              onChange={(e) => {
                onFilter(e.currentTarget);
              }}
            >
              <option value="all">All</option>
              <option value="Normal">Normal</option>
              <option value="Important">Important</option>
              <option value="Very Important">Very Important</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              name="category"
              onChange={(e) => {
                onFilter(e.currentTarget);
              }}
            >
              <option value="all">All</option>
              <option value="Home">Home</option>
              <option value="DayToDay">Day To Day</option>
              <option value="Work">Work</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
