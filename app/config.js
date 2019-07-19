require('dotenv').config()

// Server Config
HOST = 'http://localhost:8000'
PORT = 8000

// GraphQL Config
GRAPHQL_LISTEN_PORT = process.env.GRAPHQL_LISTEN_PORT || 4001
GRAPHQL_URI = process.env.GRAPHQL_URI
GRAPHQL_SCHEMA = process.env.GRAPHQL_SCHEMA || path.join(__dirname, "schema.graphql")

BASE_URL = process.env.BASE_URL || 'http://localhost'+GRAPHQL_LISTEN_PORT

JWT_SECRET = process.env.JWT_SECRET || "shittySecret8675309"

// Neo4J Config
NEO4J_URI = process.env.NEO4J_URI || "bolt://localhost:7687"
NEO4J_USER = process.env.NEO4J_USER || "neo4j"
NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || "neo4j"

// FB Config
FB_ID = process.env.FB_ID;
FB_SECRET = process.env.FB_SECRET
FB_CALLBACK_URI = process.env.FB_CALLBACK_URI || `http://localhost:${GRAPHQL_LISTEN_PORT}/login-facebook/callback`
FB_CLIENT_URI = process.env.FB_CLIENT_URI || `http://localhost:${FB_CLIENT_URI_PORT}`
