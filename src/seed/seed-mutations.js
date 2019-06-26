export default /* GraphQL */ `
  mutation {
    d1:  DeleteUser(email: "Dom") {
      email
      reputation
    }
    u1: CreateUser(email: "Dom", reputation: 0) {
      email,
      reputation
    }
    u2: CreateUser(email: "Mukul", reputation: 0) {
      email,
      reputation
    }
    u3: CreateUser(email: "Jost", reputation: 0) {
      email,
      reputation
    }
    u4: CreateUser(email: "Sultan", reputation: 0) {
      email,
      reputation
    }
    u5: CreateUser(email: "Ani", reputation: 0) {
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
    r1: CreateResource(name: "GraphQL", urls: ["https://graphql.org"]) {
      name
    }
    r2: CreateResource(name: "How to GraphQL", urls: ["https://howtographql.com"]) {
      name
    }
    r3: CreateResource(name: "GRANDStack", urls: ["https://grandstack.io"]) {
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

    # r1ag1: CreateAmosGame(id: "r1ag1", resource: {
    #   name: "GraphQL"
    # }) {
    #   id
    # }
    
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

    # fr1: AddResourceAmosGames(from: {
    #   id: "r1ag1"
    # }, to: {
    #   name: "GraphQL"
    # }) {
    #   from {
    #     id
    #   }
    # }

    fr1b: AddAmosGameResource(from: {
      id: "r1ag1"
    }, to: {
      name: "GraphQL"
    }) {
      from {
        id
      }
    }
    # us1: AddUserVotes(from: {
    #   id: "r1ag1"
    # }, to: {
    #   email: "Dom"
    # }) {
    #   from {
    #     id
    #   }
    # }
    us1: AddUserVotes(from: {
      id: "r1ag1"
    }, to: {
      email: "Dom"
    }, data: {
      timestamp: 1
      ownRepAtVote: 1
      agreeingRep: 0
    }) {
      from {
        id
      }
    }
  }
`;
