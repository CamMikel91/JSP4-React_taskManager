import React, { Component } from "react";
import Table from "./common/table";
import CompletedBtn from "./common/completedBtn";

class TaskTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "task", label: "Task" },
    { path: "category", label: "Category" },
    {
      path: "severity",
      label: "Severity",
      content: (task) => {
        const severityId = task.severity;
        const genre = this.props.genres.find((g) => g._id === severityId);
        return genre.name;
      },
    },
    {
      key: "completed",
      path: "completed",
      label: "Status",
      content: (task) => (
        <CompletedBtn
          completed={task.completed}
          onClick={(e) => {
            e.stopPropagation();
            this.props.onTaskComplete(task);
          }}
        />
      ),
    },
    {
      key: "delete",
      path: "delete",
      label: "",
      content: (task) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            this.props.onTaskDelete(task);
            this.props.onDelete(task);
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { tasks, onSort, sortColumn } = this.props;
    return (
      <div className="table-responsive px-2">
        <Table
          columns={this.columns}
          data={tasks}
          sortColumn={sortColumn}
          onSort={onSort}
          routeBase={"tasks"}
        />
      </div>
    );
  }
}

export default TaskTable;
