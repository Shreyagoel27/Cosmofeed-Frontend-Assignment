import { ADD_TASK, DELETE_TASK, EDIT_TASK, FETCH_TASKS } from "./actionTypes";

export const AddTaskRequest = () => ({
  type: ADD_TASK,
});

export const AddTaskSuccess = (data) => ({
  type: ADD_TASK,
  payload: data,
});

export const AddTaskFailure = (error) => ({
  type: ADD_TASK,
  payload: error,
});

export const DeleteTaskRequest = () => ({
  type: DELETE_TASK,
});

export const DeleteTaskSuccess = (data) => ({
  type: DELETE_TASK,
  payload: data,
});

export const DeleteTaskFailure = (error) => ({
  type: DELETE_TASK,
  payload: error,
});

export const EditTaskRequest = () => ({
  type: EDIT_TASK,
});

export const EditTaskSuccess = (data) => ({
  type: EDIT_TASK,
  payload: data,
});

export const EditTaskFailure = (error) => ({
  type: EDIT_TASK,
  payload: error,
});

export const FetchTasksRequest = () => ({
  type: FETCH_TASKS,
});

export const FetchTasksSuccess = (data) => ({
  type: FETCH_TASKS,
  payload: data,
});

export const FetchTasksFailure = (error) => ({
  type: FETCH_TASKS,
  payload: error,
});
