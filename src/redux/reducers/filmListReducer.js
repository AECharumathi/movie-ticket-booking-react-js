import types from "../store/types";

const initialState = {
  filmList: false,
};

const filmList = (state = initialState, action) => {
  switch (action.type) {
    case types.FILM_LIST:
      return {
        ...state,
        filmList: action.payload,
      };
    case types.RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default filmList;
