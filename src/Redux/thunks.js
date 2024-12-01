import {
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
  editTaskRequest,
  editTaskSuccess,
  editTaskFailure,
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
} from "./actions";

export const addTask = () => {
  return async (dispatch) => {
    dispatch(addTaskRequest());
    try {
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      dispatch(addTaskSuccess(data));
    } catch (error) {
      dispatch(addTaskFailure(error.message));
    }
  };
};

export const deleteTask = () => {
  return async (dispatch) => {
    dispatch(deleteTaskRequest());
    try {
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      dispatch(deleteTaskSuccess(data));
    } catch (error) {
      dispatch(deleteTaskFailure(error.message));
    }
  };
};

export const editTask = () => {
  return async (dispatch) => {
    dispatch(editTaskRequest());
    try {
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      dispatch(editTaskSuccess(data));
    } catch (error) {
      dispatch(editTaskFailure(error.message));
    }
  };
};

export const fetchTasks = () => {
  return async (dispatch) => {
    dispatch(fetchTasksRequest());
    try {
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      dispatch(fetchTasksSuccess(data));
    } catch (error) {
      dispatch(fetchTasksFailure(error.message));
    }
  };
};