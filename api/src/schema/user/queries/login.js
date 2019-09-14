import {A,H} from '../../../common'

const login = async (_, {email, password}, {driver}) => {
  /* Setup */
  const ses = driver.session()
  const _1 = 
  `MATCH (u:User {email: $email})
  -[:AUTHENTICATED_WITH]->
  (l:LOCAL_ACCOUNT {email: $email}) 
  RETURN l.hashedPassword as hashedPassword`

  /* Get user's hashed password */
  const {records: recs} = await ses.run (_1, {email})

  /* Check if user exists */
  H.assert (H.isNotEmpty (recs)) (`no user with that email`)

  /* Check if password is correct */
  H.assert (bcrypt.compare(password, recs[0].get (`hashedPassword`))) (`incorrect password`)

  /* Grant jwt */
  return await A.createToken({user: {email}}, process.env.JWT_SECRET)
}

export default login