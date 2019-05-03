import axios from 'axios';
import Unsplash from 'unsplash-js';
//const Unsplash = require('unsplash-js').default;
require('dotenv').config({path:'./keys.env'});

const SECRET= "{process.env.APP_SECRET}";
const APIKEY = "{process.env.APP_ACCESS_KEY}";

// URL
const BASE_URL = "https://api.unsplash.com/";
const AUTHO_URL = "https://unsplash.com/oauth/";
const REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob";

// Constructor
const unsplash = new Unsplash({
  applicationId: APIKEY,
  secret: SECRET,
  headers: {
    "X-Custom-Header": "foo"
  }
});

// Authentication flow

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos"
]);


//location.assign(authenticationUrl);

// unsplash.auth.userAuthentication(query.code)
//   .then(toJson)
//   .then(json => {
//     unsplash.auth.setBearerToken(json.access_token);
//   });



// Parameters
const imageWidth = 480; 
const imageHeight = 480; 
const numItemsToGenerate = 20; //how many gallery items you want on the scree
const collectionID = 17098; //the collection ID from the original url
const query = "flower";


unsplash.search.photos("dogs", 1)
  .then(toJson)
  .then(json => {
    unsplash.photos.downloadPhoto(json["results"][0]);
  });


export default {  

  search: function(query) {
    return axios.get(BASE_URL + query + APIKEY);
  }
  


};

