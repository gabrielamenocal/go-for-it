import React, { Component } from "react";
import Unsplash, { toJson } from 'unsplash-js';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { OauthSender, OauthReceiver , createOauthFlow } from 'react-oauth-flow';
require('dotenv').config({path:'./keys.env'});

// *********************** Handle API ********************************************
const SECRET= "{process.env.APP_SECRET}";
const APIKEY = "{process.env.APP_ACCESS_KEY}";
const OAUTH_CODE = "{process.env.APP_AUTHORIZATION_CODE}";

// total, total_pages, results


// URLs
const API_URL = "https://api.unsplash.com/search/photos/?client_id="+APIKEY+"page=1&query=";
const AUTH_URL = "https://unsplash.com/oauth/authorize";
const REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob";
const BASE_AUTH_URL = "https://unsplash.com/oauth/token"

// AUTH_URL+"client_id="+APIKEY+REDIRECT_URI+"response_type=GET",


// *****************************************************************************

class FormSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      value: "",
      photos: [],
    };
    this.FormInput = this.FormInput.bind(this);
    this.FormSubmit = this.FormSubmit.bind(this);
  }
  

  componentDidMount() {

    const unsplash = new Unsplash({
      applicationId: APIKEY,
      secret: SECRET,
      authURL:AUTH_URL,
      headers: {
        "Accept-Version": "v1"
      } 
    });

   
  }

  Authenthication () {
    axios.post(BASE_AUTH_URL, {
      client_id:APIKEY,
      client_secret:SECRET,
      redirect_uri:REDIRECT_URI,
      code:	OAUTH_CODE,
      grant_type:'authorization_code'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

 
 FormInput(event){
  this.setState({value:event.target.value});
 }

 
 FormSubmit = event => {
  event.preventDefault();
  console.log(this.state.value);
  let searchKey = this.state.value;

  return fetch(API_URL+searchKey)
  .then(res => res.json())
  .then(
    (result) => {
      this.setState({
        isLoaded: true,
        photos: result.results
      });
    },        
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }
  )

};

//// AUTHENTHICATION USING THE OAUTH LIBRARY

handleSuccess = async (accessToken, { response, state }) => {
  console.log('Successfully authorized');
  //await setProfileFromDropbox(accessToken);
  //await redirect(state.from);
};

handleError = error => {
  console.error('An error occured');
  console.error(error.message);
};

   
    
  render() {

    // const { error, isLoaded, value, photos } = this.state;
    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //   return <div>Loading...</div>;
    // } else {


    return (
      <div>

        <OauthSender
            
                render={({ url }) => <a onClick={this.Authenthication} href={url}> Authenticate with Unsplash </a>}
          />


          
          <form onSubmit={this.FormSubmit}>
            <div className="form-group">
            <label> Search:    
              <input type="text" value={this.state.value} onChange={this.FormInput} /> 
            </label>
            <input type="submit" value="Submit" />          
          </div>
        </form>

      </div>
      );
    //}
  }
}

export default FormSearch;
