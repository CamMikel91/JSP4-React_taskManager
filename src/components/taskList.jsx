import React, { Component } from "react";
import CompletedBtn from "./common/completedBtn";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import "./css/taskList.css";

class TaskList extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { pageSize, currentPage } = this.state;

    const tasks = paginate(this.props.tasks, currentPage, pageSize);

    if (tasks.length === 0)
      return (
        <div className="taskManager">
          <h1 className="text-center">Task Manager</h1>
          <p className="text-center">No tasks found.</p>
        </div>
      );

    return (
      <div className="taskManager">
        <h1 className="text-center">Task Manager</h1>

        <div className="table-responsive px-2">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Title</th>
                <th>Task</th>
                <th>Category</th>
                <th>Severity</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task._id}</td>
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
          itemsCount={this.props.tasks.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default TaskList;
