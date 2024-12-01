import { ADD_TASK_REQUEST, ADD_TASK } from "./actions/actionTypes";
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
    default:
      return state;
  }
};

export default rootReducer;
