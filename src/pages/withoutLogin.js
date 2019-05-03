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
require('dotenv').config({path:'./keys.env'});

const SECRET= "{process.env.APP_SECRET}";
const APIKEY = "{process.env.APP_ACCESS_KEY}";
const OAUTH_CODE = "{process.env.APP_AUTHORIZATION_CODE}";

// total, total_pages, results


// URLs
const BASE_API_URL = "https://api.unsplash.com/users";
const API_URL = "https://api.unsplash.com/search/photos/?page=1&&client_id="+APIKEY+"query=";
const AUTH_URL = "https://unsplash.com/oauth/authorize";
const REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob";
const TOKEN_AUTH_URL = "https://unsplash.com/oauth/token"


class noLogin extends Component {

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
             
    componentDidMount(){
        axios.get("https://source.unsplash.com/random/800x600")
            .then(response => {
                this.setState({photos:response.data});
                console.log(response);
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
    
    render() {    

        // const  photos = this.state.photos.map( photo => {
        //     return  <li>{photo}</li>
        // });
       
        return (
          <div className="randomPic">        

            <h1> Review in the Console</h1>
              {/* <ul> {photos}  </ul> */}
            
          </div>
        );
    }
      
}
    

export default noLogin;
