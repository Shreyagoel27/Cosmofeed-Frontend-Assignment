import {
  ADD_TASK_REQUEST,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  DELETE_TASK_REQUEST,
  EDIT_TASK_REQUEST,
  EDIT_TASK_LIST_REQUEST,
  EDIT_TASK_LIST,
} from "./actions/actionTypes";
const initialState = {
  taskList: [
    {
      id: 1,
      summary: "Learn React",
      description: "A JavaScript library for building user interfaces.",
      createdAt: "1679553199",
      dueDate: "2024-12-31",
      priority: "High",
      pending: true,
    },
    {
      id: 2,
      summary: "Master Node.js",
      description: "Run JavaScript on the server side with Node.js.",
      dueDate: "2024-12-31",
      priority: "High",
      pending: true,
      createdAt: "1679553199",
    },
    {
      id: 3,
      summary: "Explore Docker",
      description: "Containerize your applications for scalability.",
      dueDate: "2024-12-31",
      priority: "High",
      pending: true,
      createdAt: "1679553199",
    },
  ],
  globalSearchList: [],
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
    case EDIT_TASK_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_TASK_LIST:
      return {
        ...state,
        globalSearchList: [...action?.payload],
        loading: false,
      };
    default:
      return state;
  }
};

export default rootReducer;
