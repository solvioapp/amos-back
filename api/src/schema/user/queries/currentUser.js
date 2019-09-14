import {H} from '../../../common'

const currentUser = async (_, __, {driver, user}) => {
  /* Setup */
  const ses = driver.session()

  /* Check request is authenticated */
  H.assert (H.isNotNil (user?.id)) (`authentication required`)

  const _1 =
  `MATCH (u:User {id: $id})
  WITH {email: u.email} as u
  RETURN u`

  const {records: recs} = await ses.run (_1, {id: user?.id})

  recs |> console.log('recs', #)
  
  return recs[0].get(`u`)
}

export default currentUser