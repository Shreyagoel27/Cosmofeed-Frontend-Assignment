import { deleteTaskList, editTaskList } from "../utils";
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
    "": [
      {
        id: 1,
        summary: "Learn React",
        description: "A JavaScript library for building user interfaces.",
        createdAt: "1679553199",
        dueDate: "2024-12-31",
        priority: "low",
        pending: false,
      },
      {
        id: 2,
        summary: "Master Node.js",
        description: "Run JavaScript on the server side with Node.js.",
        dueDate: "2024-12-31",
        priority: "high",
        pending: true,
        createdAt: "1679553199",
      },
      // {
      //   id: 3,
      //   summary: "Explore Docker",
      //   description: "Containerize your applications for scalability.",
      //   dueDate: "2024-12-31",
      //   priority: "medium",
      //   pending: true,
      //   createdAt: "1679553196",
      // },
      // {
      //   id: 4,
      //   summary: "Master Node.js",
      //   description: "Run JavaScript on the server side with Node.js.",
      //   dueDate: "2024-11-30",
      //   priority: "high",
      //   pending: true,
      //   createdAt: "1679553199",
      // },
      // {
      //   id: 5,
      //   summary: "Explore Docker",
      //   description: "Containerize your applications for scalability.",
      //   dueDate: "2024-10-31",
      //   priority: "high",
      //   pending: true,
      //   createdAt: "1679553196",
      // },
    ],
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
