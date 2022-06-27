import React from 'react';

function Carousel() {
  return (
    <div id="carousel-container" className="carousel-slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://cdn.iconscout.com/icon/free/png-256/lemon-fruit-emoj-symbol-food-30666.png" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="https://cdn.iconscout.com/icon/free/png-256/pizza-cheese-slice-fastfood-food-emoj-symbol-30675.png" className="d-block w-100" alt="..." />
        </div>
      </div>
      <a
        type="button"
        className="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        type="button"
        className="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export default Carousel;
