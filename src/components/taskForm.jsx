import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  getGenres,
  getTask,
  // getTasks,
  updateTask,
  createTask,
} from "../services/taskService";
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
    genres: [],
    // tasks: [],
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

  async componentDidMount() {
    // let tasks = await getTasks();
    const genres = await getGenres();
    this.setState({ genres });
    const taskId = this.props.match.params._id;

    // check for new task
    if (taskId === "new") {
      this.setState({ formType: "new" });
      return;
    } else {
      // check for existing task
      this.setState({ formType: "update" });
      const task = await getTask(taskId);
      console.log(task);
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
      severity: task.severity,
      completed: task.completed,
    };
  }
  // handler for creating new task
  handleNewTask = async () => {
    const newTask = {
      title: this.state.data.title,
      task: this.state.data.task,
      category: this.state.data.category,
      severity: this.state.data.severity,
      completed: false,
    };
    try {
      await createTask(newTask);
      this.props.history.push("/tasks");
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.title = ex.response.data;
        this.setState({ errors });
      }
      alert("An error occurred while creating the task.");
    }
  };

  // handler for updating task
  handleTaskUpdate = async (task) => {
    const updatedTask = {
      _id: this.state.data._id,
      title: this.state.data.title,
      task: this.state.data.task,
      category: this.state.data.category,
      severity: this.state.data.severity,
      completed: this.state.data.completed || false,
    };
    try {
      await updateTask(updatedTask);
      this.props.history.push("/tasks");
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.title = ex.response.data;
        this.setState({ errors });
      }
      alert("An error occurred while updating the task.");
    }
  };

  doSubmit = () => {
    // if new task, create new task
    if (this.state.formType === "new") {
      this.handleNewTask();
    } else {
      // if existing task, update task
      this.handleTaskUpdate();
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
