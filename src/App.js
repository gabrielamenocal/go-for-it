import React from 'react';
import NavBar from './components/Nav/NavBar';
import Carousel from 'react-bootstrap/Carousel'
import { Jumbotron, Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./pages/Main";
import Login from "./pages/withLogin";
import noLogin from "./pages/withoutLogin";

//import { Button, Carousel } from 'reactstrap';
import './App.css';

function App() {
  return (
    <div>
        <NavBar /> 
        <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1514066558159-fc8c737ef259?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                  </Carousel.Caption>
                </Carousel.Item>
      </Carousel>

      
    <Router>
      <Jumbotron fluid className="jumbotron">
        <Container fluid>          
          <Switch> 
            <Route exact path="/" component={Main} /> 
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/noLogin" component={noLogin} />
          </Switch>
        </Container>
      </Jumbotron>
    </Router>    

    </div>
    
  );
}

export default App;
