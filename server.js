/**
 * A basic example using Express to create a simple movie recommendation engine.
 */
const express = require('express');
const session = require('express-session');
const path = require('path');
var bodyParser = require('body-parser')

/**
 * Load Neode with the variables stored in `.env` and tell neode to
 * look for models in the ./models directory.
 */
const neode = require('neode')
    .fromEnv()
    .withDirectory(path.join(__dirname, 'models'));

/**
 * Create a new Express instance
 */
const app = express();

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * Display home page with a list of Genres
 */
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 'server': 'Amos' }, null, 3));
});


app.use('/api/v1/user', require('./routes/users')(neode))

/**
 * Listen for requests on port 3000
 */
app.listen(3000, function () {
    console.log('Amos:: listening on http://localhost:3000'); // eslint-disable-line no-console
});
