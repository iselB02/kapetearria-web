import React, { useState } from 'react';
import './Details.css';
import Menu from './Menu';
import StoreSchedule from './StoreSchedule';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Details() {
  const [activeSection, setActiveSection] = useState('details');
  const [searchQuery, setSearchQuery] = useState('');

  const showDetails = () => setActiveSection('details');
  const showHours = () => setActiveSection('hours');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="container" id='details-container'>
    <div className="row">
      <div className="col" id='col1'>
        <div className="buttons-container">
          <div>
            <button 
              className={`btn btn-primary ${activeSection === 'details' ? 'active' : ''}`} 
              type="button"
              onClick={showDetails}
              id='btn1'
            >
              Store Details
            </button>
            <button 
              className={`btn btn-primary ${activeSection === 'hours' ? 'active' : ''}`} 
              type="button"
              onClick={showHours}
            >
              Store Hours
            </button>
          </div>
  
          {/* Search Form */}
          {/* Search Form */}
            <Form onSubmit={handleSearchSubmit} className='search-form'>
              <Row className='search-row'>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="me-2"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit" className="btn-search">Search</Button>
                </Col>
              </Row>
            </Form>
        </div>
  
        {/* Conditionally render the content based on the activeSection state */}
        {activeSection === 'details' && <Menu />}
        {activeSection === 'hours' && <StoreSchedule/>}
      </div>
    </div>
  </div>
  
  );
}

export default Details;
