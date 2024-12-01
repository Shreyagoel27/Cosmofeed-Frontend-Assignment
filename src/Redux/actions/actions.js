import {
  ADD_TASK_REQUEST,
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  EDIT_TASK_REQUEST,
  EDIT_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_FAILURE,
  GLOBAL_SEARCH_REQUEST,
  GLOBAL_SEARCH,
  GLOBAL_SEARCH_FAILURE,
  SORT_TASK_LIST_REQUEST,
  SORT_TASK_LIST,
  SORT_TASK_LIST_FAILURE,
} from "./actionTypes";

export const addTaskRequest = () => ({
  type: ADD_TASK_REQUEST,
});

export const addTaskSuccess = (data) => ({
  type: ADD_TASK,
  payload: data,
});

export const addTaskFailure = (error) => ({
  type: ADD_TASK_FALIURE,
  payload: error,
});

export const deleteTaskRequest = () => ({
  type: DELETE_TASK_REQUEST,
});

export const deleteTaskSuccess = (data) => ({
  type: DELETE_TASK,
  payload: data,
});

export const deleteTaskFailure = (error) => ({
  type: DELETE_TASK_FAILURE,
  payload: error,
});

export const editTaskRequest = () => ({
  type: EDIT_TASK_REQUEST,
});

export const editTaskSuccess = (data) => ({
  type: EDIT_TASK,
  payload: data,
});

export const editTaskFailure = (error) => ({
  type: EDIT_TASK_FAILURE,
  payload: error,
});

export const globalSearchRequest = () => ({
  type: GLOBAL_SEARCH_REQUEST,
});

export const globalSearchSuccess = (data) => ({
  type: GLOBAL_SEARCH,
  payload: data,
});

export const globalSearchFailure = (error) => ({
  type: GLOBAL_SEARCH_FAILURE,
  payload: error,
});

export const sortTaskListRequest = () => ({
  type: SORT_TASK_LIST_REQUEST,
});

export const sortTaskListSuccess = (data) => ({
  type: SORT_TASK_LIST,
  payload: data,
});

export const sortTaskListFailure = (error) => ({
  type: SORT_TASK_LIST_FAILURE,
  payload: error,
});

export const groupTaskListRequest = () => ({
  type: GROUP_TASK_LIST_REQUEST,
});

export const groupTaskListSuccess = (data) => ({
  type: GROUP_TASK_LIST,
  payload: data,
});

export const groupTaskListFailure = (error) => ({
  type: GROUP_TASK_LIST_FAILURE,
  payload: error,
});
