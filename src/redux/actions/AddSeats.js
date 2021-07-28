import axios from "axios";
import headers from "./common/headers";
import url from "./common/url";
import types from "../store/types";

export const postSeatingDetails = (data,onSuccessMsg) => (dispatch) => {
  axios
    .post(`http://localhost:9000/seatingDetails/`,data)
    .then((response) =>
      {
        onSuccessMsg();
        dispatch({
          type: types.ADD_SEAT,
          payload: response.data,
        })
      }
      
    )
    .catch((error) => alert(error));
};

export const getSeatDetails = (id) => (dispatch) => {
  axios
  .get(`http://localhost:9000/seatingDetails/${id}`)
    .then((response) =>
      {
        dispatch({
          type: types.GET_SEAT,
          payload: response.data,
        })
      }
      
    )
    .catch((error) => console.log("seating details not found"));
};

export const putSeatingDetails = async (id,data,onSuccessMsg) => { //(dispatch) => {
  //const task = getTask(id);
  console.log(id);
  axios
    .put(`http://localhost:9000/seatingDetails/${id}`,{data})
    .then((response) =>
      {
        onSuccessMsg();
        // dispatch({
        //   type: types.ADD_SEAT,
        //   payload: response.data,
        // })
      }
      
    )
    .catch((error) => alert(error));
};