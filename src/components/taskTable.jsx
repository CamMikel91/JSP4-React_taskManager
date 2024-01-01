import React, { Component } from "react";
import Table from "./common/table";
import CompletedBtn from "./common/completedBtn";

class TaskTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "task", label: "Task" },
    { path: "category", label: "Category" },
    { path: "severity.name", label: "Severity" },
    {
      key: "completed",
      path: "completed",
      label: "Status",
      content: (task) => (
        <CompletedBtn
          completed={task.completed}
          onClick={() => this.props.onCompleted(task)}
        />
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
        />
      </div>
    );
  }
}

export default TaskTable;
