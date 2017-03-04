// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
})

app.get("/:date", function(request, response) {
  var date 
  if (/^\d{8,}$/.test(request.params.date)) {
    // 1488653667320
    date = new Date(parseInt(request.params.date));
  } else {
    // "2017 Feb 23"
    date = new Date(request.params.date);
  }
  
  if (isNaN(date.getTime())) {
    response.json({
      unix: null, 
      natural: null
    });    
  } else {
    response.json({
      unix: date.getTime(),
      natural: date.toDateString()
    });
  }
  
})

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
})

