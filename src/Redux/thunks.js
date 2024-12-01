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
  editTaskListRequest,
  editTaskListSuccess,
  editTaskListFailure,
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

export const editTaskList = (data) => {
  return async (dispatch) => {
    dispatch(editTaskListRequest());
    try {
      dispatch(editTaskListSuccess(data));
    } catch (error) {
      dispatch(editTaskListFailure(error.message));
    }
  };
};
