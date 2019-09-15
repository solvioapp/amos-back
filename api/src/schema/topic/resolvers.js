export default {
  Mutation: {
    // createTopic: async (_, args, ctx) => {
    //   `createTopic called` |> console.log('`createTopic called`', #)
    // }
  },
  Query: {
    autocomplete: async (_, {name}, {driver}) => {
      const ses = driver.session()
      const _1 =
      `MATCH (t:Topic)
      WHERE t.name STARTS WITH $name
      RETURN t`
      const {records: recs} = ses.run(_1, {name})
      
    },
    getChildrenRec: async (_, {name, level}, {driver}) => {
      const ses = driver.session()
      const _1 = 
      `MATCH (t:Topic {name: $name})
      <-[:IS_PART_OF*1..$level]-
      (t:Topic)
      RETURN `
    }
  }
}