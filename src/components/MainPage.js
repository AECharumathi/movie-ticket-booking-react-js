import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { Row, Col, Card, CardDeck, Button } from "react-bootstrap";

import { getFilmList } from "../redux/actions/FilmList";
import movieTime from "../assets/movieTime.jpg";

import "./common-styles.scss";
import { Link } from "react-router-dom";

const Mainpage = (props) => {
  const dispatch = useDispatch();

  const filmList = useSelector((state) => state.filmList.filmList);

  useEffect(() => {
    dispatch(getFilmList());
  }, []);

  useEffect(() => {
    // filmList && filmList.films && filmList.films.length > 0 &&filmList.films.map((film) => console.log(" image "+film.film_name+" ;; "+JSON.stringify(film.images)))
  }, [filmList]);

  return (
    <div className="main-container">
      {filmList &&
        filmList.films &&
        filmList.films.length > 0 &&
        filmList.films.map((film, index) => (
          <Card style={{ width: "18rem", height: "25rem" }} key={index} className="movie-container">
            {Object.keys(film.images.poster).length > 0 ||
            film.images.poster.length > 0 ? (
              <Card.Img
                variant="top"
                src={film.images.poster[1].medium.film_image}
                className="poster-container"
              />
            ) : (
              <Card.Img
                variant="top"
                src={movieTime}
                style={{ height: "70%" }}
              />
            )}
            <Card.Body>
              <Card.Title style={{
                  fontSize: "17px",
                  fontWeight: "bolder",
                  justifyContent: "center"
                }}>{film.film_name}</Card.Title>

              <Card.Text
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  fontSize: "13px"
                }}
              >
                {film.synopsis_long}
              </Card.Text>
            
              
            </Card.Body>
            <Card.Footer className="movie-footer">
                <span className="age-rating">{film.age_rating[0].rating}</span>
            <Button className="movie-Details"><Link to={`/movieDetails/${film.film_id}`} className="details-show">Details</Link></Button>
            </Card.Footer>
          </Card>
        ))}
    </div>
  );
};

const MainPage = withRouter(Mainpage)
export default MainPage;
