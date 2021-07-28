import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import logo from './logo.svg';
import './App.css';

import MainPage from "./components/MainPage";
import MovieDetails from "./components/MovieDetails";
import MovieShowTime from "./components/MovieShowTime";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header/>
      <body>
      <Router>
      <Switch>
              <Route exact
                path="/"
                render={(props) => <MainPage {...props} />}
                children={
                  <ErrorBoundary>
                    <MainPage />
                  </ErrorBoundary>
                }
              />
             <Route
                path="/movieDetails/:filmId"
                render={(props) => <MovieDetails {...props} />}
                children={
                  <ErrorBoundary>
                    <MovieDetails />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/filmShowTimes/:filmId/:showDate"
                render={(props) => <MovieShowTime {...props} />}
                children={
                  <ErrorBoundary>
                    <MovieShowTime />
                  </ErrorBoundary>
                }
              />
        </Switch>
        </Router>
      </body>
      <Footer />
    </div>
  );
}

export default App;
