const express = require('express');
const routes = require('./routes');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/project3LocalDB');

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(routes);
// Send every request to the React app
// Define any API routes before this runs
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

