import React from 'react';

import SliderHeader from './Slider';

const Header = (props) => {
    return (
        <header className="App-header">
        <div className="flex-display header-container">
        <h3>Book your movie</h3>
        <div className="flex-display">
          <div className="navBar">Home</div>
          <div className="navBar">Contact</div>
        </div>
        </div>
        <div className="slider-styles">
        <SliderHeader />
        </div>
      </header>
    );
}

export default Header;