import types from "../store/types";

const initialState = {
  filmDetail: false,
};

const filmDetail = (state = initialState, action) => {
  switch (action.type) {
    case types.FILM_DETAIL:
      return {
        ...state,
        filmDetail: action.payload,
      };
    case types.RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default filmDetail;
