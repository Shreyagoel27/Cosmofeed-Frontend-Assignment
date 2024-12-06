import { addTaskList, deleteTaskList, editTaskList } from "../utils";
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
  globalSearchRequest,
  globalSearchSuccess,
  globalSearchFailure,
  sortTaskListRequest,
  sortTaskListSuccess,
  sortTaskListFailure,
  groupTaskListRequest,
  groupTaskListSuccess,
  groupTaskListFailure,
} from "./actions/actions";

export const addTask = (list, groupBy, data) => {
  return async (dispatch) => {
    dispatch(addTaskRequest());
    try {
      const result = addTaskList(list, groupBy, data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(addTaskSuccess(result));
    } catch (error) {
      dispatch(
        addTaskFailure(
          error.message || "An error occurred while adding the task",
        ),
      );
    }
  };
};

export const deleteTask = (list, id) => {
  return async (dispatch) => {
    dispatch(deleteTaskRequest());
    try {
      const result = deleteTaskList(list, id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(deleteTaskSuccess(result));
    } catch (error) {
      dispatch(deleteTaskFailure(error.message));
    }
  };
};

export const editTask = (list, data, groupBy) => {
  return async (dispatch) => {
    dispatch(editTaskRequest());
    try {
      const result = editTaskList(list, data, groupBy);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(editTaskSuccess(result));
    } catch (error) {
      dispatch(editTaskFailure(error.message));
    }
  };
};

export const searchTask = (data) => {
  return async (dispatch) => {
    dispatch(globalSearchRequest());
    try {
      dispatch(globalSearchSuccess(data));
    } catch (error) {
      dispatch(globalSearchFailure(error.message));
    }
  };
};

export const sortTaskList = (data) => {
  return async (dispatch) => {
    dispatch(sortTaskListRequest());
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(sortTaskListSuccess(data));
    } catch (error) {
      dispatch(sortTaskListFailure(error.message));
    }
  };
};

export const groupTaskList = (data, value) => {
  return async (dispatch) => {
    dispatch(groupTaskListRequest());
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(groupTaskListSuccess(data, value));
    } catch (error) {
      dispatch(groupTaskListFailure(error.message));
    }
  };
};
