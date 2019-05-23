# Amos Backend

---

Node : v12.2.0

## Tools Used
- [Express](https://expressjs.com/)
- [Neo4j](https://neo4j.com/)
- [Neode](https://www.npmjs.com/package/neode)

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
