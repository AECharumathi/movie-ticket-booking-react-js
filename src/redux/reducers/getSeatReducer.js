import types from "../store/types";

const initialState = {
  getSeat: false,
};

const getSeat = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SEAT:
      return {
        ...state,
        getSeat: action.payload,
      };
    case types.RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default getSeat;
