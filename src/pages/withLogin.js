import React, { Component } from "react";
import Unsplash, { toJson } from 'unsplash-js';
import FormSearch from '../components/FormSearch/FormSearch';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { OauthSender, OauthReceiver , createOauthFlow } from 'react-oauth-flow';
//import { transport, request } from 'popsicle'
require('dotenv').config({path:'./keys.env'});


class Login extends Component {  
    
  render() {      
    return (
      <div>
        <FormSearch />
      </div>
      );
    };
  }

export default Login;
