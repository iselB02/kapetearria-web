import React, { useState } from 'react';
import './Details.css';
import Menu from './Menu';
import Storehours from './Storehours';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Details() {
  // State to manage which section is visible
  const [activeSection, setActiveSection] = useState('details');

  // Handler functions for button clicks
  const showDetails = () => setActiveSection('details');
  const showHours = () => setActiveSection('hours');

  return (
    <div className="container" id='details-container'>
      <div className="row">
        <div className="col" id='col1'>
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
              {/* <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form> */}

          {/* Conditionally render the content based on the activeSection state */}
          {activeSection === 'details' && (
            <Menu/>
          )}

          {activeSection === 'hours' && (
            <Storehours/>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
