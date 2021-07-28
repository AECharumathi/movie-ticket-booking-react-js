import React from 'react';
import { Carousel } from 'react-bootstrap';
import { withRouter } from 'react-router';

import twbb from "../assets/twbb_landscape.jpg";
import stargate from "../assets/stargate_landscape.jpg";
import martain from "../assets/martain_landscape.jpg";

const SliderHeader = (props) => {
    return (
        <Carousel className="slider-styles">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={stargate}
      alt="Stargate"
      style={{objectPosition: "100% 65%"}}
    />
    <Carousel.Caption>
      <h3>Stargate</h3>
      <p>will the revolt won by Jackson and O'Neill alongside the workers?</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={martain}
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>The Martain</h3>
      <p>Will NASA and a team of international scientists bring \"the Martian\" home?</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={twbb}
      alt="Third slide"
      style={{objectPosition: "100% 25%"}}
    />

    <Carousel.Caption>
      <h3>Th<span style={{color: "black"}}>ere Will Be Blood</span></h3>
      <p>Will <span style={{color: "black"}}>th</span>ere be bl<span style={{color: "black"}}>oo</span>d w<span style={{color: "black"}}>hile quest for treasure?</span></p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    )
}


export default SliderHeader;