import {H,bcrypt} from '../../../common'

const updatePassword = async (_, {email, password, _new}, {driver, user}) => {
  /* Setup */
  const ses = driver.session()

  /* Check request is authenticated */
  H.assert (H.isNotNil (user?.id)) (`authentication required`)

  /* Check current password is correct */
  const _1 = 
  `MATCH (la:LOCAL_ACCOUNT)
  WHERE la.email = $email
  RETURN la`
  const {records: recs} = await ses.run(_1, {email})
  H.assert (H.isNotEmpty (recs)) (`no user with email ${email}`)
  H.assert (bcrypt.compare(password, recs[0].get (`hashedPassowrd`))) (`incorrect password`)

  /* Save new password */
  const hashedNew = await bcrypt.hash (_new, 12)
  const _2 =
  `MATCH (la:LOCAL_ACCOUNT {email: $email})
  SET la+= {hashedPassword: hashedNew}
  RETURN la`
  await ses.run (_2, {email, hashedNew})
}

export default updatePassword