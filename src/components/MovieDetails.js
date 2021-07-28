import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { useParams } from "react-router-dom";
import { Row, Col, Card, CardDeck, Button, Table } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import { getFilmDetails } from "../redux/actions/MovieDetails";
import movieTime from "../assets/movieTime.jpg";
import goBack from "../assets/chevron-left-solid.svg";

import "./common-styles.scss";
import { Link } from "react-router-dom";

const Moviedetail = (props) => {
  const dispatch = useDispatch();

  let { filmId } = useParams();

  const filmDetail = useSelector((state) => state.filmDetail.filmDetail);

  useEffect(() => {
    dispatch(getFilmDetails(filmId));
  }, []);

  return (
    <div className="main-container">
      {filmDetail && (
        <>
      <div>
        <Link to="/" className="style-goBack-container">
          <img src={goBack} alt="export" className="style-goBack-img" />
          Go Back{" "}
        </Link>/{filmDetail.film_name}/details
      </div>
      
        <div style={{ width: "100%", margin:"20px" }}>
          <Row className="movie-detail-container">
            <Col xs={4}>
              {Object.keys(filmDetail.images.poster).length > 0 ||
              filmDetail.images.poster.length > 0 ? (
                <Image
                  src={filmDetail.images.poster[1].medium.film_image}
                  className="headPoster"
                />
              ) : (
                <Image src={movieTime} className="headPoster" />
              )}
            </Col>
            <Col xs={8}>
              <h1>{filmDetail.film_name}</h1>
              <div>
                <p className="synopsis-styles">{filmDetail.synopsis_long}</p>
              </div>
              <Table striped bordered hover id={"movie-detail"} >
                <thead>
               
                {filmDetail.genres.length > 0 ? 
                 <tr>
                    <th>Genre</th>
                    <td>
                     {
                        filmDetail.genres.map((gen) => (
                          <td>{gen.genre_name} </td>
                        ))
                        }
                    </td>
                  </tr>
                   : null }
                  {filmDetail.release_dates && filmDetail.release_dates.length > 0 ?
                    <tr>
                    <th>Release Dates</th>
                    <td>{filmDetail.release_dates.map((date)=><td>{date.release_date.split("-").reverse().join("/")}</td>)}</td>
                  </tr>
                  :null }
                </thead>
                <tbody>
                <tr>
                    <th>Age Rating</th>
                    <td>{filmDetail.age_rating[0].rating}</td>
                  </tr>
                  {filmDetail.cast && filmDetail.cast.length > 0 ? 
                  <tr>
                    <th>Cast Crew</th>
                    <td>
                      {filmDetail.cast.map((cast,index) => (
                        index !== (filmDetail.cast.length-1) ? <span> {cast.cast_name}{","}</span>
                        :  <span>{cast.cast_name}</span>
                      ))}
                    </td>
                  </tr>
                  :null}
                  {filmDetail.writers && filmDetail.writers.length > 0 ?
                  <tr>
                    <th>Produced By</th>
                    <td>
                      {filmDetail.producers.map((producer,index) => 
                       index !== (filmDetail.producers.length-1) ? <span>{producer.producer_name}{", "}</span> 
                                  :  <span>{producer.producer_name}</span>
                      )}
                    </td>
                  </tr>
                  :null}
                  {filmDetail.directors&& filmDetail.directors.length > 0 ? 
                  <tr>
                    <th>Directed By</th>
                    <td>
                      {filmDetail.directors.map((director,index) => (
                       index !== (filmDetail.writers.length-1) ? <span>{director.director_name}{", "}</span> 
                       :  <span>{director.director_name}</span>
                      ))}
                    </td>
                  </tr>
                  :null}
                  {filmDetail.writers&& filmDetail.writers.length > 0 ?
                  <tr>
                    <th>Written By</th>
                    <td>
                      {filmDetail.writers.map((writer,index) => (
                        index !== (filmDetail.writers.length-1) ? <span>{writer.writer_name}{", "}</span>
                        :  <span>{writer.writer_name}</span>
                      ))}
                    </td>
                  </tr>
                  :null}
                  { filmDetail.show_dates && filmDetail.show_dates.length > 0 ?
                  <tr>
                    <th>Show Dates</th>
                    <td>
                      {filmDetail.show_dates.map((show) => (
                        <td><Link to={`/filmShowTimes/${filmDetail.film_id}/${show.date}`} className="link-style">{show.date.split("-").reverse().join("/")}</Link></td>
                      ))}
                    </td>
                  </tr>
                    :null}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <div>
              {Object.keys(filmDetail.images).length > 0
                ? Object.keys(filmDetail.images).map((name) => {
                    return Object.keys(filmDetail.images[name]).length > 0 ? (
                      <div>
                        <h3>Movie {name}</h3>
                        {Object.keys(filmDetail.images[name]).map((port) => (
                          <Image
                            src={
                              filmDetail.images[name][port].medium.film_image
                            }
                            className={
                              name === "poster"
                                ? "posters-movieDetail"
                                : "still-movieDetail"
                            }
                          />
                        ))}
                      </div>
                    ) : null;
                  })
                : null}
            </div>
          </Row>
        </div>
        </>
      )}
    </div>
  );
};

const MovieDetails = withRouter(Moviedetail);
export default MovieDetails;
