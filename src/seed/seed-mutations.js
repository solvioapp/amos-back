export default /* GraphQL */ `
  mutation {
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
    u1: CreateUser(email: "Ani", reputation: 0) {
      email,
      reputation
    }
    t1: CreateTopic(
      name: "Computer Science"
    ) {
      name
    }
    t2: CreateTopic(
      name: "Software engineering"
    ) {
      name
    }
    t4: CreateTopic(
      name: "Web development"
    ) {
      name
    }
    t5: CreateTopic(
      name: "GraphQL"
    ) {
      name
    }
      
  }
`;
