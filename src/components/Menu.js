import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Menu.css';

function Menu() {
  return (
    <Container className='container1'>
      <Row className='menu-row'>
        <Col className='menu-col'>
          <button className='menu-btn'>
            <div className="menu-content">
              <span className="menu-text">Drinks</span>
              <img src='image/drinks.png' alt="Drinks" className="menu-img"/>
            </div>
          </button>
        </Col>
        <Col className='menu-col'>
          <button className='menu-btn'>
            <div className="menu-content">
              <span className="menu-text">Snacks</span>
              <img src='image/snacks.png' alt="Snacks" className="menu-img"/>
            </div>
          </button>
        </Col>
        <Col className='menu-col'>
          <button className='menu-btn'>
            <div className="menu-content">
              <span className="menu-text">Meals</span>
              <img src='image/meals.png' alt="Meals" className="menu-img"/>
            </div>
          </button>
        </Col>
        <Col className='menu-col'>
          <button className='menu-btn'>
            <div className="menu-content">
              <span className="menu-text">Cakes</span>
              <img src='image/cakes.png' alt="Cakes" className="menu-img"/>
            </div>
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default Menu;
