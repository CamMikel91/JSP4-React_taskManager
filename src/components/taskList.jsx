import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import ControlPanel from "./controlPanel";
import TaskTable from "./taskTable";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import "./css/taskList.css";

class TaskList extends Component {
  state = {
    tasks: this.props.tasks,
    genres: this.props.genres,
    pageSize: 5,
    currentPage: 1,
    filters: {
      status: "all",
      severity: "all",
      category: "all",
    },
    sortColumn: { path: "title", order: "asc" },
  };

  // handler for filtering tasks
  handleFilter = (filter) => {
    const filters = { ...this.state.filters };
    filters[filter.name] = filter.value;
    this.setState({ filters, currentPage: 1 });
  };

  // handler for changing pages
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  // handler for deleting tasks
  handleDelete = (task) => {
    const tasks = this.state.tasks.filter((t) => t._id !== task._id);
    this.setState({ tasks });
  };

  render() {
    const { pageSize, currentPage, sortColumn, tasks } = this.state;

    // filter tasks by status, severity, and category
    const filtered = tasks.filter((task) => {
      if (this.state.filters.status === "all") {
        if (this.state.filters.severity === "all") {
          if (this.state.filters.category === "all") return task;
          if (this.state.filters.category === task.category) return task;
          return null;
        } else {
          if (this.state.filters.category === "all") {
            if (this.state.filters.severity === task.severity.name) return task;
            return null;
          } else {
            if (
              this.state.filters.severity === task.severity.name &&
              this.state.filters.category === task.category
            )
              return task;
            return null;
          }
        }
      } else {
        if (this.state.filters.severity === "all") {
          if (this.state.filters.category === "all") {
            if (this.state.filters.status === "incomplete" && !task.completed)
              return task;
            if (this.state.filters.status === "complete" && task.completed)
              return task;
            return null;
          } else {
            if (this.state.filters.status === "incomplete" && !task.completed) {
              if (this.state.filters.category === task.category) return task;
              return null;
            }
            if (this.state.filters.status === "complete" && task.completed) {
              if (this.state.filters.category === task.category) return task;
              return null;
            }
            return null;
          }
        } else {
          if (this.state.filters.category === "all") {
            if (this.state.filters.status === "incomplete" && !task.completed) {
              if (this.state.filters.severity === task.severity.name)
                return task;
              return null;
            }
            if (this.state.filters.status === "complete" && task.completed) {
              if (this.state.filters.severity === task.severity.name)
                return task;
              return null;
            }
            return null;
          } else {
            if (
              this.state.filters.status === "incomplete" &&
              !task.completed &&
              this.state.filters.severity === task.severity.name &&
              this.state.filters.category === task.category
            )
              return task;
            if (
              this.state.filters.status === "complete" &&
              task.completed &&
              this.state.filters.severity === task.severity.name &&
              this.state.filters.category === task.category
            )
              return task;
            return null;
          }
        }
      }
    });

    // sort tasks by column
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // paginate filtered tasks
    const tasksPaginated = paginate(sorted, currentPage, pageSize);

    // if there are no tasks, display a message
    if (tasksPaginated.length === 0)
      return (
        <div className="row g-0">
          <div className="col-3">
            <ControlPanel onFilter={this.handleFilter} />
          </div>
          <div className="col-9">
            <div className="taskManager text-center">
              <h1 className="text-center">Task Manager</h1>
              <p className="text-center my-5">
                There are currently no tasks here... Time to relax and take it
                easy.
              </p>
              <Link to="/tasks/new" className="btn btn-info">
                Add Task
              </Link>
            </div>
          </div>
        </div>
      );

    // if there are tasks, display them
    return (
      <div className="row g-0">
        <div className="col-3">
          <ControlPanel onFilter={this.handleFilter} />
        </div>
        <div className="col-9">
          <div className="taskManager">
            <h1 className="text-center">Task Manager</h1>
            <Link to="/tasks/new" className="btn btn-info mx-2">
              Add Task
            </Link>
            <TaskTable
              tasks={tasksPaginated}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onTaskComplete={this.props.onTaskComplete}
              onTaskDelete={this.props.onTaskDelete}
              onDelete={this.handleDelete}
            />
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskList;
