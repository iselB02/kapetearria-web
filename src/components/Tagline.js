import React, { useEffect, useRef, useState } from 'react';
import './Tagline.css';

export default function Tagline() {
  return (
    <div className='carousel-container' >
          <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="10000">
                <img src="image/c1.png" class="d-block w-100" alt="..."/>
              </div>
              <div class="carousel-item" data-bs-interval="2000">
                <img src="image/c2.png" class="d-block w-100" alt="..."/>
              </div>
              <div class="carousel-item" data-bs-interval="2000">
                <img src="image/c3.png" class="d-block w-100" alt="..."/>
              </div>
              <div class="carousel-item" data-bs-interval="2000">
                <img src="image/c4.png" class="d-block w-100" alt="..."/>
              </div>
              <div class="carousel-item" data-bs-interval="2000"  >
                <img src="image/c5.png" class="d-block w-100" alt="..."/>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
    </div>
  );
}
