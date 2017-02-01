/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

var express = require('express'); // Express web server framework
var app = express();

app.get('/data.json', function (req, res) {
  res.send(data)
})

app.use(express.static(__dirname + '/public'));

console.log('Listening on 8888');

var request = require('request'); // "Request" library
var client_id = '9439aa5f970441a7b1cd191978b6f521'; // Your client id
var client_secret = 'e00e65589eb34fdb9eb90b85be0e2fab'; // Your secret

var data = '';

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/josephmallari1',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
			data  = body;
			console.log(data);
		});
	}
});

app.listen(8888);