import types from "../store/types";

const initialState = {
  seatDetail: false,
};

const seatDetail = (state = initialState, action) => {
  switch (action.type) {
    case types.SEAT_DETAILS:
      return {
        ...state,
        seatDetail: action.payload,
      };
    case types.RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default seatDetail;
