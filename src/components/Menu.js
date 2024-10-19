import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Menu.css';

function Menu() {
  return (
    <Container className='container1'>
      <Row className='menu-row'>
        <Col className='menu-col'>
          <Link to="/drinks">  {/* Pass the 'type' as state */}
            <button className='menu-btn'>
              <div className="menu-content">
                <span className="menu-text">Drinks</span>
                <img src='image/drinks.png' alt="Drinks" className="menu-img" />
              </div>
            </button>
          </Link>
        </Col>
        <Col className='menu-col'>
          <Link to="/snacks">  {/* Pass the 'type' as state */}
            <button className='menu-btn'>
              <div className="menu-content">
                <span className="menu-text">Snacks</span>
                <img src='image/snacks.png' alt="Snacks" className="menu-img" />
              </div>
            </button>
          </Link>
        </Col>
        <Col className='menu-col'>
          <Link to="/meals">  {/* Pass the 'type' as state */}
            <button className='menu-btn'>
              <div className="menu-content">
                <span className="menu-text">Meals</span>
                <img src='image/meals.png' alt="Meals" className="menu-img" />
              </div>
            </button>
          </Link>
        </Col>
        <Col className='menu-col'>
          <Link to="/desserts" >  {/* Pass the 'type' as state */}
            <button className='menu-btn'>
              <div className="menu-content">
                <span className="menu-text">Desserts</span>
                <img src='image/cakes.png' alt="Cakes" className="menu-img" />
              </div>
            </button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Menu;
