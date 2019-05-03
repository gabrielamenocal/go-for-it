import React, { Component } from "react";
import Unsplash, { toJson } from 'unsplash-js';
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

// *********************** Handle API ********************************************
const SECRET= "{process.env.APP_SECRET}";
const APIKEY = "{process.env.APP_ACCESS_KEY}";
const OAUTH_CODE = "{process.env.APP_AUTHORIZATION_CODE}";

// total, total_pages, results


// URLs
const BASE_API_URL = "https://api.unsplash.com/users";
const API_URL = "https://api.unsplash.com/search/photos/?client_id="+APIKEY+"page=1&query=";
const AUTH_URL = "https://unsplash.com/oauth/authorize";
const REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob";
const TOKEN_AUTH_URL = "https://unsplash.com/oauth/token"

// AUTH_URL+"client_id="+APIKEY+REDIRECT_URI+"response_type=GET",
// var ClientOAuth2 = require('client-oauth2')
// var OAuth = require('@zalando/oauth2-client-js');



 
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

    //USSING CLIENT-OATH LIBRARY

    // window.oauth2Callback = function (uri) {
    //   unsplashAuth.token.getToken(uri)
    //     .then(function (user) {
    //       console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }              
    //       return popsicle.request(user.sign({
    //         method: 'get',
    //         url: BASE_API_URL
    //       })).then(function (res) {
    //         console.log(res) //=> { body: { ... }, status: 200, headers: { ... } }
    //       })
    //     })
    // }
    
    // Make a POST request to https://unsplash.com/oauth/token

  //   var unsplashAuth = new ClientOAuth2({
  //     clientId: APIKEY,
  //     clientSecret: SECRET, 
  //     authorizationUri: AUTH_URL,
  //     redirectUri: REDIRECT_URI,
  //     scope: "public read_user write_user read_photos write_photos write_likes write_followers read_collections write_collections"
  //   })
  //   var token = unsplashAuth.createToken('access token', 'optional refresh token', 'optional token type', { data: 'raw user data' })

  // token.sign({
  // method: 'get',
  // url: BASE_API_URL
  // })
    
  // var unsplashAuth = new OAuth.Provider({
  //   clientId: APIKEY,  // required
  //   authorization_url: AUTH_URL // required
  //   });

  const unsplash = new Unsplash({
    applicationId: APIKEY,
    //secret: SECRET,
    redirect_uri: REDIRECT_URI,
    //bearerToken: TOKEN_AUTH_URL
    response_type:'code',
    scope: "public read_user write_user read_photos write_photos write_likes write_followers read_collections write_collections"
  });

  const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "read_user",
    "write_user",
    "read_photos",
    "write_photos",
    "write_likes",
    "write_followers",
    "read_collections",
    "write_collections"
  ]);

  window.location.assign(authenticationUrl);

  // unsplash.auth.userAuthentication(query.code)
  // .then(toJson)
  // .then(json => {
  //   unsplash.auth.setBearerToken(json.access_token);
  // });

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


   
    
  render() {

    const { error, isLoaded, value, photos } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      //return <div> Loading...</div>;
    
    return (
      <div>

        <OauthSender
            
                render={({ url }) => <a onClick={this.Authenthication} href={url}> Authenticate with Unsplash </a>}
          />


          
          <FormGroup onSubmit={this.FormSubmit}>
            <div className="form-group">
            <Label> <FormText> Search:  </FormText> 
              <Input type="text" value={this.state.value} onChange={this.FormInput} /> 
            </Label>
            <Input type="submit" value="Submit" />          
          </div>
        </FormGroup>

      </div>
      );
    }
  }
}

export default FormSearch;
