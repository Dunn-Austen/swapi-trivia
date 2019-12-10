import React from 'react';
import './ScrollingText.css';
import PropTypes from 'prop-types';
const ScrollingText = (props) => {
  return (
    <section>
      <div className="scrolling-container">
        <div className="scrolling-content">
          <p>
            {props.crawl}
          </p>
        </div>
      </div>
    </section>
  )
};

export default ScrollingText;
