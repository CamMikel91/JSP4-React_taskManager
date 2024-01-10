import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import "./css/taskForm.css";
import { getTask, saveTask, getSeverities } from "../fakeTaskService-1";

class TaskForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      task: "",
      category: "",
      severity: { _id: "", name: "" },
      completed: "",
    },
    errors: {},
    severities: [],
    completedOptions: [
      { _id: "true", name: "Complete" },
      { _id: "false", name: "Incomplete" },
    ],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(3).max(100).required(),
    task: Joi.string().min(3).max(100).required(),
    category: Joi.string().min(3).max(100).required(),
    severity: Joi.string().min(3).max(100).required(),
    completed: Joi.boolean().required(),
  };

  componentDidMount() {
    const taskId = this.props.match.params._id;
    if (taskId === "new") return;

    const task = getTask(taskId);
    if (!task) return this.props.history.replace("/not-found");
    // console.log(task);

    const severities = getSeverities();
    // console.log(severities);
    this.setState({ data: this.mapToViewModel(task), severities });
  }

  mapToViewModel(task) {
    return {
      _id: task._id,
      title: task.title,
      task: task.task,
      category: task.category,
      severity: task.severity.name,
      completed: task.completed,
    };
  }

  doSubmit = () => {
    // Call the server - Called when save button is clicked in form
    saveTask(this.state.data);
    console.log(`Submitted`);
    // console.log(this.state.data);
    // this.props.history.push("/tasks");
  };

  render() {
    const { severities, completedOptions } = this.state;
    return (
      <div id="TaskForm">
        <h1>Task Details</h1>
        <form onSubmit={this.handleSubmit} className="container">
          {this.renderInput("title", "Title")}
          {this.renderInput("task", "Task")}
          {this.renderInput("category", "Category")}
          {this.renderSelect("severity", "Severity", severities)}
          {this.renderSelect("completed", "Completed", completedOptions)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default TaskForm;
