export default /* GraphQL */ `
  mutation {
    u1: CreateUser(email: "Dom", reputation: 0, createdAt: {
        formatted: "1995-10-09T00:00:00Z"
      }) {
      email,
      reputation
    }
    u2: CreateUser(email: "Mukul", reputation: 0, createdAt: {
      formatted: "1992-10-09T00:00:00Z"
    }) {
      email,
      reputation
    }
    u3: CreateUser(email: "Jost", reputation: 0, createdAt: {
      formatted: "1993-10-09T00:00:00Z"
    }) {
      email,
      reputation
    }
    u4: CreateUser(email: "Sultan", reputation: 0, createdAt: {
      formatted: "1994-10-09T00:00:00Z"
    }) {
      email,
      reputation
    }
    u5: CreateUser(email: "Ani", reputation: 0, createdAt: {
      formatted: "1991-10-09T00:00:00Z"
    }) {
      email,
      reputation
    }
    t1: CreateTopic(
      name: "Computer science"
    ) {
      name
    }
    t2: CreateTopic(
      name: "Software engineering"
    ) {
      name
    }
    t3: CreateTopic(
      name: "Web development"
    ) {
      name
    }
    t4: CreateTopic(
      name: "GraphQL"
    ) {
      name
    }
    tp1: AddTopicParents(from: {
      name: "GraphQL"
    }, to: {
      name: "Web development"
    }) {
      from {
        name
      }
    }
    tp2: AddTopicParents(from: {
      name: "Web development"
    }, to: {
      name: "Software engineering"
    }) {
      from {
        name
      }
    }
    tp3: AddTopicParents(from: {
      name: "Software engineering"
    }, to: {
      name: "Computer science"
    }) {
      from {
        name
      }
    }
    r1: CreateResource(title: "GraphQL", links: ["https://graphql.org"]) {
      title
    }
    r2: CreateResource(title: "How to GraphQL", links: ["https://howtographql.com"]) {
      title
    }
    r3: CreateResource(title: "GRANDStack", links: ["https://grandstack.io"]) {
      title
    }
    r1c: AddResourceCreatedBy(from: {
      title: "GraphQL"
    }, to: {
      email: "Dom"
    }, data: {
      timestamp: {
        formatted: "2001-10-09T00:00:00Z"
      }
    }) {
      from {
        title
      }
    }
    r1ag1: CreateAmosGame(id: "r1ag1") {
      id
    }
    r1ag2: CreateAmosGame(id: "r1ag2") {
      id
    }
    r2ag1: CreateAmosGame(id: "r2ag1") {
      id
    }
    r2ag2: CreateAmosGame(id: "r2ag2") {
      id
    }
    r3ag1: CreateAmosGame(id: "r3ag1") {
      id
    }
    r3ag2: CreateAmosGame(id: "r3ag2") {
      id
    }
    # Could also be called AddAmosGameResource
    fr1: AddResourceAmosGames(from: {
      id: "r1ag1"
    }, to: {
      title: "GraphQL"
    }) {
      from {
        id
      }
    }
    us1: AddUserVotes(from: {
      id: "r1ag1"
    }, to: {
      email: "Dom"
    }, data: {
      timestamp: {
        formatted: "1992-10-09T00:00:00Z"
      }
      ownRepAtVote: 1
      agreeingRep: 0
    }) {
      from {
        id
      }
    }
  }
`;
