import {
  ADD_TASK_REQUEST,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  DELETE_TASK_REQUEST,
  EDIT_TASK_REQUEST,
} from "./actions/actionTypes";
const initialState = {
  taskList: [],
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TASK:
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
        loading: false,
      };
    case EDIT_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_TASK:
      console.log(action.payload);
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          if (task.id === action.payload?.id) {
            return {
              ...task,
              ...action.payload,
            };
          }
          return task;
        }),
        loading: false,
      };
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TASK:
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};

export default rootReducer;
