import React, { Component } from "react";
import Unsplash, { toJson } from 'unsplash-js';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { BrowserRouter as Router,Link, Route, Switch } from "react-router-dom";
import { OauthSender, OauthReceiver , createOauthFlow } from 'react-oauth-flow';
import Login from "./withLogin";
import noLogin from "./withoutLogin";



function Child({ match }) {
    return (
      <div>
        <h3>ID: {match.params.id}</h3>
      </div>
    );
  }
  
  function ComponentWithRegex({ match }) {
    return (
      <div>
        <h3>Only asc/desc are allowed: {match.params.direction}</h3>
      </div>
    );
  }
  

class Main extends Component {  
    
  render() {      
    return (
      
    <Router>
      <div>
        <h2>Options</h2>
        <ul>
          <li>
            <Link to="/Login"> Search after Authentication </Link>
          </li>
          <li>
            <Link to="/noLogin">Search without Authentication</Link>
          </li>                
        </ul>

        {/* <Route path="/:id" component={Child} /> */}               
        {/* <Route
          path="/order/:direction(asc|desc)"
          component={ComponentWithRegex}
        /> */}
        <Route path="/Login" component={Login} />
        <Route path="/noLogin" component={noLogin} />
      </div>
      
    </Router>
      );
    };
  }

export default Main;
