import axios from "axios";
import headers from "./common/headers";
import url from "./common/url";

export const getShowTime = (filmId, filmDate) => (dispatch) => {
  axios
    .get(url + "/filmShowTimes/?n=20&film_id=" + filmId + "&date=" + filmDate, {
      headers: headers,
    })
    .then((response) =>
      dispatch({
        type: "SHOW_TIME",
        payload: response.data,
      })
    )
    .catch((error) => alert(error));
};
