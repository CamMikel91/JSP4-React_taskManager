import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  getTasks,
  getGenres,
  updateTask,
  deleteTask,
} from "../services/taskService";
import _ from "lodash";
import ControlPanel from "./controlPanel";
import TaskTable from "./taskTable";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import "./css/taskList.css";

class TaskList extends Component {
  state = {
    tasks: [],
    genres: [],
    pageSize: 5,
    currentPage: 1,
    filters: {
      status: "all",
      severity: "all",
      category: "all",
    },
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const tasks = await getTasks();
    const genres = await getGenres();
    this.setState({ tasks, genres });
  }

  // handler for changing pages
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  // handler for sorting tasks
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  // handler for creating new tasks
  handleNewTask = (task) => {
    const tasks = [...this.state.tasks, task];
    this.setState({ tasks });
  };

  // handler for updating tasks
  handleUpdate = (task) => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(tasks.find((t) => t._id === task._id));
    tasks[index] = task;
    this.setState({ tasks });
  };

  // handler for deleting tasks
  handleDelete = (task) => {
    const originalTasks = this.state.tasks;
    const tasks = this.state.tasks.filter((t) => t._id !== task._id);
    this.setState({ tasks });

    // delete task from database
    try {
      deleteTask(task);
    } catch (ex) {
      if (ex.response) {
        alert("An error occurred while deleting the task.");
        this.setState({ tasks: originalTasks });
      }
    }
  };

  // handle task completion toggle
  handleComplete = (task) => {
    const originalTasks = this.state.tasks;
    const tasks = this.state.tasks;
    const index = tasks.indexOf(tasks.find((t) => t._id === task._id));
    tasks[index].completed = !tasks[index].completed;
    this.setState({ tasks });

    // update task in database
    try {
      updateTask(task);
    } catch (ex) {
      if (ex.response) {
        alert("An error occurred while updating the task.");
        this.setState({ tasks: originalTasks });
      }
    }
  };

  // handler for filtering tasks
  handleFilter = (filter) => {
    const filters = { ...this.state.filters };
    filters[filter.name] = filter.value;
    this.setState({ filters, currentPage: 1 });
  };

  // helper function for getting genre name
  getGenreName = (task) => {
    const genre = this.state.genres.find((g) => g._id === task.severity);
    return genre.name;
  };

  render() {
    const { pageSize, currentPage, sortColumn, tasks, genres } = this.state;

    // filter tasks by status, severity, and category
    const filtered = tasks.filter((task) => {
      console.log(genres);
      if (this.state.filters.status === "all") {
        if (this.state.filters.severity === "all") {
          if (this.state.filters.category === "all") return task;
          if (this.state.filters.category === task.category) return task;
          return null;
        } else {
          if (this.state.filters.category === "all") {
            if (this.state.filters.severity === this.getGenreName(task))
              return task;
            return null;
          } else {
            if (
              this.state.filters.severity === this.getGenreName(task) &&
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
              if (this.state.filters.severity === this.getGenreName(task))
                return task;
              return null;
            }
            if (this.state.filters.status === "complete" && task.completed) {
              if (this.state.filters.severity === this.getGenreName(task))
                return task;
              return null;
            }
            return null;
          } else {
            if (
              this.state.filters.status === "incomplete" &&
              !task.completed &&
              this.state.filters.severity === this.getGenreName(task) &&
              this.state.filters.category === task.category
            )
              return task;
            if (
              this.state.filters.status === "complete" &&
              task.completed &&
              this.state.filters.severity === this.getGenreName(task) &&
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
              genres={this.state.genres}
              tasks={tasksPaginated}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onTaskComplete={this.handleComplete}
              onTaskDelete={this.handleDelete}
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
