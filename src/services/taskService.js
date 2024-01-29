// import axios from "axios";
import http from "./httpService";

export const getTasks = async () => {
  try {
    const response = await http.get(`/api/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    throw error;
  }
};

export const getTask = async (id) => {
  try {
    const response = await http.get(`/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving task:", error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await http.get(`/api/genres`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving genres:", error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await http.post(`/api/tasks`, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (task) => {
  console.log("task:", task);

  try {
    const response = await http.put(`/api/tasks/${task._id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (task) => {
  try {
    const response = await http.delete(`/api/tasks/${task._id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
