// server.js
// where your node app starts

// init project
var express = require('express');
var strftime = require("strftime");
var app = express();

//var months = ['january','july', 'february',	'august','march','september','april', 'october','may','november', 'june','december'];

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get("/:date", function (request, response) {
  
  var date = null ;
  var valid = isDate(request.params.date);
  if(valid){
    date = getDate(request.params.date);
  }
  var result = { 'unix' : null, 'natural' : null };
  // Check if it's a real Date 
  if(valid){
    // It's really a Date (Y)
     result.unix = date.getTime()/1000;
     result.natural = strftime("%B %d, %Y", date);
  }
  var result = JSON.stringify(result);
  response.send(result);
  
});

function isDate ( input ){
  var arr = input.split(/,?\s+/);
  if(arr.length == 3){
      return new Date(input);
  }else if (arr.length == 1){
    return Number(arr[0]);
  }
  return false;
}

function getDate(input){
  var date = Number(input);
  if(date){
    return new Date(date*1000)
  }
  return new Date(input);
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
