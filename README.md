# Amos Backend

---
[![node](https://img.shields.io/badge/node-%3E%3D12.5.0-brightgreen.svg)](https://nodejs.org/download/release/v12.5.0/)
[![dependencies Status](https://david-dm.org/solviofoundation/amos-back/status.svg)](https://david-dm.org/solviofoundation/amos-back)
[![devDependencies Status](https://david-dm.org/solviofoundation/amos-back/dev-status.svg)](https://david-dm.org/solviofoundation/amos-back?type=dev)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/solviofoundation/amos-back)

[![GitHub contributors](https://img.shields.io/github/contributors/solviofoundation/amos-back?color=%2400f&style=for-the-badge)](https://github.com/solviofoundation/amos-back/graphs/contributors)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/solviofoundation/amos-back?style=for-the-badge)
[![GitHub issues](https://img.shields.io/github/issues-raw/solviofoundation/amos-back?style=for-the-badge)](https://github.com/solviofoundation/amos-back/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/solviofoundation/amos-back?style=for-the-badge)](https://github.com/solviofoundation/amos-back/issues?q=is%3Aissue+is%3Aclosed)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/solviofoundation/amos-back?style=for-the-badge)](https://github.com/solviofoundation/amos-back/pulls)
[![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/solviofoundation/amos-back?style=for-the-badge)](https://github.com/solviofoundation/amos-back/pulls?q=is%3Apr+is%3Aclosed)

[![Follow on Twitter](https://img.shields.io/twitter/follow/solvio_?style=social&logo=twitter)](https://twitter.com/intent/follow?screen_name=solvio_)

## Tools Used
- Routing: [Express](https://expressjs.com/)
- Database: [Neo4j](https://neo4j.com/)
- Object Mapper: [Neode](https://github.com/adam-cowley/neode)
- API design: REST

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

### [API Collection](https://www.getpostman.com/collections/b31f90c3201374888bdc)

##### [Meeting Notes](https://hackmd.io/jzQRquIjS4CU-_IICNIGcQ)

---

#### Check out [solvio.org](http://solvio.org) for more info.

## [Contributors](https://github.com/solviofoundation/amos-back/graphs/contributors)

- [Ani](https://github.com/anistark)
- [Dom](https://github.com/dteiml)
- [Mukul](https://github.com/developerKumar)

## Resources references

- [Neo4j relationship properties comparision](https://neo4j.com/developer/kb/comparing-relationship-properties-within-a-path/)
