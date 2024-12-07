import {
  ADD_TASK_REQUEST,
  ADD_TASK,
  DELETE_TASK,
  DELETE_TASK_REQUEST,
  EDIT_TASK_REQUEST,
  EDIT_TASK,
  EDIT_TASK_FAILURE,
  GLOBAL_SEARCH_REQUEST,
  GLOBAL_SEARCH,
  GLOBAL_SEARCH_FAILURE,
  SORT_TASK_LIST_REQUEST,
  SORT_TASK_LIST,
  SORT_TASK_LIST_FAILURE,
  GROUP_TASK_LIST_REQUEST,
  GROUP_TASK_LIST,
  GROUP_TASK_LIST_FAILURE,
  ADD_TASK_FAILURE,
  DELETE_TASK_FAILURE,
} from "./actions/actionTypes";
const initialState = {
  taskList: {
    "": [],
  },
  globalSearchList: {},
  groupByValue: "",
  loading: false,
  error: null,
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
        taskList: action.payload,
        loading: false,
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
        error: action.payload || "An error occurred.",
        loading: false,
      };
    case EDIT_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_TASK:
      return {
        ...state,
        taskList: action.payload,
        loading: false,
      };
    case EDIT_TASK_FAILURE:
      return {
        ...state,
        error: action.payload || "An error occurred.",
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
        taskList: action.payload,
        loading: false,
      };
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        error: action.payload || "An error occurred.",
        loading: false,
      };
    case GLOBAL_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GLOBAL_SEARCH:
      return {
        ...state,
        globalSearchList: action?.payload,
        loading: false,
      };
    case GLOBAL_SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || "An error occurred.",
      };
    case SORT_TASK_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SORT_TASK_LIST:
      return {
        ...state,
        taskList: action?.payload,
        loading: false,
      };
    case SORT_TASK_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || "An error occurred.",
      };
    case GROUP_TASK_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GROUP_TASK_LIST:
      return {
        ...state,
        taskList: action?.payload?.data,
        groupByValue: action?.payload?.value,
        loading: false,
      };
    case GROUP_TASK_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || "An error occurred.",
      };
    default:
      return state;
  }
};

export default rootReducer;
