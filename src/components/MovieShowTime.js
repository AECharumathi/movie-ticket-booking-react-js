import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { useParams } from "react-router-dom";
import { Row, Col, Card, CardDeck, Button, Table } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import { getShowTime } from "../redux/actions/ShowTime";
import movieTime from "../assets/movieTime.jpg";
import goBack from "../assets/chevron-left-solid.svg";

import "./common-styles.scss";
import { Link } from "react-router-dom";
import TicketBooking from "./TicketBooking";

const MovieShowtime = (props) => {
  const dispatch = useDispatch();

  let { filmId, showDate } = useParams();

  const showTime = useSelector((state) => state.showTime.showTime);
  const [movieId, setMovieId] = useState(false);
  const [movieName, setMovieName] = useState("");
  const [cineId, setCineId] = useState(false);
  const [cineName, setCineName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [isPurchase, setIsPurchase] = useState(false);

  useEffect(() => {
    dispatch(getShowTime(filmId, showDate));
  }, []);

  useEffect(() => {
    if (showTime) {
      setMovieId(showTime.film.film_id);
      setMovieName(showTime.film.film_name);
    }
  }, [showTime]);

  const bookTicket = (cinemaId, cinemaName, startTime, endTime) => {
    setCineId(cinemaId);
    setCineName(cinemaName);
    setStartTime(startTime);
    setEndTime(endTime);
    setIsPurchase(true);
  };

  const handlePurchase = () => {
    setIsPurchase(false);
  };

  return (
    <div className="main-container">
      {showTime && (
        <>
          <div>
            <Link to={`/`} className="style-goBack-container">
              <img src={goBack} alt="export" className="style-goBack-img" />
              home{" "}
            </Link>
            /
            <Link
              to={`/movieDetails/${showTime.film.film_id}`}
              className="style-goBack-container"
            >
              {showTime.film.film_name}
            </Link>
            /show time
          </div>

          <div style={{ width: "100%" }} className="movie-detail-background">
            <Row className="cinema-container">
              <Col xs={4}>
                {(showTime &&
                  showTime.film.images &&
                  Object.keys(showTime.film.images.poster).length > 0) ||
                showTime.film.images.poster.length > 0 ? (
                  <Image
                    src={showTime.film.images.poster[1].medium.film_image}
                    className="headPoster"
                  />
                ) : (
                  <Image src={movieTime} className="headPoster" />
                )}
              </Col>
              <Col xs={7}>
                <h1>{showTime.film.film_name}</h1>
                {showTime.film.age_rating.length > 0 ? (
                  <h6>Age Rating: {showTime.film.age_rating[0].rating}</h6>
                ) : null}
                <Col>
                  <h4>Pick your share of happiness</h4>
                  {showTime.cinemas.map((cine) => (
                    <Row className="cinema-container">
                      <Col style={{ fontWeight: "bold", fontSize: "24px" }}>
                        {cine.cinema_name}
                      </Col>
                      <Col>
                        {Object.keys(cine.showings).length > 0
                          ? Object.keys(cine.showings).map((item) => (
                              <Row>
                                <Row>{item}</Row>
                                {cine.showings[item].times.length > 0
                                  ? cine.showings[item].times.map((timing) => (
                                      <Row className="showTime-container">
                                        <Button
                                          variant="primary"
                                          onClick={() =>
                                            bookTicket(
                                              cine.cinema_id,
                                              cine.cinema_name,
                                              timing.start_time,
                                              timing.end_time
                                            )
                                          }
                                        >
                                          {timing.start_time}-{timing.end_time}
                                        </Button>
                                      </Row>
                                    ))
                                  : null}
                              </Row>
                            ))
                          : null}
                      </Col>{" "}
                    </Row>
                  ))}
                </Col>
              </Col>
            </Row>
            <Row>
              <div></div>
            </Row>
          </div>
        </>
      )}
      {isPurchase ? (
        <TicketBooking
          filmId={movieId}
          filmName={movieName}
          cinemaId={cineId}
          cinemaName={cineName}
          showDate={showDate}
          startTime={startTime}
          endTime={endTime}
          handlePurchase={handlePurchase}
        />
      ) : null}
    </div>
  );
};

const MovieShowTime = withRouter(MovieShowtime);
export default MovieShowTime;
