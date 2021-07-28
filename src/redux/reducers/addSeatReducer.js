import types from "../store/types";

const initialState = {
  addSeat: false,
};

const addSeat = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_SEAT:
      return {
        ...state,
        addSeat: action.payload,
      };
    case types.RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default addSeat;
