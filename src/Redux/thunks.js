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
} from "./actions/actions";

export const addTask = (data) => {
  return async (dispatch) => {
    dispatch(addTaskRequest());
    try {
      dispatch(addTaskSuccess(data));
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

export const editTask = (data) => {
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
