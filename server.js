/**
 * A basic example using Express to create a simple movie recommendation engine.
 */
const express = require('express');
const session = require('express-session');
const path = require('path');

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

/**
 * Display home page with a list of Genres
 */
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 'server': 'Amos' }, null, 3));
});

/**
 * Listen for requests on port 3000
 */
app.listen(3000, function () {
    console.log('app listening on http://localhost:3000'); // eslint-disable-line no-console
});
