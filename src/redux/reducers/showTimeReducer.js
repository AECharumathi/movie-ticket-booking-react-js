import types from "../store/types";

const initialState = {
  showTime: false,
};

const showTime = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_TIME:
      return {
        ...state,
        showTime: action.payload,
      };
    case types.RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default showTime;
