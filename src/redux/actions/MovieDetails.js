import axios from 'axios';
import  headers from './common/headers';
import url from "./common/url";

export const getFilmDetails = (filmId) => (dispatch) => {
    console.log("hello")
    axios.get(url + "/filmDetails/?film_id="+filmId,{
        headers: headers}
        ).then(response => dispatch( {
            type: "FILM_DETAIL",
            payload: response.data
        }
            )).catch((error)=>alert(error))
}
