/**
 * A basic example using Express to create a simple movie recommendation engine.
 */
require('dotenv').config()

const express = require('express')
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const schema = require('./schema')
const jwt = require('express-jwt')

const app = express().use('*', cors());

// authentication middleware
const authMiddleware = jwt({
    secret: process.env.SECRET_KEY || 'secret',
    credentialsRequired: false
})

app.use(authMiddleware)

app.use('/api', bodyParser.json(), authMiddleware, graphqlExpress(req => ({
    schema,
    context: {
        user: req.user
    }
})))

let PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`AMOS Server running on http://localhost:` + PORT));
