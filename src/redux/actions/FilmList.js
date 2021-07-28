import axios from "axios";
import headers from "./common/headers";
import url from "./common/url";

export const getFilmList = () => (dispatch) => {
  axios
    .get(url + "/filmsNowShowing/?n=30", {
      headers: headers,
    })
    .then((response) =>
      dispatch({
        type: "FILM_LIST",
        payload: response.data,
      })
    )
    .catch((error) => alert(error));
};
