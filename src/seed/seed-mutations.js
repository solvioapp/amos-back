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
    #   name: "GraphQL"
    # }, to: {
    #   id: "r1ag1"
    # }) {
    #   from {
    #     name
    #   }
    # }

    # fr1b: AddAmosGameResource(from: {
    #   id: "r1ag1"
    # }, to: {
    #   name: "GraphQL"
    # }) {
    #   from {
    #     id
    #   }
    # }
    # us1: AddUserVotes(from: {
    #   email: "Dom"
    # }, to: {
    #   id: "r1ag1"
    # }) {
    #   from {
    #     email
    #   }
    # }
    # us1: AddUserVotes(from: {
    #   email: "Dom"
    # }, to: {
    #   id: "r1ag1"
    # }, data: {
    #   timestamp: 1
    #   ownRepAtVote: 1
    #   agreeingRep: 0
    # }) {
    #   from {
    #     email
    #   }
    # }

    # r1: CreateReview(id: "r1", stars: 4, text: "Great IPA selection!", date: {
    #   formatted: "2016-01-03"
    # }) {
    #   id
    # }
    # ar1: AddUserReviews(from: {
    #   id: "u1"
    # }, to: {
    #   id: "r1"
    # }) {
    #   from {
    #     id
    #   }
    # }
    # ab1: AddReviewBusiness(from: {
    #   id: "r1"
    # }, to: {
    #   id: "b1"
    # }) {
    #   from {
    #     id
    #   }
    # }

    # r2: CreateReview(id: "r2", stars: 5, text: "", date: {
    #   formatted: "2016-07-14"
    # }) {
    #   id
    # }
    # ar2: AddUserReviews(from: {
    #   id: "u3"
    # }, to: {
    #   id: "r2"
    # }) {
    #   from {
    #     id
    #   }
    # }
    # ab2: AddReviewBusiness(from: {
    #   id: "r2"
    # }, to: {
    #   id: "b1"
    # }) {
    #   from {
    #     id
    #   }
    # }

    # r3: CreateReview(id: "r3", stars: 3, text: "", date: {
    #   formatted: "2018-09-10"
    # }) {
    #   id
    # }
    # ar3: AddUserReviews(from: {
    #   id: "u4"
    # }, to: {
    #   id: "r3"
    # }) {
    #   from {
    #     id
    #   }
    # }
    # ab3: AddReviewBusiness(from: {
    #   id: "r3"
    # }, to: {
    #   id: "b2"
    # }) {
    #   from {
    #     id
    #   }
    # }

    # r4: CreateReview(id: "r4", stars: 5, text: "", date: {
    #   formatted: "2017-11-13"
    # }) {
    #   id
    # }
    # ar4: AddUserReviews(from: {
    #   id: "u3"
    # }, to: {
    #   id: "r4"
    # }) {
    #   from {
    #     id
    #   }
    # }
    # ab4: AddReviewBusiness(from: {
    #   id: "r4"
    # }, to: {
    #   id: "b3"
    # }) {
    #   from {
    #     id
    #   }
    # }

    # r5: CreateReview(
    #   id: "r5"
    #   stars: 4 text: "Best breakfast sandwich at the Farmer's Market. Always get the works."
    #   date: {
    #     formatted: "2018-01-03"
    #   }
    # ) {
    #   id
    # }
    # ar5: AddUserReviews(from: {
    #   id: "u1"
    # }, to: {
    #   id: "r5"
    # }) {
    #   from {
    #     id
    #   }
    # }
    # ab5: AddReviewBusiness(from: {
    #   id: "r5"
    # }, to: {
    #   id: "b3"
    # }) {
    #   from {
    #     id
    #   }
    # }

    # r6: CreateReview(id: "r6", stars: 4, text: "", date: {
    #   formatted: "2018-03-24"
    # }) {
    #   id
    # }
    # ar6: AddUserReviews(from: {
    #   id: "u2"
    # }, to: {
    #   id: "r6"
    # }) {
    #   from {
    #     id
    #   }
    # }
    # ab6: AddReviewBusiness(from: {
    #   id: "r6"
    # }, to: {
    #   id: "b4"
    # }) {
    #   from {
    #     id
    #   }
    # }

    # r7: CreateReview(
    #   id: "r7"
    #   stars: 3 text: "Not a great selection of books, but fortunately the inter-library loan system is good. Wifi is quite slow. Not many comfortable places to site and read. Looking forward to the new building across the street in 2020!"
    #   date: {
    #     formatted: "2015-08-29"
    #   }
    # ) {
    #   id
    # }
    # ar7: AddUserReviews(from: {
    #   id: "u1"
    # }, to: {
    #   id: "r7"
    # }) {
    #   from {
    #     id
    #   }
    # }
    # ab7: AddReviewBusiness(from: {
    #   id: "r7"
    # }, to: {
    #   id: "b5"
    # }) {
    #   from {
    #     id
    #   }
    # }

    # r8: CreateReview(id: "r8", stars: 5, text: "", date: {
    #   formatted: "2018-08-11"
    # }) {
    #   id
    # }
    # ar8: AddUserReviews(from: {
    #   id: "u4"
    # }, to: {
    #   id: "r8"
    # }) {
    #   from {
    #     id
    #   }
    # }
    # ab8: AddReviewBusiness(from: {
    #   id: "r8"
    # }, to: {
    #   id: "b6"
    # }) {
    #   from {
    #     id
    #   }
    # }

    # r9: CreateReview(id: "r9", stars: 5, text: "", date: {
    #   formatted: "2016-11-21"
    # }) {
    #   id
    # }
    # ar9: AddUserReviews(from: {
    #   id: "u3"
    # }, to: {
    #   id: "r9"
    # }) {
    #   from {
    #     id
    #   }
    # }
    # ab9: AddReviewBusiness(from: {
    #   id: "r9"
    # }, to: {
    #   id: "b7"
    # }) {
    #   from {
    #     id
    #   }
    # }

    # r10: CreateReview(id: "r10", stars: 4, text: "", date: {
    #   formatted: "2015-12-15"
    # }) {
    #   id
    # }
    # ar10: AddUserReviews(from: {
    #   id: "u2"
    # }, to: {
    #   id: "r10"
    # }) {
    #   from {
    #     id
    #   }
    # }
    # ab10: AddReviewBusiness(from: {
    #   id: "r10"
    # }, to: {
    #   id: "b2"
    # }) {
    #   from {
    #     id
    #   }
    # }
  }
`;
