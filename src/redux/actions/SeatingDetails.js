import axios from "axios";
import headers from "./common/headers";
import url from "./common/url";

export const getSeatingDetails = () => (dispatch) => {
  axios
    .get("http://localhost:9000/seatingDetails")
    .then((response) =>
      dispatch({
        type: "SEAT_DETAILS",
        payload: response.data,
      })
    )
    .catch((error) => alert(error));
};
