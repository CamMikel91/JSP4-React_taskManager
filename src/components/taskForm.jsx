import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import "./css/taskForm.css";

class TaskForm extends Form {
  state = {
    data: {
      title: "",
      task: "",
      category: "",
      severity: "",
      completed: false,
    },
    formType: "",
    errors: {},
    genres: this.props.genres,
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
    severity: Joi.string().required(),
    completed: Joi.boolean().required(),
  };

  componentDidMount() {
    let tasks = this.props.tasks;
    const taskId = this.props.match.params._id;

    // check for new task
    if (taskId === "new") {
      this.setState({ formType: "new" });
      return;
    } else {
      // check for existing task
      this.setState({ formType: "update" });
      const task = tasks.find((t) => t._id === taskId);
      if (!task) return this.props.history.replace("/not-found");

      this.setState({ data: this.mapToViewModel(task) });
    }
  }

  mapToViewModel(task) {
    return {
      _id: task._id,
      title: task.title,
      task: task.task,
      category: task.category,
      severity: task.severity._id,
      completed: task.completed,
    };
  }

  doSubmit = () => {
    // if new task, create new task
    if (this.state.formType === "new") {
      const newTask = {
        _id: Date.now().toString(),
        title: this.state.data.title,
        task: this.state.data.task,
        category: this.state.data.category,
        severity: this.state.genres.find(
          (genre) => genre._id === this.state.data.severity
        ),
        completed: false,
      };
      this.props.onNewTask(newTask);
      this.props.history.push("/tasks");
      return;
    } else {
      const updatedTask = {
        _id: this.state.data._id,
        title: this.state.data.title,
        task: this.state.data.task,
        category: this.state.data.category,
        severity: this.state.genres.find(
          (genre) => genre._id === this.state.data.severity
        ),
        completed: this.state.data.completed || false,
      };

      this.props.onTaskUpdate(updatedTask);
      this.props.history.push("/tasks");
    }
  };

  render() {
    const { genres } = this.state;
    return (
      <div id="taskForm">
        <h1>Task Details</h1>
        <form onSubmit={this.handleSubmit} className="container">
          {this.renderInput("title", "Title")}
          {this.renderInput("task", "Task")}
          {this.renderInput("category", "Category")}
          {this.renderSelect("severity", "Severity", genres)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default TaskForm;
