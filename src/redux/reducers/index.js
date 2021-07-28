import { combineReducers } from "redux";
import filmList from "./filmListReducer";
import filmDetail from "./filmDetailReducer";
import showTime from './showTimeReducer';
import seatDetail from './seatDetailReducer';
import addSeat from './addSeatReducer';
import getSeat from './getSeatReducer';

const allReducer = combineReducers({
    filmList,
    filmDetail,
    showTime,
    seatDetail,
    addSeat,
    getSeat
})

export default allReducer;