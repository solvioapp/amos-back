# Amos Backend

---

Node : v12.2.0

## Tools Used
- Routing: [Express](https://expressjs.com/)
- Database: [Neo4j](https://neo4j.com/)
- Object Mapper: [Neode](https://github.com/adam-cowley/neode)
- Query: [GraphQL](https://graphql.org/)

### Run Neo4j
We are using docker. You can setup using whatever you feel comfortable in.
```bash
docker run \
    --publish=7474:7474 --publish=7687:7687 \
    --volume=$HOME/neo4j/data:/data \
    neo4j
```

### Running the server
Firstly, copy the `.env.example` file to `.env` and update with the credentials for your Neo4j instance.

```
npm install
node server.js
```

##### [Meeting Notes](https://hackmd.io/jzQRquIjS4CU-_IICNIGcQ)

---

#### Check out [solvio.org](http://solvio.org) for more info.

## [Contributors](https://github.com/solviofoundation/amos-back/graphs/contributors)

- [Ani](https://github.com/anistark)

## Resources references

- [Neo4j relationship properties comparision](https://neo4j.com/developer/kb/comparing-relationship-properties-within-a-path/)
