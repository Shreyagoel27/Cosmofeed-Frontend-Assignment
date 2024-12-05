import { addTaskList, editTaskList } from "../utils";
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
      const latesList = addTaskList(list, groupBy, data);

      dispatch(addTaskSuccess(latesList));
    } catch (error) {
      dispatch(addTaskFailure(error.message));
    }
  };
};

export const deleteTask = (id) => {
  return async (dispatch) => {
    dispatch(deleteTaskRequest());
    try {
      dispatch(deleteTaskSuccess(id));
    } catch (error) {
      dispatch(deleteTaskFailure(error.message));
    }
  };
};

export const editTask = (list, data) => {
  return async (dispatch) => {
    dispatch(editTaskRequest());
    try {
      dispatch(editTaskSuccess(data));
    } catch (error) {
      dispatch(editTaskFailure(error.message));
    }
  };
};

export const searchTask = (data) => {
  return async (dispatch) => {
    dispatch(globalSearchRequest());
    try {
      console.log("data:", data);
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
      dispatch(groupTaskListSuccess(data, value));
    } catch (error) {
      dispatch(groupTaskListFailure(error.message));
    }
  };
};
