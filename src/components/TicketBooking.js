import React, { useState, useEffect, useRef } from "react";
import { Redirect, withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { render } from "@testing-library/react";
import {
  Form,
  Overlay,
  Tooltip,
  Button,
  Row,
  Col,
  CloseButton,
} from "react-bootstrap";

import Modal from "react-modal";
import Seating from "./Seating";
import { getSeatingDetails } from "../redux/actions/SeatingDetails";
import seats from "./seats";
import {
  postSeatingDetails,
  getSeatDetails,
  putSeatingDetails,
} from "../redux/actions/AddSeats";
import MainPage from "./MainPage";

const BookTicket = (props) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [rows, setRows] = useState(seats);
  const [totalTicket, setTotalTicket] = useState(0);
  const [show, setShow] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [seatDet, setSeatDet] = useState([]);
  const target = useRef(null);
  const seatDetail = useSelector((state) => state.seatDetail.seatDetail);
  const getSeat = useSelector((state) => state.getSeat.getSeat);
  const [isDisabled, setIsDisabled] = useState(true);
  const [notPayed, setNotPayed] = useState(true);
  const [nameError, setNameError] = useState("");
  const [phError, setPhError] = useState("");

  const {
    filmId,
    filmName,
    cinemaId,
    cinemaName,
    showDate,
    startTime,
    endTime,
  } = props;

  function toggleModal() {
    setIsOpen(false);
    window.location.reload();
  }

  useEffect(() => {
    dispatch(getSeatingDetails());
    cinemaId &&
      filmId &&
      showDate &&
      dispatch(getSeatDetails(cinemaId + "_" + filmId + "_" + showDate));
  }, [cinemaId, dispatch, filmId, showDate]);

  useEffect(() => {
    const temp_row = rows;
    console.log(JSON.stringify(getSeat));
    if (Object.keys(getSeat).length > 0) {
      console.log(JSON.stringify(getSeat));
      if (getSeat.id === cinemaId + "_" + filmId + "_" + showDate) {
        getSeat.data.timings.map((t) => {
          t.times
            .filter(
              (time) =>
                time.start_time === startTime && time.end_time === endTime
            )
            .map((it) => {
              it.seat_details.map((i) => {
                let temp = [];
                let index_row;
                temp_row.map((row, index) => {
                  let rw = row.filter((r) => i.seat_number.includes(r.number));
                  rw.map((i) => {
                    let temp = {
                      ...i,
                      isReserved: true,
                      tooltip: "Reserved",
                    };
                    row.map((ob, index) => {
                      if (ob.number === temp.number) {
                        row[index] = temp;
                      }
                    });
                  });
                  index_row = index;
                });
                setRows(temp_row);
              });
            });
        });
      }
    }
  }, [getSeat]);

  const nameRegEx = /^[a-zA-Z]+$/;
  const handleFName = (e) => {
    if (e.target.value !== "" && nameRegEx.test(e.target.value)) {
      setFName(e.target.value);
      setNameError("");
    } else {
      setNameError("Enter only Alphabets for first name");
    }
  };

  const handleLName = (e) => {
    if (e.target.value !== "" && nameRegEx.test(e.target.value)) {
      setLName(e.target.value);
      setNameError("");
    } else {
      setNameError("Enter only Alphabets for last name");
    }
  };
  const phoneRegEx = /^[0-9]+$/;
  const handlePhone = (e) => {
    if (!phoneRegEx.test(e.target.value)) {
      setPhError("Enter only number");
    } else {
      setPhError("");
    }
  };

  const handleTotalTicket = (e) => {
    if (e.target.value > 0 && e.target.value < 6) {
      setShow(false);
      setTotalTicket(e.target.value);
    } else {
      setShow(true);
    }
  };

  const fetchSeats = (seatNumber) => {
    if (fName !== "" && lName !== "") {
      let temp_arr = {
        seat_number: seatNumber,
        name: fName + " " + lName,
        isReserved: true,
      };
      setSeatDet(temp_arr);
      setIsDisabled(false);
    } else {
      alert("Please enter first name and last name");
    }
  };

  const onSuccessMsg = () => {
    alert("Ticket has been booked successfully");
    toggleModal();
    window.location.reload();
  };

  const addSeats = () => {
    const id = cinemaId + "_" + filmId + "_" + showDate;
    if (nameError === "" && phError === "") {
      if (Object.keys(getSeat).length > 0) {
        var temp_obj = getSeat;
        //   console.log(temp_obj);
        let temp_time;
        temp_obj.data.timings.map((time) => {
          temp_time = time.times.filter(
            (t) => t.start_time === startTime && t.end_time === endTime
          );
        });
        //      console.log(temp_time);
        if (temp_time.length > 0) {
          temp_obj.data.timings.map((time) => {
            time.times.map((t) => {
              if (t.start_time === startTime && t.end_time === endTime) {
                t.seat_details = [...t.seat_details, seatDet];
              }
              console.log("vvvvvvvvvvvvvvvvvv " + JSON.stringify(t));
            });
          });
          console.log("temp with date " + JSON.stringify(temp_obj));
        } else {
          var addTiming = {
            date: showDate,
            times: [
              {
                start_time: startTime,
                end_time: endTime,
                seat_details: [seatDet],
              },
            ],
          };
          temp_obj.data["timings"] = [...temp_obj["data"].timings, addTiming];
        }
        const postData = temp_obj;
        putSeatingDetails(id, postData, onSuccessMsg);
      } else {
        var bookTick = {
          id: cinemaId + "_" + filmId + "_" + showDate,
          cinema_id: cinemaId,
          cinema_name: cinemaName,
          film_id: filmId,
          film_name: filmName,
          timings: [
            {
              date: showDate,
              times: [
                {
                  start_time: startTime,
                  end_time: endTime,
                  seat_details: [seatDet],
                },
              ],
            },
          ],
        };
        dispatch(postSeatingDetails(bookTick, onSuccessMsg));
      }
    } else {
      alert("Check the details again");
    }
  };

  const handleSubmit = () => {
    if (notPayed) {
      setNotPayed(false);
    } else {
      setNotPayed(true);
    }
  };

  return (
    <>
      <div style={{ width: "70%" }}>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => toggleModal()}
          contentLabel="My dialog"
          ariaHideApp={false}
        >
          <div className="flex-display">
            <h2>Book your ticket</h2>
            <CloseButton onClick={() => toggleModal()} />
          </div>
          <Form>
            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="fName"
                  placeholder="Enter your first name"
                  onChange={(e) => handleFName(e)}
                  maxLength="25"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="lName"
                  placeholder="Enter your last name"
                  onChange={(e) => handleLName(e)}
                  maxLength="25"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  placeholder="Phone number"
                  maxLength="10"
                  onChange={(e) => handlePhone(e)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Movie Name</Form.Label>
                <Form.Control placeholder="Movie selected" value={filmName} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Cinema Name</Form.Label>
                <Form.Control placeholder="Cinema chosen" value={cinemaName} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Date Selected</Form.Label>
                <Form.Control
                  placeholder="Date selected"
                  value={showDate.split("-").reverse().join("-")}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Show Time</Form.Label>
                <Form.Control
                  placeholder="Showtime selected"
                  value={`${startTime} - ${endTime}`}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Total Tickets</Form.Label>
                <Form.Control
                  ref={target}
                  placeholder="Enter total tickets"
                  onChange={(e) => handleTotalTicket(e)}
                />
              </Form.Group>
              <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    only 5 or less tickets can be added by one person
                  </Tooltip>
                )}
              </Overlay>
            </Row>
            {totalTicket > 0 && totalTicket < 6 ? (
              <Seating
                rows={rows}
                filmId={filmId}
                filmName={filmName}
                cinemaId={cinemaId}
                cinemaName={cinemaName}
                startTime={startTime}
                endTime={endTime}
                maxTicket={totalTicket}
                sendSeats={fetchSeats}
              />
            ) : null}
          </Form>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Make Payment"
              required
              disabled={isDisabled}
              onChange={() => handleSubmit()}
            />
          </Form.Group>
          {notPayed ? (
            <Button variant="primary" type="submit" onClick={() => addSeats()}>
              Submit
            </Button>
          ) : null}
          {"   "}
          <Button variant="outline-dark" onClick={() => toggleModal()}>
            Cancel
          </Button>
        </Modal>
      </div>
      {/* {redirect ? setTimeout(()=>{
  render(
    <Redirect to="/"/>
  )
}, 2000):null} */}
    </>
  );
};

const TicketBooking = withRouter(BookTicket);

export default TicketBooking;
