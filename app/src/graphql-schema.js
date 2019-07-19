import { neo4jgraphql } from "neo4j-graphql-js";
import fs from "fs";
import path from "path";
import config

/*
 * Check for GRAPHQL_SCHEMA environment variable to specify schema file
 * fallback to schema.graphql if GRAPHQL_SCHEMA environment variable is not set
 */

export const typeDefs = fs.readFileSync(config.GRAPHQL_SCHEMA).toString("utf-8");
