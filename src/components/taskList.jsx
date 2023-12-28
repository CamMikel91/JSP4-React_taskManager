import React, { Component } from "react";
import ControlPanel from "./controlPanel";
import CompletedBtn from "./common/completedBtn";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import "./css/taskList.css";

class TaskList extends Component {
  state = {
    pageSize: 10,
    currentPage: 1,
    filters: {
      status: "all",
      severity: "all",
      category: "all",
    },
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

  render() {
    const { pageSize, currentPage } = this.state;

    // filter tasks by status, severity, and category
    const filtered = this.props.tasks.filter((task) => {
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

    // paginate filtered tasks
    const tasks = paginate(filtered, currentPage, pageSize);

    // if there are no tasks, display a message
    if (tasks.length === 0)
      return (
        <div className="row g-0">
          <div className="col-3">
            <ControlPanel onFilter={this.handleFilter} />
          </div>
          <div className="col-9">
            <div className="taskManager">
              <h1 className="text-center">Task Manager</h1>
              <p className="text-center my-5">
                There are currently no tasks here... Time to relax and take it
                easy.
              </p>
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
            <div className="table-responsive px-2">
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Task</th>
                    <th>Category</th>
                    <th>Severity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.task}</td>
                      <td>{task.category}</td>
                      <td>{task.severity.name}</td>
                      <td>
                        <CompletedBtn
                          completed={task.completed}
                          onClick={() => this.props.onCompleted(task)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
